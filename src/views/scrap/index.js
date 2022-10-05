import React from "react";
import { useNavigate } from "react-router-dom";

import { UserModel, PostModel } from "../../models";
import { UserViewModel, PostViewModel } from "../../view-models";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";


const Scrap = ({}) => {
  const navigate = useNavigate();

  const userViewModel = new UserViewModel(new UserModel());
  const myUserId = userViewModel.getMyUserId();

  const postViewModel = new PostViewModel(new PostModel());
  const posts = postViewModel.getDummyData();
  const makePost = (post, idx) => <PostItem key={idx} postId={post.id} post={post} />;

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