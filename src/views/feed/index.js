import React from "react";
import { useSelector } from "react-redux";

import { FeedModel } from "../../models";
import FeedViewModel from "../../view-models/feed";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";


const Feed = ({ me }) => {
  const location = useSelector(state => state.global.location);
  const address = location.address.split(" ");

  const feedViewModel = new FeedViewModel(new FeedModel());
  const posts = feedViewModel.getAllFeedList();
  const makePost = (post, index) => <PostItem key={index} post={post} me={me} />;

  return (
    <div className="page">
      <header className="header">
        <h1 className="title">Feed</h1>
        <div className="right">
          <button className="button-location">
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