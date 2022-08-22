import React from "react";

import "./style.scoped.scss";

import FeedContent from "../../components/feed-content";

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
      postIamges: [
        ""
      ],
      postDescription: "아주대 근처에있는 팔ㅈ달 수제맥주."
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
      postIamges: [
        ""
      ],
      postDescription: "아주대 근처에있는 팔ㅈ달 수제맥주."
    },
  ];

  const makePosts = (post) => {
    return (<FeedContent post={post}></FeedContent>)
  }

  return (
    <main>
      {dummyFeedData.map(makePosts)}
    </main>
  );
}

export default FeedList;