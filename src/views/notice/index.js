import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getTime } from "../../util";
import { NoticeModel } from "../../models";
import { NoticeViewModel } from "../../view-models";

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
  // NOTICE API
  const dataList = (() => {
    const noticeViewModel = new NoticeViewModel(new NoticeModel());
    return noticeViewModel.getMyNoticeData();
  })();
  //


  const NoticeList = ({ dataList }) => {
    return (
      <ul className="notice-list">
        {dataList.map((data, idx) => {
          return (
            <li key={idx} className={`notice-item ${data.isRead ? "" : "new"}`}>
              <div className={`notice-icon ${data.isRead ? "" : "badge"}`}>
                <NotificationsIconBorder />
              </div>
              <div className="text-wrap">
                <p className="message">{data.message}</p>
                <p className="time">{getTime(data.createdAt)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };


  return (
    <div className="page">
      <main className="content">
        <NoticeList dataList={dataList} />
      </main>

      <FloatController floatRef={floatRef} />
    </div>
  );
};

export default NoticePage;