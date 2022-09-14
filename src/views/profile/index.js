import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { FeedModel, UserModel } from "../../models";
import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import CardItem from "../../components/card-item";

import "./style.scoped.scss";
import LogotypeImage from "../../asset/logo/logotype.svg";
import NotificationsIconFill from "../../asset/icons/mui/notifications-icon-fill";
import SettingsIconFill from "../../asset/icons/mui/settings-icon-fill";
import EditIconFill from "../../asset/icons/mui/edit-icon-fill";


const FloatFooter = () => {
  const navigate = useNavigate();

  const scrollDirection = useSelector(state => state.global.scrollDirection);

  const [ currentFrameIndex, setCurrentFrameIndex ] = useState(0);
  const moveFrame = inc => {
    let _currentFrameIndex = currentFrameIndex;
    _currentFrameIndex += inc;
    _currentFrameIndex = Math.min(Math.max(_currentFrameIndex, 0), frames.length - 1);
    if (_currentFrameIndex === currentFrameIndex)   return false;
    setCurrentFrameIndex(_currentFrameIndex);
    return true;
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

const Profile = ({ me }) => {
  const navigate = useNavigate();

  const { uid } = useParams();

  const userViewModel = new UserViewModel(new UserModel());
  const user = userViewModel.getData(uid);

  const feedViewModel = new FeedViewModel(new FeedModel());
  const posts = feedViewModel.getAllFeedList();
  const makeCards = (post, index) => <CardItem key={index} post={post} me={me} />;

  return (
    <div className="page-wrap">
      <header className="header">
        <img className="brand" alt="brand" src={LogotypeImage}/>
        <div className="right">
          <button className="button-notice icon-sm icon-container" onClick={() => navigate(`/notice`)}>
            <NotificationsIconFill />
          </button>
          <button className="button-settings icon-sm icon-container" onClick={() => navigate(`/settings`)}>
            <SettingsIconFill />
          </button>
        </div>
      </header>
      <div className={`profile-wrap ${user.profile.uid === me.profile.uid ? "me" : user.profile.isFollowed ? "following" : ""}`}>
        <div className="profile" >
          <div className="thumb" alt="profile" style={{ backgroundImage: `url(${user.profile.thumb.emoji})`, backgroundColor: user.profile.thumb.background }} />
          {
            user.profile.uid === me.profile.uid ?
            (
              <div className="text-wrap">
                <p className={"name"}>{user.profile.name}</p>
                <p className={"email"}>{user.profile.email}</p>
              </div>
            ) :
            user.profile.isFollowed ?
            (
              <div className="text-wrap">
                <p className={"alias"}>{user.profile.alias}</p>
                <p className={"name"}>{user.profile.name}</p>
              </div>
            ) :
            (
              <div className="text-wrap">
                <p className={"name"}>{user.profile.name}</p>
              </div>
            )
          }
        </div>

        {
          user.profile.uid === me.profile.uid ?
          (
            <></>
          ) :
          user.profile.isFollowed ?
          (
            <div className="row-button">
              <button className="button-follow">구독 취소</button>
              <button className="button-alias">별명 변경</button>
            </div>
          ) :
          (
            <div className="row-button">
              <button className="button-follow">구독</button>
            </div>
          )
        }

        <div className="row">
          <div className="count half">
            <h5>구독자 수</h5>
            <p>{user.counts.follower}</p>
          </div>
          <div className="count half">
            <h5>스크랩된 수</h5>
            <p>{user.counts.scrap}</p>
          </div>
        </div>
        {
          user.profile.uid === me.profile.uid ?
          (
            <div className="row">
              <div className="count">
                <h5>구독</h5>
                <p>{user.counts.following}</p>
              </div>
              <div className="thumb-wrap">
                <img className="thumb" alt="following" src={"https://picsum.photos/id/110/200"} />
                <img className="thumb" alt="following" src={"https://picsum.photos/id/120/200"} />
                <img className="thumb" alt="following" src={"https://picsum.photos/id/130/200"} />
              </div>
              <button className="button-following" onClick={() => navigate(`/subscriptions`)}>보기</button>
            </div>
          ) :
          (
            <></>
          )
        }
        <div className="row">
          <div className="count">
            <h5>글</h5>
            <p>{user.counts.post}</p>
          </div>
          <div className="right" />
        </div>
      </div>
      <section className="card-list">
        {posts.map(makeCards)}
      </section>

      <FloatFooter />
    </div>
  );
};

export default Profile;