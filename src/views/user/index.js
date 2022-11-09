import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useParams, useNavigate } from "react-router-dom";

import store from "../../store";

import { UserViewModel, PostViewModel } from "../../view-models";

import { StaticComponentRefs, Frame } from "../../asset/common/controllers";
import PostList from "../../components/post-list";
import { showModalFormConfirm, showModalFormMenuList } from "../../components/modal";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import Logotype from "../../asset/logo/logotype";
import NotificationsIconBorder from "../../asset/icons/mui/notifications-icon-border";
import MenuIcon from "../../asset/icons/mui/menu-icon";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";


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
    const { myUserId } = store.getState().account;
    setUser((userId === myUserId) ? (await userViewModel.whoami()) : (await userViewModel.get(userId)));
  };
  useEffect(() => { getUser(); }, []);

  const follow = async (alias) => {
    const success = await userViewModel.follow(userId, alias);
    if (success) {
      const userName = alias;
      const { userName: userNameDescription } = user;
      const _user = { ...user, ...{ userRelation: "following", userName, userNameDescription } };
      setUser(_user);
    }
  };
  const changeAlias = async (alias) => {
    const success = await userViewModel.changeAlias(userId, alias);
    if (success) {
      const userName = alias;
      const { userName: userNameDescription } = user;
      const _user = { ...user, ...{ userRelation: "following", userName, userNameDescription } };
      setUser(_user);
    }
  };
  const unfollow = async () => {
    const success = await userViewModel.unfollow(userId);
    if (success) {
      const { userNameDescription: userName } = user;
      const userNameDescription = undefined;
      const _user = { ...user, ...{ userRelation: "other", userName, userNameDescription } };
      setUser(_user);
    }
  };
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


  const modalAliasContentRef = useRef();
  const ModalAliasContent = forwardRef(({ alias="" }, ref) => {
    // textfield
    const TF_PLACEHOLDER = "별명 지정";
    const [tf, setTf] = useState(alias);
    useImperativeHandle(ref, () => ({ tf }));
  
    return (
      <main className="modal-body area-alias-input">
        <div className="tf">
          <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
          <button className={`tf-clear-button ${tf ? "" : "hide"}`} onClick={() => setTf("")}><CancelIconFill /></button>
        </div>
        <p className="help">다음부터는 이 별명으로 보이게 됩니다.</p>
      </main>
    );
  });

  const { modalRef } = StaticComponentRefs;
  const modalFormConfirmRef = useRef();
  const modalFormMenuListRef = useRef();
  const ButtonFollow = ({ user }) => {
    const onClick = () => {
      showModalFormConfirm(modalRef, modalFormConfirmRef, {
        title: "구독 설정",
        body: <ModalAliasContent ref={modalAliasContentRef} />,
        callback: async (choice) => {
          if (choice) {
            const _alias = modalAliasContentRef.current?.tf;
            follow(_alias);
          }
        },
      });
    };
    return (
      <button className="button button-follow" onClick={onClick}>
        <p>구독</p>
      </button>
    );
  };
  const ButtonChangeAlias = ({ user }) => {
    const alias = user.userName;    // alias if user.userRelation === "following"
    const onClick = () => {
      showModalFormConfirm(modalRef, modalFormConfirmRef, {
        title: "별명 변경",
        body: <ModalAliasContent ref={modalAliasContentRef} alias={alias} />,
        callback: async (choice) => {
          if (choice) {
            const _alias = modalAliasContentRef.current?.tf;
            changeAlias(_alias);
          }
        },
      });
    };
    return (
      <button className="button button-change-alias" onClick={onClick}>
        <p>별명 변경</p>
      </button>
    );
  };
  const ButtonUnfollow = ({ user }) => {
    const onClick = () => {
      showModalFormConfirm(modalRef, modalFormConfirmRef, {
        title: "정말 구독을 취소하시겠어요?",
        callback: async (choice) => (choice && unfollow()),
      });
    };
    return (
      <button className="button button-unfollow" onClick={onClick}>
        <p>구독 취소</p>
      </button>
    );
  };
  const ButtonMore = ({ user }) => {
    //const onClickModalReport = () => {};

    const onClick = () => {
      const myMenus = [];
      const otherMenus = [
        { title: "신고하기", choice: "REPORT", },
      ];
      showModalFormMenuList(modalRef, modalFormMenuListRef, {
        menus: (user.userRelation === "me") ? myMenus : otherMenus,
        callback: async (choice) => {
          switch (choice) {
            case "DELETE":
              return onClickModalDelete();
            case "REPORT":
              return;//onClickModalReport();
          }
        },
      });
    };
    return (
      <button className="button button-more" onClick={onClick}>
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
                    <ButtonUnfollow user={user} />
                    <ButtonChangeAlias user={user} />
                  </div>
                );
              case "other":
                return (
                  <div className="row row-follow">
                    <ButtonFollow user={user} />
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
        <section className="post-list">
          <PostList posts={posts} setPosts={setPosts} userViewModel={userViewModel} />
        </section>
      </main>

      <FloatController user={user} />
    </div>
  );
};
export default UserPage;