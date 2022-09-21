import React from "react";

import { FeedModel, UserModel } from "../../models";
import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";


const Scrap = () => {
  const userViewModel = new UserViewModel(new UserModel());
  const me = userViewModel.getMyData();

  const feedViewModel = new FeedViewModel(new FeedModel());
  const posts = feedViewModel.getAllFeedList();
  const makePost = (post, index) => <PostItem key={index} post={post} me={me} />;

  return (
    <div className="page">
      <header className="header">
        <h1 className="title">Scrapped</h1>
        <div className="right" />
      </header>
      <main className="content">
        <section className="post-list">
          {posts.map(makePost)}
        </section>
      </main>
    </div>
  );
};

export default Scrap;