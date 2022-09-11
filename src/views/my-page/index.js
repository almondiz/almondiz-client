import React from "react";

import { FeedModel, UserModel } from "../../models";

import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import MyPageView from "./my-page-view";

import FeedItem from "../../components/feed-item";

import "./style.scoped.scss";


const MyPage = () => {
  const feedViewModel = new FeedViewModel(new FeedModel());
  const userViewModel = new UserViewModel(new UserModel());

  const items = feedViewModel.getAllFeedList();
  const makeItems = (post, index) => (<FeedItem key={index} post={post} user={userViewModel.getUserLocation()}></FeedItem>);

  return (
    <div className="page-wrap">
      <MyPageView />
      <section className="feed-list">
        {items.map(makeItems)}
      </section>
    </div>
  );
};

export default MyPage;