import React from "react";

import "./style.scoped.scss";
import FeedContent from "../../components/feed-content";

import IconImg from "../../asset/logo/symbol.png";

const MyPage = () => {
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
  const makeFeeds = () => {
    return (<FeedContent />);
  }

  return (
    <main>
      <div className="mypage-header">
        <img className="mypage-header-logo" alt="logo" src={IconImg}/>
        <img className="mypage-header-notification" alt="notification" src={IconImg}/>
        <img className="mypage-header-setting" alt="setting" src={IconImg}/>
      </div>
      <div className="mypage-profile">
        <div className="mypage-profile-box">
          <img className="mypage-profile-image" alt="profile" src={IconImg} />
          <div className="mypage-profile-col">
            <div className="mypage-profile-row">
              <p className="mypage-profile-name">almondiz</p>
              <p className="mypage-profile-tag">나</p>
            </div>
            <p className="mypage-profile-nickname">마제멘 호두</p>
          </div>
        </div>
        <div className="mypage-profile-box line">
          <div className="mypage-profile-wrap">
            <p className="mypage-profile-key">팔로워</p>
            <p className="mypage-profile-key">0</p>
          </div>
          <div className="mypage-profile-wrap">
            <p className="mypage-profile-key">스크랩된 수</p>
            <p className="mypage-profile-key">0</p>
          </div>
        </div>
        <div className="mypage-profile-box line">
          <p className="mypage-profile-key">팔로잉</p>
          <p className="mypage-profile-key">0</p>
          <div className="mypage-profile-following">
            <img alt="follower" src={IconImg} />
            <img alt="follower" src={IconImg} />
            <img alt="follower" src={IconImg} />
          </div>
          <p className="mypage-profile-button">관리</p>
        </div>
        <div className="mypage-profile-box">
          <p className="mypage-profile-key">글</p>
          <p className="mypage-profile-key">0</p>
          <div className="mypage-profile-row right">
            <img className="mypage-profile-icon" alt="icon" src={IconImg} />
            <img className="mypage-profile-icon" alt="icon" src={IconImg} />
          </div>
        </div>
      </div>
      <div className="mypage-feeds">
        {dummyFeedData.map(makeFeeds)}
      </div>
    </main>
  )
}

export default MyPage;