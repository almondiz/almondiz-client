import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { StaticComponentRefs, getTime } from "../../util";
import { NoticeViewModel } from "../../view-models";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import NotificationsIconBorder from "../../asset/icons/mui/notifications-icon-border";


const FloatController = ({ notices }) => {
  const navigate = useNavigate();

  const Top = () => (
    <nav className="float-top top-nav">
      <button className="button button-back" onClick={() => navigate(-1)}>
        <div className="icon"><ArrowBackIcon /></div>
      </button>
      <h3 className="title">알림 <span className="count">{notices.length}</span></h3>
    </nav>
  );

  useEffect(() => {
    const floatRef = StaticComponentRefs.floatRef;
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, []);

  return <></>;
};


const NoticePage = () => {
  /** 3. NOTIFICATION API */
  const noticeViewModel = new NoticeViewModel();
  const [notices, setNotices] = useState(null);
  const getMyNoticeData = async () => setNotices(await noticeViewModel.getMyNoticeData());
  useEffect(() => { getMyNoticeData(); }, []);
  /** */


  const NoticeList = ({ notices }) => {
    return (
      <ul className="notice-list">
        {notices.map((notice, idx) => {
          return (
            <li key={idx} className={`notice-item ${notice.isRead ? "" : "new"}`}>
              <div className={`icon ${notice.isRead ? "" : "badge"}`}><NotificationsIconBorder /></div>
              <div className="text-wrap">
                <p className="message">{notice.noticeText}</p>
                <p className="time">{getTime(notice.noticeCreatedAt)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };


  return (notices) && (
    <div id="page">
      <main className="content">
        <NoticeList notices={notices} />
      </main>

      <FloatController notices={notices} />
    </div>
  );
};

export default NoticePage;