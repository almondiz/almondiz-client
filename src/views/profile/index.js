import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Frame } from "../../util";
import { UserModel, PostModel, NoticeModel } from "../../models";
import { PostViewModel } from "../../view-models";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import LogotypeImage from "../../asset/logo/logotype.svg";
import NotificationsIconBorder from "../../asset/icons/mui/notifications-icon-border";
import SettingsIconBorder from "../../asset/icons/mui/settings-icon-border";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";


const FloatController = ({ floatRef, userId, myUserId }) => {
  const navigate = useNavigate();

  const headerFrame = new Frame(), footerFrame = new Frame();
  const Header = () => {
    headerFrame.init([
      ( // main
        <section className="float-header-frame frame-1">
          <button className="button-back icon-sm" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        </section>
      ),
    ]);
    return (userId !== myUserId) && <div className="float-header">{headerFrame.view()}</div>;
  };
  const Footer = () => {
    footerFrame.init([]);
    return (userId === myUserId) && <div className="float-footer">{footerFrame.view()}</div>;
  }

  useEffect(() => {
    (floatRef.current?.setHeader(<Header />), floatRef.current?.setFooter(<Footer />));
    return () => (floatRef.current?.setHeader(), floatRef.current?.setFooter());
  }, [floatRef.current]);

  return <></>;
};


const ProfilePage = ({ floatRef }) => {
  const navigate = useNavigate();

  const userModel = new UserModel();
  const myUserId = userModel.getMyUserId();
  const userId = parseInt(useParams().userId);
  const user = userModel.getData(userId);

  const postModel = new PostModel();
  
  // POST API
  const dataList = (() => {
    const postModel = new PostModel();
    const postViewModel = new PostViewModel(postModel);

    const _dataList = [];
    user.posts.map(postId => _dataList.push(postViewModel.getData(postId)));
    return _dataList;
  })();
  //
  

  const MakeSubscribingList = (userId, idx) => {
    const user = userModel.getData(userId);
    return <div key={idx} className="thumb" style={{ backgroundColor: user.profile.thumb.background }}>{user.profile.thumb.emoji ? user.profile.thumb.emoji : ""}</div>;
  };

  const noticeModel = new NoticeModel();

  return (
    <div className="page">
      <header className="header">
        {
          userId === myUserId ?
          (
            <>
              <img className="brand" alt="brand" src={LogotypeImage} />
              <div className="right">
                <button className={`button-notice icon-sm icon-container ${userModel.hasUnreadNotices(noticeModel) ? "badge" : ""}`} onClick={() => navigate(`/notice`)}>
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
        <div className={`profile-wrap ${userId === myUserId ? "me" : userModel.isSubscribing(userId) ? "subscribing" : ""}`}>
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
              userModel.isSubscribing(userId) ?
              (
                <div className="text-wrap">
                  <p className={"alias"}>{userModel.getAlias(userId)}</p>
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
            userModel.isSubscribing(userId) ?
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
              <p>{userModel.getSubscribedCount(postModel, userId)}</p>
            </div>
          </div>
          {
            userId === myUserId ?
            (
              <div className="row">
                <div className="count">
                  <h5>구독</h5>
                  <p>{userModel.getSubscribingCount(userId)}</p>
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
              <p>{dataList.length}</p>
            </div>
            <div className="right" />
          </div>
        </div>
        <section className="post-list">{dataList.map((data, idx) => <PostItem key={idx} data={data} />)}</section>
        </main>

        <FloatController floatRef={floatRef} userId={userId} myUserId={myUserId} />
    </div>
  );
};

export default ProfilePage;