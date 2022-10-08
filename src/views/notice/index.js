import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getTime } from "../../util";
import { UserModel, NoticeModel } from "../../models";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import NotificationsIconBorder from "../../asset/icons/mui/notifications-icon-border";


const FloatController = ({ floatRef }) => {
  const navigate = useNavigate();

  const Top = () => (
    <nav className="float-top top-nav">
      <button className="button-back icon-sm" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </button>
      <h3 className="title">알림</h3>
    </nav>
  );

  useEffect(() => {
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, [floatRef.current]);

  return <></>;
};


const NoticePage = ({ floatRef }) => {
  const userModel = new UserModel();
  const myUserId = userModel.getMyUserId();
  const me = userModel.getMyData();

  const noticeModel = new NoticeModel();

  const notices = [];
  me.notices.map(noticeId => notices.push(noticeModel.getData(noticeId)));
  notices.reverse();

  const NoticeItem = ({ notice }) => {
    return (
      <li className={`notice-item ${notice.isRead[myUserId] ? "" : "new"}`}>
        <div className={`notice-icon ${notice.isRead[myUserId] ? "" : "badge"}`}>
          <NotificationsIconBorder />
        </div>
        <div className="text-wrap">
          <p className="message">{notice.message}</p>
          <p className="time">{getTime(notice.createdAt)}</p>
        </div>
      </li>
    );
  };  
  const makeNotice = (notice, idx) => <NoticeItem key={idx} notice={notice} />;  

  return (
    <div className="page">
      <main className="content">
        <ul className="notice-list">{notices.map(makeNotice)}</ul>
      </main>

      <FloatController floatRef={floatRef} />
    </div>
  );
};

export default NoticePage;