import React, { useState, useEffect } from "react";

import { PostModel } from "../../models";
import { PostViewModel } from "../../view-models";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";


const ScrapPage = ({}) => {
  /** POST API */
  const postViewModel = new PostViewModel(new PostModel());
  const [dataList, setDataList] = useState([]);
  const getAllPosts = async () => { setDataList(await postViewModel.getAllPosts()); };
  useEffect(() => { getAllPosts(); }, []);
  /** */


  return (
    <div id="page">
      <header className="header">
        <h1 className="title">Scrapped</h1>
        <div className="right" />
      </header>
      <main className="content">
        <section className="post-list">{dataList.map((data, idx) => <PostItem key={idx} data={data} />)}</section>
      </main>
    </div>
  );
};

export default ScrapPage;