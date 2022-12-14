import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { UserViewModel } from "../../view-models";

import { StaticComponentRefs } from "../../util";
import { showModalFormConfirm } from "../../components/modal";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";


const FloatController = () => {
  const navigate = useNavigate();

  const Top = () => (
    <nav className="float-top top-nav">
      <button className="button button-back" onClick={() => navigate(-1)}>
        <div className="icon"><ArrowBackIcon /></div>
      </button>
      <h3 className="title">더 보기</h3>
    </nav>
  );

  useEffect(() => {
    const { floatRef } = StaticComponentRefs;
    (floatRef?.current?.setTop(<Top />));
    return () => (floatRef?.current?.setTop());
  }, []);

  return <></>;
};


const MenuPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { modalRef } = StaticComponentRefs;
  const modalFormConfirmRef = useRef();

  /** 1. USER API */
  const userViewModel = new UserViewModel();
  /** */

  const onClickMyAllFavorites = () => {};
  const onClickMyAllComments = () => {};
  const onClickHomepageInformation = () => {};
  const onClickDevelopInformation = () => {};
  const onClickLogout = () => {
    showModalFormConfirm(modalRef, modalFormConfirmRef, {
      title: "로그아웃하시겠어요?",
      callback: async (choice) => (choice && userViewModel.logout({ dispatch, navigate })),
    });
  };
  const onClickWithdrawal = () => {
    showModalFormConfirm(modalRef, modalFormConfirmRef, {
      title: "회원 탈퇴를 하시겠어요?",
      callback: async (choice) => (choice && userViewModel.withdrawal({ dispatch, navigate })),
    });
  };

  return (
    <div id="page">
      <main className="content">
        <ul className="settings-list">
          {/*<li className="settings-item">
            <div className="text-wrap">
              <p className="title">최근 본 글</p>
            </div>
          </li>*/}
          <li className="settings-item" onClick={onClickMyAllFavorites}>
            <div className="text-wrap">
              <p className="title">좋아한 글</p>
            </div>
          </li>
          <li className="settings-item" onClick={onClickMyAllComments}>
            <div className="text-wrap">
              <p className="title">댓글 단 글</p>
            </div>
          </li>
        </ul>

        {/*<ul className="settings-list">
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">공지사항</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">FAQ</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">1:1 문의</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">나의 신고</p>
            </div>
          </li>
        </ul>*/}

        <ul className="settings-list">
          <li className="settings-item" onClick={onClickHomepageInformation}>
            <div className="text-wrap">
              <p className="title">공식 홈페이지</p>
            </div>
          </li>
          <li className="settings-item" onClick={onClickDevelopInformation}>
            <div className="text-wrap">
              <p className="title">만든 사람들</p>
            </div>
          </li>
        </ul>

        <ul className="settings-list">
          {/*<li className="settings-item">
            <div className="text-wrap">
              <p className="title">소셜 로그인 연동</p>
            </div>
          </li>*/}
          <li className="settings-item" onClick={onClickLogout}>
            <div className="text-wrap">
              <p className="title">로그아웃</p>
            </div>
          </li>
        </ul>

        <ul className="settings-list">
          <li className="settings-item danger" onClick={onClickWithdrawal}>
            <div className="text-wrap">
              <p className="title">회원 탈퇴</p>
            </div>
          </li>
        </ul>
      </main>

      <FloatController />
    </div>
  );
};

export default MenuPage;