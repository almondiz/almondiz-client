import React from "react";
import { useNavigate } from "react-router-dom";

import { UserModel } from "../../models";
import { UserViewModel } from "../../view-models";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";


const Subscriptions = ({}) => {
  const navigate = useNavigate();

  const userViewModel = new UserViewModel(new UserModel());
  const me = userViewModel.getMyData();

  const makeSubscribingList = (userId, idx) => {
    const user = userViewModel.getData(userId);
    return (
      <li key={idx} className="subscribing-item">
        <div className="link" onClick={() => navigate(`/profile/${userId}`)} />

        <div className="profile">
          <div className="thumb" style={{ backgroundColor: user.profile.thumb.background }}>{user.profile.thumb.emoji ? user.profile.thumb.emoji : ""}</div>
          <div className="text-wrap">
            <p className={"alias"}>{me.subscribing[userId]}</p>
            <p className={"name"}>{user.profile.name}</p>
          </div>
          <button className="button-unsubscribe">구독 취소</button>
        </div>
      </li>
    );
  };

  return (
    <div className="page">
      <nav className="navbar">
        <div className="button-back icon-sm" onClick={() => navigate(`/me`)}>
          <ArrowBackIcon />
        </div>
        <h3 className="title">구독 <span className="count">{Object.keys(me.subscribing).length}</span></h3>
      </nav>

      <main className="content">
        <ul className="subscribing-list">
          {Object.keys(me.subscribing).map(makeSubscribingList)}
        </ul>
      </main>
    </div>
  );
};

export default Subscriptions;