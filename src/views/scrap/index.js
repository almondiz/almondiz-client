import React from "react";

import { UserModel, PostModel } from "../../models";
import { UserViewModel, PostViewModel } from "../../view-models";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";


const Scrap = () => {
  const userViewModel = new UserViewModel(new UserModel());
  const me = userViewModel.getMyData();

  const postViewModel = new PostViewModel(new PostModel());
  const posts = postViewModel.getDummyData();
  const makePost = (post, idx) => <PostItem key={idx} postId={post.id} post={post} me={me} />;

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