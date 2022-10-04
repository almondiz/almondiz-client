import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { PostModel } from "../../models";
import { PostViewModel } from "../../view-models";

import PostItem from "../../components/post-item";
import BackdropLocation from "../backdrop-location";

import "./style.scoped.scss";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";


const Feed = ({ backdropRef, me }) => {
  const navigate = useNavigate();

  const location = useSelector(state => state.global.location);
  const address = location.address.split(" ");

  const postViewModel = new PostViewModel(new PostModel());
  const posts = postViewModel.getDummyData();
  const makePost = (post, idx) => <PostItem key={idx} postId={post.id} post={post} me={me} />;

  const showBackdropLocation = () => backdropRef.current?.show({ title: "위치 설정하기", content: <BackdropLocation />, });

  return (
    <div className="page">
      <header className="header">
        <h1 className="title">Feed</h1>
        <div className="right">
          <button className="button-location" onClick={() => showBackdropLocation()}>
            <div className="text-wrap">
              <p>{address.slice(0, -1).join(" ")}</p>
              <p>{address[address.length - 1]}</p>
            </div>
            <div className="icon-sm">
              <LocationSearchingIcon />
            </div>
          </button>
        </div>
      </header>
      <main className="content">
        <section className="post-list">
          {posts.map(makePost)}
        </section>
      </main>
    </div>
  );
};

export default Feed;