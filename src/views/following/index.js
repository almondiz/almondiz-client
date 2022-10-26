import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { UserViewModel } from "../../view-models";

import { StaticComponentRefs } from "../../util";
import { ModalDefaultConfirm } from "../../components/modal-default-forms";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";


const FloatController = ({ followees }) => {
  const navigate = useNavigate();

  const Top = () => (
    <nav className="float-top top-nav">
      <div className="button button-back" onClick={() => navigate(-1)}>
        <div className="icon"><ArrowBackIcon /></div>
      </div>
      <h3 className="title">구독 <span className="count">{followees.length}</span></h3>
    </nav>
  );

  useEffect(() => {
    const { floatRef } = StaticComponentRefs;
    (floatRef?.current?.setTop(<Top />));
    return () => (floatRef?.current?.setTop());
  }, []);

  return <></>;
};


const FollowingPage = () => {
  const navigate = useNavigate();

  /** 2. FOLLOW API */
  const userViewModel = new UserViewModel();
  const [followees, setFollowees] = useState(null);
  const getMyAllFollowings = async () => setFollowees(await userViewModel.getMyAllFollowings());
  useEffect(() => { getMyAllFollowings(); }, []);
  /** */


  const unfollow = async (followee, idx) => {
    const success = await followee.unfollow();
    if (success) {
      const _followees = [...followees];
      _followees.splice(idx, 1);
      setFollowees(_followees);
    }
  };


  const ButtonUnfollow = ({ followee, idx }) => {
    const { modalRef } = StaticComponentRefs;
    const modalDefaultMenuListRef = useRef();

    const showModal = () => {
      modalRef?.current?.show(
        <ModalDefaultConfirm modalRef={modalRef} ref={modalDefaultMenuListRef} title={"정말 구독을 취소하시겠어요?"} />,
        async () => {
          const { choice } = modalDefaultMenuListRef.current?.destruct();
          if (choice)   unfollow(followee, idx);
        }
      );
    };

    return (
      <button className="button button-unfollow" onClick={showModal}>구독 취소</button>
    );
  };


  const FollowingList = ({ followees }) => {
    return (
      <ul className="following-list">
        {followees.map((followee, idx) => {
          const goToUserPage = navigate => navigate(`/user/${followee.userId}`);

          return (
            <li key={idx} className="following-item">
              <div className="link" onClick={() => goToUserPage(navigate)} />
      
              <div className="row row-profile">
                <div className="profile">
                  <div className="thumb" style={{ backgroundColor: followee.userColor }}>{followee.userEmoji}</div>
                  <div className="text-wrap">
                    <p className="name">{followee.userName}</p>
                    <p className="description">{followee.userNameDescription}</p>
                  </div>
                </div>
                <ButtonUnfollow followee={followee} idx={idx} />
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (followees) && (
    <div id="page">
      <main className="content">
        <FollowingList followees={followees} />
      </main>

      <FloatController followees={followees} />
    </div>
  );
};

export default FollowingPage;