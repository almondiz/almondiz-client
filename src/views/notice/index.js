import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
const getTime = epoch => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;

  const now = new Date();

  const dt = Math.floor(now.valueOf() - epoch);
  if (dt < MINUTE)
    return `방금`;
  else if (dt < HOUR)   // 1 ~ 59 mins
    return `${Math.floor(dt / MINUTE)}분 전`;
  else if (dt < DAY)    // 1 ~ 23 hours
    return `${Math.floor(dt / HOUR)}시간 전`;
  else if (dt < WEEK)   // 1 ~ 7 days
    return `${Math.floor(dt / DAY)}일 전`;
  
  const date = new Date(epoch);
  return (date.getFullYear() !== now.getFullYear() ? `${date.getFullYear()}년 ` : ``) + `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

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

const Notice = () => {
  const navigate = useNavigate();

  const makeNotices = (notice, index) => <NoticeItem key={index} notice={notice} />;
  notices.reverse();

  return (
    <div className="page-wrap">
      <div className="frame-social">
        <nav className="navbar">
          <div className="button-back icon-sm" onClick={() => navigate(`/me`)}>
            <BackIcon />
          </div>
          <h3 className="title">알림</h3>
        </nav>

        <main className="content">
          <ul className="notice-list">{notices.map(makeNotices)}</ul>

          {/*<p className="description">{`아래의 소셜 계정으로\n가입을 진행합니다.`}</p>
          <img className="social-icon google" alt="Google" src={GoogleSocialImage} />
          <p className="email">{`almondiz.ajou@gmail.com`}</p>*/}
        </main>

        <footer className="footer">
          {/*<p className="help">다른 계정으로 <span onClick={() => navigate(`/login`)}>로그인 또는 회원 가입</span></p>
          <button className="button-next" onClick={() => !moveFrame(1) && navigate(`/feed`)}>다음</button>*/}
        </footer>
      </div>
    </div>
  );
};

export default Notice;