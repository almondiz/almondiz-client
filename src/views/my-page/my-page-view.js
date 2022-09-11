import React from "react";

import "./style.scoped.scss";

import LogotypeImage from "../../asset/logo/logotype.svg";

import NotificationsIconFill from "../../asset/icons/mui/notifications-icon-fill";
import SettingsIconFill from "../../asset/icons/mui/settings-icon-fill";


const MyPageView = () => {
  return (
    <>
      <header className="header">
        <img className="brand" alt="brand" src={LogotypeImage}/>
        <div className="right">
          <button className="button-noti icon-sm right">
            <NotificationsIconFill height="1.5rem" fill="#666" />
          </button>
          <button className="button-settings icon-sm">
            <SettingsIconFill height="1.5rem" fill="#666" />
          </button>
        </div>
      </header>
      <div className="profile-wrap">
        <div className="profile">
          <img className="thumb" alt="profile" src={"https://picsum.photos/200"} />
          <div className="text-wrap">
            <p className="id">almondiz</p>
            <p className="name">마제멘 호두</p>
          </div>
        </div>
        <div className="row">
          <div className="count half">
            <h5>팔로워</h5>
            <p>0</p>
          </div>
          <div div className="count half">
            <h5>스크랩된 수</h5>
            <p>0</p>
          </div>
        </div>
        <div className="row">
          <div className="count">
            <h5>팔로잉</h5>
            <p>0</p>
          </div>
          <div className="thumb-wrap">
            <img className="thumb" alt="following" src={"https://picsum.photos/200"} />
            <img className="thumb" alt="following" src={"https://picsum.photos/200"} />
            <img className="thumb" alt="following" src={"https://picsum.photos/200"} />
          </div>
          <button className="button-following">관리</button>
        </div>
        <div className="row">
          <div className="count">
            <h5>글</h5>
            <p>0</p>
          </div>
          <div className="right" />
        </div>
      </div>
    </>
  )
};

export default MyPageView;