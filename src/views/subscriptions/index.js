import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserModel } from "../../models";
import { UserViewModel } from "../../view-models";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


const Subscriptions = ({ me }) => {
  const navigate = useNavigate();

  const userViewModel = new UserViewModel(new UserModel());

  const makeSubscribingList = (userId, idx) => {
    const user = userViewModel.getData(userId);
    return (
      <div key={idx} className="subscribing-item">
        <div className="link" onClick={() => navigate(`/profile/${userId}`)} />

        <div className="profile">
          <div className="thumb" style={{ backgroundColor: user.profile.thumb.background }}>{user.profile.thumb.emoji ? user.profile.thumb.emoji : ""}</div>
          <div className="text-wrap">
            <p className={"alias"}>{me.subscribing[userId]}</p>
            <p className={"name"}>{user.profile.name}</p>
          </div>
          <button className="button-unsubscribe">구독 취소</button>
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <nav className="navbar">
        <div className="button-back icon-sm" onClick={() => navigate(`/me`)}>
          <BackIcon />
        </div>
        <h3 className="title">구독 <span className="count">{Object.keys(me.subscribing).length}</span></h3>
      </nav>

      <main className="content">
        <section className="subscribing-list">
          {Object.keys(me.subscribing).map(makeSubscribingList)}
        </section>
      </main>
    </div>
  );
};

export default Subscriptions;