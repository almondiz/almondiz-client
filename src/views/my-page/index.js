import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { FeedModel, UserModel } from "../../models";
import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import FeedItem from "../../components/feed-item";

import "./style.scoped.scss";
import LogotypeImage from "../../asset/logo/logotype.svg";
import NotificationsIconFill from "../../asset/icons/mui/notifications-icon-fill";
import SettingsIconFill from "../../asset/icons/mui/settings-icon-fill";
import EditIconFill from "../../asset/icons/mui/edit-icon-fill";


const FloatFooter = () => {
  const navigate = useNavigate();

  const { scrollDirection } = useSelector(state => ({
    scrollDirection: state.global.scrollDirection,
  }));

  const [ currentFrameIndex, setCurrentFrameIndex ] = useState(0);
  const moveFrame = inc => {
    let _currentFrameIndex = currentFrameIndex;
    _currentFrameIndex += inc;
    _currentFrameIndex = Math.min(Math.max(_currentFrameIndex, 0), frames.length - 1);
    if (_currentFrameIndex === currentFrameIndex)   return;
    return setCurrentFrameIndex(_currentFrameIndex);
  };

  const FloatFooterMain = ({ moveFrame }) => {
    return (
      <section className="frame-main">
        <button className="button-write right" onClick={() => navigate(`/edit-post`)}>
          <div className="icon-sm">
            <EditIconFill />
          </div>
          <p>새 리뷰</p>
        </button>
      </section>
    );
  };
  const frames = [
    <FloatFooterMain moveFrame={moveFrame} />,
  ];
  return (
    <aside className={`float-footer ${scrollDirection === -1 ? "hide" : ""}`}>
      {frames[currentFrameIndex]}
    </aside>
  );
};

const MyPage = () => {
  const feedViewModel = new FeedViewModel(new FeedModel());
  const userViewModel = new UserViewModel(new UserModel());

  const items = feedViewModel.getAllFeedList();
  const makeItems = (post, index) => (<FeedItem key={index} post={post} user={userViewModel.getUserLocation()}></FeedItem>);

  return (
    <div className="page-wrap">
      <header className="header">
        <img className="brand" alt="brand" src={LogotypeImage}/>
        <div className="right">
          <button className="button-noti icon-sm icon-container">
            <NotificationsIconFill />
          </button>
          <button className="button-settings icon-sm icon-container">
            <SettingsIconFill />
          </button>
        </div>
      </header>
      <div className="profile-wrap">
        <div className="profile">
          <img className="thumb" alt="profile" src={"https://picsum.photos/200"} />
          <div className="text-wrap">
            <p className="name">마제멘 호두</p>
            <p className="email">almondiz.95@gmail.com</p>
          </div>
        </div>
        <div className="row">
          <div className="count half">
            <h5>팔로워</h5>
            <p>0</p>
          </div>
          <div className="count half">
            <h5>스크랩된 수</h5>
            <p>0</p>
          </div>
        </div>
        <div className="row">
          <div className="count">
            <h5>팔로잉</h5>
            <p>0</p>
          </div>
          <div className="thumb-wrap">
            <img className="thumb" alt="following" src={"https://picsum.photos/200"} />
            <img className="thumb" alt="following" src={"https://picsum.photos/200"} />
            <img className="thumb" alt="following" src={"https://picsum.photos/200"} />
          </div>
          <button className="button-following">관리</button>
        </div>
        <div className="row">
          <div className="count">
            <h5>글</h5>
            <p>0</p>
          </div>
          <div className="right" />
        </div>
      </div>
      <section className="feed-list">
        {items.map(makeItems)}
      </section>

      <FloatFooter />
    </div>
  );
};

export default MyPage;