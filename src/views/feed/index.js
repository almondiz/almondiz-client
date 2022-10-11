import React from "react";
import { useSelector } from "react-redux";

import { PostModel } from "../../models";
import { PostViewModel } from "../../view-models";

import PostItem from "../../components/post-item";
import BackdropLocation from "../backdrop-location";

import "./style.scoped.scss";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";


const FeedPage = ({ backdropRef }) => {
  // POST API
  const dataList = (() => {
    const postViewModel = new PostViewModel(new PostModel());
    return postViewModel.getDummyData();
  })();
  //


  const addressTokens = (() => {
    const location = useSelector(state => state.global.location);
    const address = location.address.split(" ");
    return [ address.slice(0, -1).join(" "), address[address.length - 1] ];   // [ "수원 영통구", "원천동" ]
  })();

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
        <section className="post-list">{dataList.map((data, idx) => <PostItem key={idx} data={data} />)}</section>
      </main>
    </div>
  );
};

export default FeedPage;