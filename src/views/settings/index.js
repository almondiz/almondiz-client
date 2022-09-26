import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { goBack } from "../../util";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
        <h3 className="title">개인 설정</h3>
      </nav>

      <main className="content"></main>
    </div>
  );
};

export default Settings;