import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getTime } from "../../util";
import { UserModel, NoticeModel } from "../../models";
import { UserViewModel, NoticeViewModel } from "../../view-models";

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


const Notice = ({ floatRef }) => {
  const userViewModel = new UserViewModel(new UserModel());
  const myUserId = userViewModel.getMyUserId();
  const me = userViewModel.getMyData();

  const noticeViewModel = new NoticeViewModel(new NoticeModel());

  const notices = [];
  me.notices.map(noticeId => notices.push(noticeViewModel.getData(noticeId)));
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

export default Notice;