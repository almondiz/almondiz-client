import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { NoticeViewModel } from "../../view-models";

import { StaticComponentRefs } from "../../util";
import { ModalDefaultConfirm } from "../../components/modal-default-forms";

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
    const { floatRef } = StaticComponentRefs;
    (floatRef?.current?.setTop(<Top />));
    return () => (floatRef?.current?.setTop());
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


  const popNotice = async (notice, idx) => {
    const success = await notice.pop();
    if (success) {
      const _notices = [...notices];
      _notices.splice(idx, 1);
      setNotices(_notices);
    }
  };


  const { modalRef } = StaticComponentRefs;
  const modalDefaultMenuListRef = useRef();

  const showModalPop = (notice, idx) => {
    modalRef?.current?.show(
      <ModalDefaultConfirm modalRef={modalRef} ref={modalDefaultMenuListRef} title={"알림을 지우시겠어요?"} />,
      async () => {
        const { choice } = modalDefaultMenuListRef.current?.destruct();
        if (choice)   popNotice(notice, idx);
      }
    );
  };


  const NoticeList = ({ notices }) => {
    return (
      <ul className="notice-list">
        {notices.map((notice, idx) => {
          return (
            <li key={idx} className={`notice-item ${notice.isRead ? "" : "new"}`} onClick={() => showModalPop(notice, idx)}>
              <div className={`icon ${notice.isRead ? "" : "badge"}`}><NotificationsIconBorder /></div>
              <div className="text-wrap">
                <p className="message">{notice.noticeText}</p>
                <p className="time">{notice.noticeCreatedAt}</p>
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