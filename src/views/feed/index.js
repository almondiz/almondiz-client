import React, { useState, useEffect, useRef } from "react";

import { PostViewModel, SearchViewModel } from "../../view-models";

import { StaticComponentRefs } from "../../util";
import PostItem from "../../components/post-item";
import BackdropLocation from "./backdrop-location";

import "./style.scoped.scss";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";
import MyLocationIconFill from "../../asset/icons/mui/my-location-icon-fill";


const FeedPage = () => {
  /** 4. POST API */
  const postViewModel = new PostViewModel();
  const [posts, setPosts] = useState(null);
  const readFeedPosts = async () => setPosts(await postViewModel.readAllPosts());
  /** */
  /** 0. SEARCH API */
  const [ tracking, setTracking ] = useState(null);
  const [ addressTokens, setAddressTokens ] = useState(null);
  const searchViewModel = new SearchViewModel();
  const readAddress = async () => {
    const data = await searchViewModel.getPreferedLocationSet();
    const { tracking, location, distance } = data;
    const address = location.address.split(" ");
    const addressTokens = [ address.slice(0, -1).join(" "), address[address.length - 1] ];   // [ "수원 영통구", "원천동" ]
    setAddressTokens(addressTokens);
    setTracking(tracking);
  };
  /** */
  useEffect(() => { readFeedPosts(), readAddress(); }, []);


  const backdropLocationRef = useRef();
  const showBackdropLocation = () => {
    const backdropRef = StaticComponentRefs.backdropRef;
    backdropRef.current?.show(
      <BackdropLocation backdropRef={backdropRef} ref={backdropLocationRef} />,
      async () => {
        const { dirty } = backdropLocationRef.current?.destruct();
        if (dirty) {    // refresh page if dirty is true
          readFeedPosts(), readAddress();
        }
      }
    );
  };


  return (posts && addressTokens) && (
    <div id="page">
      <header className="header">
        <h1 className="title">Feed</h1>
        <div className="buttons right">
          <button className="button button-location" onClick={showBackdropLocation}>
            <div className="text-wrap">
              <p className="description">{addressTokens[0]}</p>
              <h3 className="title">{addressTokens[1]}</h3>
            </div>
            <div className="icon">{tracking ? <MyLocationIconFill /> : <LocationSearchingIcon />}</div>
          </button>
        </div>
      </header>
      <main className="content">
        <section className="post-list">{posts.map((post, idx) => <PostItem key={idx} post={post} />)}</section>
      </main>
    </div>
  );
};

export default FeedPage;