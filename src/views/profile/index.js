import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Framer } from "../../models/global";
import { UserModel, PostModel, NoticeModel } from "../../models";
import UserViewModel from "../../view-models/user";
import PostViewModel from "../../view-models/post";
import NoticeViewModel from "../../view-models/notice";

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

  const userViewModel = new UserViewModel(new UserModel());
  const myUserId = userViewModel.getMyUserId();
  //const me = userViewModel.getMyData();
  const userId = parseInt(useParams().userId);
  const user = userViewModel.getData(userId);

  const postViewModel = new PostViewModel(new PostModel());
  const posts = [];
  user.posts.map(postId => posts.push(postViewModel.getData(postId)));
  const makePost = (post, index) => <PostItem key={index} postId={post.id} post={post} me={me} />;

  const MakeSubscribingList = (userId, index) => {
    const user = userViewModel.getData(userId);
    return <div key={index} className="thumb" style={{ backgroundColor: user.profile.thumb.background }}>{user.profile.thumb.emoji ? user.profile.thumb.emoji : ""}</div>;
  };

  const noticeViewModel = new NoticeViewModel(new NoticeModel());

  return (
    <div className="page">
      <Float />

      <header className="header">
        <img className="brand" alt="brand" src={LogotypeImage}/>
        <div className="right">
          <button className={`button-notice icon-sm icon-container ${userViewModel.hasUnreadNotices(noticeViewModel) ? "badge" : ""}`} onClick={() => navigate(`/notice`)}>
            <NotificationsIconBorder />
          </button>
          <button className="button-settings icon-sm icon-container" onClick={() => navigate(`/settings`)}>
            <SettingsIconBorder />
          </button>
        </div>
      </header>
      <main className="content">
        <div className={`profile-wrap ${userId === myUserId ? "me" : userViewModel.isSubscribing(userId) ? "subscribing" : ""}`}>
          <div className="profile" >
            <div className="thumb" style={{ backgroundColor: user.profile.thumb.background }}>{user.profile.thumb.emoji ? user.profile.thumb.emoji : ""}</div>
            {
              userId === myUserId ?
              (
                <div className="text-wrap">
                  <p className={"name"}>{user.profile.name}</p>
                  <p className={"email"}>{user.profile.email}</p>
                </div>
              ) :
              userViewModel.isSubscribing(userId) ?
              (
                <div className="text-wrap">
                  <p className={"alias"}>{userViewModel.getAlias(userId)}</p>
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
            userId === myUserId ?
            (
              false
            ) :
            userViewModel.isSubscribing(userId) ?
            (
              <div className="row-button">
                <button className="button-subscribe">구독 취소</button>
                <button className="button-alias">별명 변경</button>
              </div>
            ) :
            (
              <div className="row-button">
                <button className="button-subscribe">구독</button>
              </div>
            )
          }

          <div className="row">
            <div className="count half">
              <h5>구독자 수</h5>
              <p>{user.subscribed.length}</p>
            </div>
            <div className="count half">
              <h5>스크랩된 수</h5>
              <p>{userViewModel.getSubscribedCount(postViewModel, userId)}</p>
            </div>
          </div>
          {
            userId === myUserId ?
            (
              <div className="row">
                <div className="count">
                  <h5>구독</h5>
                  <p>{userViewModel.getSubscribingCount(userId)}</p>
                </div>
                <div className="thumbs">
                  {Object.keys(user.subscribing).map(MakeSubscribingList)}
                </div>
                <button className="button-subscribing-list" onClick={() => navigate(`/subscriptions`)}>보기</button>
              </div>
            ) :
            (
              false
            )
          }
          <div className="row">
            <div className="count">
              <h5>글</h5>
              <p>{user.posts.length}</p>
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