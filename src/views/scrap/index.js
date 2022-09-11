import React from "react";

import { FeedModel, UserModel } from "../../models";
import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import FeedItem from "../../components/feed-item";

import "./style.scoped.scss";


const Scrap = () => {
  const userViewModel = new UserViewModel(new UserModel());
  const me = userViewModel.getMyData();

  const feedViewModel = new FeedViewModel(new FeedModel());
  const feedItems = feedViewModel.getAllFeedList();
  const makeFeedItems = (post, index) => (<FeedItem key={index} post={post} me={me}></FeedItem>);

  return (
    <div className="page-wrap">
      <header className="header">
        <h1 className="title">Scrapped</h1>
        <div className="right" />
      </header>
      <section className="feed-list">
        {feedItems.map(makeFeedItems)}
      </section>
    </div>
  );
};

export default Scrap;