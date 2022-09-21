import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Framer } from "../../models/global";
import { FeedModel, UserModel } from "../../models";
import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import LogotypeImage from "../../asset/logo/logotype.svg";
import NotificationsIconBorder from "../../asset/icons/mui/notifications-icon-border";
import SettingsIconBorder from "../../asset/icons/mui/settings-icon-border";
import EditIconFill from "../../asset/icons/mui/edit-icon-fill";


const Float = () => {
  const Header = () => {
    const scrollDirection = useSelector(state => state.global.scrollDirection);
    return (
      <header className={`header ${scrollDirection === 1 ? "hide" : ""}`}>
      </header>
    )
  };

  const Footer = () => {
    const navigate = useNavigate();

    const framer = new Framer([
      // main frame
      (
        <section className="frame-main">
          <button className="button-write right" onClick={() => navigate(`/edit`)}>
            <div className="icon-sm">
              <EditIconFill />
            </div>
            <p>새 리뷰</p>
          </button>
        </section>
      ),
    ]);

    const scrollDirection = useSelector(state => state.global.scrollDirection);
    return (
      <footer className={`footer ${scrollDirection === -1 ? "hide" : ""}`}>
        {framer.view()}
      </footer>
    );
  };

  return (
    <aside className="float">
      <Header />
      <Footer />
    </aside>
  )
};

const Profile = ({ me }) => {
  const navigate = useNavigate();

  const { uid } = useParams();

  const userViewModel = new UserViewModel(new UserModel());
  const user = userViewModel.getData(uid);

  const feedViewModel = new FeedViewModel(new FeedModel());
  const posts = feedViewModel.getAllFeedList();
  const makePost = (post, index) => <PostItem key={index} post={post} me={me} />;

  return (
    <div className="page">
      <Float />

      <header className="header">
        <img className="brand" alt="brand" src={LogotypeImage}/>
        <div className="right">
          <button className="button-notice icon-sm icon-container" onClick={() => navigate(`/notice`)}>
            <NotificationsIconBorder />
          </button>
          <button className="button-settings icon-sm icon-container" onClick={() => navigate(`/settings`)}>
            <SettingsIconBorder />
          </button>
        </div>
      </header>
      <main className="content">
        <div className={`profile-wrap ${user.profile.uid === me.profile.uid ? "me" : user.profile.isFollowed ? "following" : ""}`}>
          <div className="profile" >
            <div className="thumb" style={{ backgroundColor: user.profile.thumb.background }}>{user.profile.thumb.emoji ? user.profile.thumb.emoji : ""}</div>
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
              false
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
                <div className="thumbs">
                  <div className="thumb" style={{ backgroundColor: user.profile.thumb.background }}>{user.profile.thumb.emoji ? user.profile.thumb.emoji : ""}</div>
                  <div className="thumb" style={{ backgroundColor: user.profile.thumb.background }}>{user.profile.thumb.emoji ? user.profile.thumb.emoji : ""}</div>
                  <div className="thumb" style={{ backgroundColor: user.profile.thumb.background }}>{user.profile.thumb.emoji ? user.profile.thumb.emoji : ""}</div>
                </div>
                <button className="button-following" onClick={() => navigate(`/subscriptions`)}>보기</button>
              </div>
            ) :
            (
              false
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
        <section className="post-list">
          {posts.map(makePost)}
        </section>
        </main>
    </div>
  );
};

export default Profile;