import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Frame } from "../../util";
import { UserModel, PostModel, NoticeModel } from "../../models";
import { UserViewModel, PostViewModel } from "../../view-models";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import Logotype from "../../asset/logo/logotype";
import NotificationsIconBorder from "../../asset/icons/mui/notifications-icon-border";
import SettingsIconBorder from "../../asset/icons/mui/settings-icon-border";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";


const FloatController = ({ floatRef, userData }) => {
  const navigate = useNavigate();

  const headerFrame = new Frame();
  const Header = () => {
    headerFrame.init([
      ( // main
        <section className="float-header-frame frame-1">
          <button className="button button-back" onClick={() => navigate(-1)}>
            <div className="icon"><ArrowBackIcon /></div>
          </button>
        </section>
      ),
    ]);
    return (userData.userType !== "me") && <div className="float-header">{headerFrame.view()}</div>;
  };

  useEffect(() => {
    (floatRef.current?.setHeader(<Header />));
    return () => (floatRef.current?.setHeader());
  }, [floatRef.current]);

  return <></>;
};


const ProfilePage = ({ floatRef }) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  
  // POST API
  const postDataList = (() => {
    const postViewModel = new PostViewModel(new PostModel());
    return postViewModel.getAllDataByUser(userId);
  })(userId);
  //

  // USER API
  const userData = (() => {
    const userViewModel = new UserViewModel(new UserModel());
    return userViewModel.getData(userId);
  })(userId);


  const FollowingEmojiList = ({ userData }) => {
    return (
      <div className="emojis">
        {userData.followingEmojis.map((emoji, idx) => <div key={idx} className="emoji">{emoji}</div>)}
      </div>
    );
  };
  const PostList = ({ postDataList }) => {
    return (
      <section className="post-list">
        {postDataList.map((data, idx) => <PostItem key={idx} data={data} />)}
      </section>
    );
  };

  const ButtonNotice = ({ userData }) => {
    const onClick =() => navigate(`/notice`);
    return (
      <button className={`button button-notice ${userData.hasUnreadNotices ? "badge" : ""}`} onClick={onClick}>
        <div className={`icon ${userData.hasUnreadNotices ? "badge" : ""}`}><NotificationsIconBorder /></div>
      </button>
    );
  };
  const ButtonSettings = ({}) => {
    const onClick =() => navigate(`/settings`);
    return (
      <button className="button button-settings" onClick={onClick}>
        <div className="icon"><SettingsIconBorder /></div>
      </button>
    );
  };
  const ButtonMore = ({}) => {
    const onClick =() => {};
    return (
      <button className="button button-more" onClick={onClick}>
        <div className="icon"><MoreHorizIcon /></div>
      </button>
    );
  };
  const goToFollowingsPage = () => navigate(`/subscriptions`);


  return (
    <div id="page">
      {(() => {
        switch (userData.userType) {
          case "me":
            return (
              <header className="header">
                <div className="brand"><Logotype /></div>
                <div className="buttons right">
                  <ButtonNotice userData={userData} />
                  <ButtonSettings />
                </div>
              </header>
            );
          default:
            return (
              <header className="header">
                <div className="buttons right">
                  <ButtonMore />
                </div>
              </header>
            );
        }
      })()}
      <main className="body">
        <div className="rows">
          <div className="row row-profile" data-user-type={userData.userType}>
            <div className="thumb" style={{ backgroundColor: userData.userColor }}>{userData.userEmoji}</div>
            <div className="text-wrap">
              <p className="name"
                data-after={(() => {
                  switch (userData.userType) {
                    case "me":        return "나";
                    case "following": return "구독";
                  }
                  return undefined;
                })()}
              >
                {userData.userName}
              </p>
              {(userData.userType !== "other") && <p className="description">{userData.userNameDescription}</p>}
            </div>
          </div>

          {(() => {
            switch (userData.userType) {
              case "following":
                return (
                  <div className="row row-follow">
                    <button className="button button-unfollow">구독 취소</button>
                    <button className="button button-change-alias">별명 변경</button>
                  </div>
                );
              case "other":
                return (
                  <div className="row row-follow">
                    <button className="button button-follow">구독</button>
                  </div>
                );
            }
          })()}

          <div className="row row-counts">
            <div className="count half">
              <h5>구독자 수</h5><p>{userData.followedCount}</p>
            </div>
            <div className="count half">
              <h5>스크랩된 수</h5><p>{userData.scrappedCount}</p>
            </div>
          </div>
          
          {(userData.userType === "me") && (
            <div className="row row-following">
              <div className="count">
                <h5>구독</h5>
                <p>{userData.followingCount}</p>
              </div>
              <FollowingEmojiList userData={userData} />
              <button className="button button-following-list" onClick={goToFollowingsPage}>보기</button>
            </div>
          )}
          
          <div className="row row-post-counts">
            <div className="count">
              <h5>글</h5><p>{postDataList.length}</p>
            </div>
          </div>
        </div>
        <PostList postDataList={postDataList} />
      </main>

      <FloatController floatRef={floatRef} userData={userData} />
    </div>
  );
};

export default ProfilePage;