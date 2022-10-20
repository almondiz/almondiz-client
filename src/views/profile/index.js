import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Frame } from "../../util";
import { UserModel, PostModel } from "../../models";
import { UserViewModel, PostViewModel } from "../../view-models";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import Logotype from "../../asset/logo/logotype";
import NotificationsIconBorder from "../../asset/icons/mui/notifications-icon-border";
import SettingsIconBorder from "../../asset/icons/mui/settings-icon-border";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";


const FloatController = ({ floatRef, user }) => {
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
    return (user.userRelation !== "me") && <div className="float-header light">{headerFrame.view()}</div>;
  };

  useEffect(() => {
    (floatRef.current?.setHeader(<Header />));
    return () => (floatRef.current?.setHeader());
  }, [floatRef.current]);

  return <></>;
};


const ProfilePage = ({ floatRef }) => {
  const { userId } = useParams();

  const navigate = useNavigate();
  
  /** POST API */
  const postViewModel = new PostViewModel(new PostModel());
  const [postDataList, setPostDataList] = useState([]);
  const getAllPostsByUserId = async () => { setPostDataList(await postViewModel.getAllPostsByUserId(userId)); };
  useEffect(() => { getAllPostsByUserId(); }, []);
  /** */

  // USER API (DUMMY)
  const user = (() => {
    const userViewModel = new UserViewModel(new UserModel());
    return userViewModel.getData(userId);
  })(userId);
  //


  const FollowingEmojiList = ({ user }) => {
    return (
      <div className="emojis">
        {user.followingEmojis.map((emoji, idx) => <div key={idx} className="emoji">{emoji}</div>)}
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

  const ButtonNotice = ({ user }) => {
    const onClick =() => navigate(`/notice`);
    return (
      <button className={`button button-notice ${user.hasUnreadNotices ? "badge" : ""}`} onClick={onClick}>
        <div className={`icon ${user.hasUnreadNotices ? "badge" : ""}`}><NotificationsIconBorder /></div>
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
  const goToFollowingsPage = navigate => navigate(`/subscriptions`);


  return (
    <div id="page">
      {(() => {
        switch (user.userRelation) {
          case "me":
            return (
              <header className="header">
                <div className="brand"><Logotype /></div>
                <div className="buttons right">
                  <ButtonNotice user={user} />
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
          <div className="row row-profile" data-user-relation={user.userRelation}>
            <div className="thumb" style={{ backgroundColor: user.userColor }}>{user.userEmoji}</div>
            <div className="text-wrap">
              <p className="name"
                data-after={(() => {
                  switch (user.userRelation) {
                    case "me":        return "나";
                    case "following": return "구독";
                  }
                  return undefined;
                })()}
              >
                {user.userName}
              </p>
              {(user.userRelation !== "other") && <p className="description">{user.userNameDescription}</p>}
            </div>
          </div>

          {(() => {
            switch (user.userRelation) {
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
              <h5>구독자 수</h5><p>{user.followedCount}</p>
            </div>
            <div className="count half">
              <h5>스크랩된 수</h5><p>{user.scrappedCount}</p>
            </div>
          </div>
          
          {(user.userRelation === "me") && (
            <div className="row row-following">
              <div className="count">
                <h5>구독</h5>
                <p>{user.followingCount}</p>
              </div>
              <FollowingEmojiList user={user} />
              <button className="button button-following-list" onClick={() => goToFollowingsPage(navigate)}>보기</button>
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

      <FloatController floatRef={floatRef} user={user} />
    </div>
  );
};

export default ProfilePage;