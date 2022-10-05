import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Framer } from "../../util";
import { UserModel, PostModel, NoticeModel } from "../../models";
import { UserViewModel, PostViewModel, NoticeViewModel } from "../../view-models";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import LogotypeImage from "../../asset/logo/logotype.svg";
import NotificationsIconBorder from "../../asset/icons/mui/notifications-icon-border";
import SettingsIconBorder from "../../asset/icons/mui/settings-icon-border";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import EditIconFill from "../../asset/icons/mui/edit-icon-fill";


const FloatHandler = ({ floatRef, userId, myUserId }) => {
  const navigate = useNavigate();

  const headerFramer = new Framer(), footerFramer = new Framer();

  const Header = () => {
    headerFramer.init([
      ( // main
        <section className="float-header-frame frame-1">
          <button className="button-back icon-sm" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        </section>
      ),
    ]);
    return (userId !== myUserId) && <div className="float-header">{headerFramer.view()}</div>;
  };
  const Footer = () => {
    footerFramer.init([]);
    return (userId === myUserId) && <div className="float-footer">{footerFramer.view()}</div>;
  }

  useEffect(() => {
    (floatRef.current?.setHeader(<Header />), floatRef.current?.setFooter(<Footer />));
    return () => (floatRef.current?.setHeader(<></>), floatRef.current?.setFooter(<></>));
  }, [floatRef.current]);

  return <></>;
};


const Profile = ({ floatRef }) => {
  const navigate = useNavigate();

  const userViewModel = new UserViewModel(new UserModel());
  const myUserId = userViewModel.getMyUserId();
  const me = userViewModel.getMyData();
  const userId = parseInt(useParams().userId);
  const user = userViewModel.getData(userId);

  const postViewModel = new PostViewModel(new PostModel());
  const posts = [];
  user.posts.map(postId => posts.push(postViewModel.getData(postId)));
  const makePost = (post, idx) => <PostItem key={idx} postId={post.id} post={post} me={me} />;

  const MakeSubscribingList = (userId, idx) => {
    const user = userViewModel.getData(userId);
    return <div key={idx} className="thumb" style={{ backgroundColor: user.profile.thumb.background }}>{user.profile.thumb.emoji ? user.profile.thumb.emoji : ""}</div>;
  };

  const noticeViewModel = new NoticeViewModel(new NoticeModel());

  return (
    <div className="page">
      <header className="header">
        {
          userId === myUserId ?
          (
            <>
              <img className="brand" alt="brand" src={LogotypeImage} />
              <div className="right">
                <button className={`button-notice icon-sm icon-container ${userViewModel.hasUnreadNotices(noticeViewModel) ? "badge" : ""}`} onClick={() => navigate(`/notice`)}>
                  <NotificationsIconBorder />
                </button>
                <button className="button-settings icon-sm icon-container" onClick={() => navigate(`/settings`)}>
                  <SettingsIconBorder />
                </button>
              </div>
            </>
          ) :
          (
            <>
              <div className="right">
                <button className="button-settings icon-sm icon-container" onClick={() => navigate(`/settings`)}>
                  <MoreHorizIcon />
                </button>
              </div>
            </>
          )
        }
      </header>
      <main className="content">
        <div className={`profile-wrap ${userId === myUserId ? "me" : userViewModel.isSubscribing(userId) ? "subscribing" : ""}`}>
          <div className="profile">
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
              <></>
            ) :
            userViewModel.isSubscribing(userId) ?
            (
              <div className="row-button">
                <button className="button-unsubscribe">구독 취소</button>
                <button className="button-change-alias">별명 변경</button>
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
              <></>
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

        <FloatHandler floatRef={floatRef} userId={userId} myUserId={myUserId} />
    </div>
  );
};

export default Profile;