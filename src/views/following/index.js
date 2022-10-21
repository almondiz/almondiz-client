import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserViewModel } from "../../view-models";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";


const FloatController = ({ floatRef, users }) => {
  const navigate = useNavigate();

  const Top = () => (
    <nav className="float-top top-nav">
      <div className="button button-back" onClick={() => navigate(-1)}>
        <div className="icon"><ArrowBackIcon /></div>
      </div>
      <h3 className="title">구독 <span className="count">{users.length}</span></h3>
    </nav>
  );

  useEffect(() => {
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, [floatRef.current]);

  return <></>;
};


const FollowingPage = ({ floatRef }) => {
  const navigate = useNavigate();

  /** 2. FOLLOW API */
  const userViewModel = new UserViewModel();
  const [users, setUsers] = useState([]);
  const getMyAllFollowings = async () => setUsers(await userViewModel.getMyAllFollowings());
  useEffect(() => { getMyAllFollowings(); }, []);
  /** */


  const FollowingList = ({ users }) => {
    return (
      <ul className="following-list">
        {users.map((user, idx) => {
          const goToProfilePage = navigate => navigate(`/profile/${user.userId}`);

          return (
            <li key={idx} className="following-item">
              <div className="link" onClick={() => goToProfilePage(navigate)} />
      
              <div className="row row-profile">
                <div className="thumb" style={{ backgroundColor: user.userColor }}>{user.userEmoji}</div>
                <div className="text-wrap">
                  <p className="name">{user.userName}</p>
                  <p className="description">{user.userNameDescription}</p>
                </div>
                <button className="button button-unfollow">구독 취소</button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div id="page">
      <main className="content">
        <FollowingList users={users} />
      </main>

      <FloatController floatRef={floatRef} users={users} />
    </div>
  );
};

export default FollowingPage;