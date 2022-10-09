import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserModel } from "../../models";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";


const FloatController = ({ floatRef, me }) => {
  const navigate = useNavigate();

  const Top = () => (
    <nav className="float-top top-nav">
      <div className="button-back icon-sm" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
      <h3 className="title">구독 <span className="count">{Object.keys(me.subscribing).length}</span></h3>
    </nav>
  );

  useEffect(() => {
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, [floatRef.current]);

  return <></>;
};


const SubscriptionsPage = ({ floatRef }) => {
  const navigate = useNavigate();

  const userModel = new UserModel();
  const me = userModel.getMyData();

  const makeSubscribingList = (userId, idx) => {
    const user = userModel.getData(userId);
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
      <main className="content">
        <ul className="subscribing-list">
          {Object.keys(me.subscribing).map(makeSubscribingList)}
        </ul>
      </main>

      <FloatController floatRef={floatRef} me={me} />
    </div>
  );
};

export default SubscriptionsPage;