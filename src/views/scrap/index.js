import React from "react";

import { PostModel, UserModel } from "../../models";
import PostViewModel from "../../view-models/post";
import UserViewModel from "../../view-models/user";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";


const Scrap = () => {
  const userViewModel = new UserViewModel(new UserModel());
  const me = userViewModel.getMyData();

  const postViewModel = new PostViewModel(new PostModel());
  const posts = postViewModel.getDummyData();
  const makePost = (post, index) => <PostItem key={index} postId={post.id} post={post} me={me} />;

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