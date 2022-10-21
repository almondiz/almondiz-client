import React, { useState, useEffect } from "react";

import { PostViewModel } from "../../view-models";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";


const ScrapPage = ({}) => {
  /** 4-0. POST API */
  const postViewModel = new PostViewModel();
  const [posts, setPosts] = useState([]);
  const getAllPosts = async () => setPosts(await postViewModel.getAllPosts());
  useEffect(() => { getAllPosts(); }, []);
  /** */


  return (
    <div id="page">
      <header className="header">
        <h1 className="title">Scrapped</h1>
        <div className="right" />
      </header>
      <main className="content">
        <section className="post-list">{posts.map((post, idx) => <PostItem key={idx} post={post} />)}</section>
      </main>
    </div>
  );
};

export default ScrapPage;