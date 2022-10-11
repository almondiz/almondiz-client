import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserModel } from "../../models";
import { UserViewModel } from "../../view-models";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";


const FloatController = ({ floatRef, dataList }) => {
  const navigate = useNavigate();

  const Top = () => (
    <nav className="float-top top-nav">
      <div className="button button-back" onClick={() => navigate(-1)}>
        <div className="icon"><ArrowBackIcon /></div>
      </div>
      <h3 className="title">구독 <span className="count">{dataList.length}</span></h3>
    </nav>
  );

  useEffect(() => {
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, [floatRef.current]);

  return <></>;
};


const SubscriptionsPage = ({ floatRef }) => {
  const navigate = useNavigate();


  // FOLLOW API (USER API)
  const dataList = (() => {
    const userViewModel = new UserViewModel(new UserModel());
    return userViewModel.getMyFollowingData();
  })();
  //


  const FollowingList = ({ dataList }) => {
    return (
      <ul className="following-list">
        {dataList.map((data, idx) => {
          const goToProfilePage = () => navigate(`/profile/${data.userId}`);

          return (
            <li key={idx} className="following-item">
              <div className="link" onClick={goToProfilePage} />
      
              <div className="row row-profile">
                <div className="thumb" style={{ backgroundColor: data.userColor }}>{data.userEmoji}</div>
                <div className="text-wrap">
                  <p className="name">{data.userName}</p>
                  <p className="description">{data.userNameDescription}</p>
                </div>
                <button className="button button-unfollow">구독 취소</button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div id="page">
      <main className="content">
        <FollowingList dataList={dataList} />
      </main>

      <FloatController floatRef={floatRef} dataList={dataList} />
    </div>
  );
};

export default SubscriptionsPage;