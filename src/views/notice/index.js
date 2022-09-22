import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { getTime } from "../../models/global";
import { UserModel, NoticeModel } from "../../models";
import UserViewModel from "../../view-models/user";
import NoticeViewModel from "../../view-models/notice";


import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";
import NotificationsIconBorder from "../../asset/icons/mui/notifications-icon-border";


const Notice = () => {
  const navigate = useNavigate();

  const userViewModel = new UserViewModel(new UserModel());
  const myUserId = userViewModel.getMyUserId();
  const me = userViewModel.getMyData();

  const noticeViewModel = new NoticeViewModel(new NoticeModel());

  const notices = [];
  me.notices.map((noticeId, index) => notices.push(noticeViewModel.getData(noticeId)));
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
  const makeNotice = (notice, index) => <NoticeItem key={index} notice={notice} />;  

  return (
    <div className="page">
      <nav className="navbar">
        <div className="button-back icon-sm" onClick={() => navigate(`/me`)}>
          <BackIcon />
        </div>
        <h3 className="title">알림</h3>
      </nav>

      <main className="content">
        <ul className="notice-list">{notices.map(makeNotice)}</ul>
      </main>
    </div>
  );
};

export default Notice;