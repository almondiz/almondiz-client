import React from "react";

import "./style.scoped.scss";

import FeedContent from "../../components/feed-content";

import IconImg from "../../asset/logo/symbol.png";

const FeedList = () => {
  const dummyFeedData = [
    {
      nickname: "닭발피스타치오",
      profileImage: "",
      storeName: "팔달수제맥주",
      storeImage: "",
      createdAt: "20220820H20:20",
      scrapCount: 2,
      commentCount: 2,
      firstComment: "",
      postImages: [
        ""
      ],
      postDescription: "아주대 근처에있는 팔달 수제맥주."
    },
    {
      nickname: "닭발피스타치오",
      profileImage: "",
      storeName: "팔달수제맥주",
      storeImage: "",
      createdAt: "20220820H20:20",
      scrapCount: 2,
      commentCount: 2,
      firstComment: "",
      postImages: [
        ""
      ],
      postDescription: "아주대 근처에있는 팔달 수제맥주."
    },
  ];

  const makePosts = (post) => {
    return (<FeedContent post={post}></FeedContent>)
  }

  return (
    <main>
      <div className="feed-list-head">
        <p className="feed-list-head-title">Feed</p>
        <div className="feed-list-head-wrap">
          <div className="feed-list-head-wrap column">
            <p>수원 팔달구</p>
            <p>우만동</p>
          </div>
          <img className="feed-list-head-wrap-icon" alt="location" src={IconImg} />
        </div>
      </div>
      {dummyFeedData.map(makePosts)}
    </main>
  );
}

export default FeedList;