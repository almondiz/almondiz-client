import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { PostViewModel, SearchViewModel } from "../../view-models";

import PostItem from "../../components/post-item";
import BackdropLocation from "../backdrop-location";

import "./style.scoped.scss";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";


const FeedPage = ({ backdropRef }) => {
  /** 4. POST API */
  const postViewModel = new PostViewModel();
  const [posts, setPosts] = useState([]);
  const readAllPosts = async () => setPosts(await postViewModel.readAllPosts());
  useEffect(() => { readAllPosts(); }, []);
  /** */

  /** 0. SEARCH API */
  const [ addressTokens, setAddressTokens ] = useState([]);
  const searchViewModel = new SearchViewModel();
  const getPreferedLocation = async () => {
    const data = await searchViewModel.getPreferedLocation();
    const { location, distance } = data;
    const address = location.address.split(" ");
    const _addressTokens = [ address.slice(0, -1).join(" "), address[address.length - 1] ];   // [ "수원 영통구", "원천동" ]
    setAddressTokens(_addressTokens);
  };
  useEffect(() => { getPreferedLocation(); }, []);
  /** */

  const showBackdropLocation = () => backdropRef.current?.show({ title: "위치 설정", content: <BackdropLocation />, });


  return (
    <div id="page">
      <header className="header">
        <h1 className="title">Feed</h1>
        <div className="buttons right">
          <button className="button button-location" onClick={() => showBackdropLocation()}>
            <div className="text-wrap">
              <p className="description">{addressTokens[0]}</p>
              <h3 className="title">{addressTokens[1]}</h3>
            </div>
            <div className="icon"><LocationSearchingIcon /></div>
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