import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { getTime } from "../../models/global";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";
import NotificationsIconBorder from "../../asset/icons/mui/notifications-icon-border";


const notices = [
  {
    nid: 1,
    uid: 1,
    read: false,
    message: `회원님이 "소고" 음식점을 리뷰한 글의 스크랩 수가 100개를 달성했습니다.`,
    time: 1638802800000,
  },
  {
    nid: 2,
    uid: 1,
    read: true,
    message: `닭발 피스타치오님이 대댓글을 달았습니다.\n"고마워요 :)"`,
    time: 1663155700000,
  },
];


const Notice = () => {
  const navigate = useNavigate();

  const NoticeItem = ({ notice }) => {
    return (
      <li className={`notice-item ${notice.read ? "new" : ""}`}>
        <div className={`notice-icon ${notice.read ? "badge" : ""}`}>
          <NotificationsIconBorder />
        </div>
        <div className="text-wrap">
          <p className="message">{notice.message}</p>
          <p className="time">{getTime(notice.time)}</p>
        </div>
      </li>
    );
  };  
  const makeNotice = (notice, index) => <NoticeItem key={index} notice={notice} />;  
  notices.reverse();

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