import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import store from "../../store";

import { UserViewModel, PostViewModel } from "../../view-models";

import { StaticComponentRefs, Frame } from "../../util";
import PostItem from "../../components/post-item";
import { ModalDefaultMenuList } from "../../components/modal-default-forms";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import Logotype from "../../asset/logo/logotype";
import NotificationsIconBorder from "../../asset/icons/mui/notifications-icon-border";
import MenuIcon from "../../asset/icons/mui/menu-icon";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";


const FloatController = ({ user }) => {
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
    return (user.userRelation !== "me") && <div className="float-header color-light">{headerFrame.view()}</div>;
  };

  useEffect(() => {
    const { floatRef } = StaticComponentRefs;
    (floatRef?.current?.setHeader(<Header />));
    return () => (floatRef?.current?.setHeader());
  }, []);

  return <></>;
};


const UserPage = () => {
  const userId = parseInt(useParams().userId);

  /** 1. USER API */
  const userViewModel = new UserViewModel();
  const [user, setUser] = useState(null);
  const getUser = async () => {
    const myUserId = store.getState().account.myUserId;
    setUser((userId === myUserId) ? (await userViewModel.whoami()) : (await userViewModel.get(userId)));
  };
  useEffect(() => { getUser(); }, []);
  /** */
  
  /** 4. POST API */
  const postViewModel = new PostViewModel();
  const [posts, setPosts] = useState(null);
  const readAllUserPosts = async () => setPosts(await postViewModel.readAllUserPosts(userId));
  useEffect(() => { readAllUserPosts(); }, []);
  /** */


  const navigate = useNavigate();
  const FollowingsHead = ({ followingsHead }) => {
    return (
      <div className="emojis">
        {followingsHead.map((following, idx) => (
          <button key={idx} className="emoji" onClick={() => following.goToUserPage(navigate)}>
            {following.userEmoji}
          </button>
        ))}
      </div>
    );
  };
  const PostList = ({ posts }) => {
    return (
      <section className="post-list">
        {posts.map((post, idx) => <PostItem key={idx} post={post} />)}
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
  const ButtonMenu = ({}) => {
    const onClick =() => navigate(`/menu`);
    return (
      <button className="button button-menu" onClick={onClick}>
        <div className="icon"><MenuIcon /></div>
      </button>
    );
  };
  const ButtonMore = ({ user }) => {
    const { modalRef } = StaticComponentRefs;
    const modalDefaultMenuListRef = useRef();

    //const onClickModalReport = () => {};

    const showModal = () => {
      const myMenus = [];
      const otherMenus = [
        { title: "신고하기", choice: "REPORT", },
      ];

      modalRef?.current?.show(
        <ModalDefaultMenuList modalRef={modalRef} ref={modalDefaultMenuListRef}
          menus={(user.userRelation === "me") ? myMenus : otherMenus}
        />,
        async () => {
          const { choice } = modalDefaultMenuListRef.current?.destruct();
          switch (choice) {
            case "DELETE":
              return onClickModalDelete();
            case "REPORT":
              return;//onClickModalReport();
          }
        }
      );
    };
    return (
      <button className="button button-more" onClick={showModal}>
        <div className="icon"><MoreHorizIcon /></div>
      </button>
    );
  };
  const goToFollowingsPage = navigate => navigate(`/following`);


  return (user && posts) && (
    <div id="page">
      {(() => {
        switch (user.userRelation) {
          case "me":
            return (
              <header className="header">
                <div className="brand"><Logotype /></div>
                <div className="buttons right">
                  <ButtonNotice user={user} />
                  <ButtonMenu />
                </div>
              </header>
            );
          default:
            return (
              <header className="header" />
            );
        }
      })()}
      <main className="body">
        <div className="area-profile">
          <div className="row row-profile">
            <div className="profile" data-user-relation={user.userRelation}>
              <div className="thumb" style={{ backgroundColor: user.userColor }}>{user.userEmoji}</div>
              <div className="text-wrap">
                <div className="name-wrap">
                  <p className="name">{user.userName}</p>
                  {user.userNameBadge && <p className="name-tag">{user.userNameBadge}</p>}
                </div>
                {(user.userRelation !== "other") && <p className="description">{user.userNameDescription}</p>}
              </div>
            </div>

            {user.userRelation !== "me" && (
              <div className="buttons right">
                <ButtonMore user={user} />
              </div>
            )}
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
              <FollowingsHead followingsHead={user.followingsHead} />
              <button className="button button-following-list" onClick={() => goToFollowingsPage(navigate)}>보기</button>
            </div>
          )}
          
          <div className="row row-post-counts">
            <div className="count">
              <h5>글</h5><p>{posts.length}</p>
            </div>
          </div>
        </div>
        <PostList posts={posts} />
      </main>

      <FloatController user={user} />
    </div>
  );
};

export default UserPage;