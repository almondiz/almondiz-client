import React from "react";

import { FeedModel, UserModel } from "../../models";
import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import CardItem from "../../components/card-item";

import "./style.scoped.scss";


const Scrap = () => {
  const userViewModel = new UserViewModel(new UserModel());
  const me = userViewModel.getMyData();

  const feedViewModel = new FeedViewModel(new FeedModel());
  const posts = feedViewModel.getAllFeedList();
  const makeCards = (post, index) => <CardItem key={index} post={post} me={me} />;

  return (
    <div className="page-wrap">
      <header className="header">
        <h1 className="title">Scrapped</h1>
        <div className="right" />
      </header>
      <section className="card-list">
        {posts.map(makeCards)}
      </section>
    </div>
  );
};

export default Scrap;