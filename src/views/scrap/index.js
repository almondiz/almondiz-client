import React, { useState, useEffect } from "react";

import { PostViewModel, UserViewModel } from "../../view-models";

import PostList from "../../components/post-list";

import "./style.scoped.scss";


const ScrapPage = () => {
  /** 4. POST API */
  const postViewModel = new PostViewModel();
  const [posts, setPosts] = useState(null);
  const readAllScrappedPosts = async () => setPosts(await postViewModel.readAllScrappedPosts());
  useEffect(() => { readAllScrappedPosts(); }, []);
  /** */
  /** 1. USER API */
  const userViewModel = new UserViewModel();
  /** */
  
  return (posts) && (
    <div id="page">
      <header className="header">
        <h1 className="title">Scrapped</h1>
        <div className="right" />
      </header>
      <main className="content">
        <PostList posts={posts} setPosts={setPosts} userViewModel={userViewModel} />
      </main>
    </div>
  );
};

export default ScrapPage;