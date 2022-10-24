import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import "./style.scoped.scss";


const ModalConfirm = forwardRef(({
  modalRef,
  email, profileThumb, profileTag, profileNut
}, ref) => {
  const hideModal = () => modalRef.current?.hide();
  const destruct = () => ({ choice });
  useImperativeHandle(ref, () => ({ destruct }));

  const [ choice, setChoice ] = useState(null);
  const onClickAccept = () => setChoice(true);
  const onClickDecline = () => setChoice(false);
  useEffect(() => { hideModal(); }, [choice]);

  return (
    <>
      <header className="modal-header">
        <p className="title">이대로 가입하시겠어요?</p>
      </header>
      <main className="modal-body">
        <div className="profile">
          <div className="thumb" style={{ backgroundColor: profileThumb.color }}>{profileThumb.emoji}</div>
          <div className="text-wrap">
            <p className="name">{profileTag.tagName} {profileNut.nutName}</p>
            <p className="email">{email}</p>
          </div>
        </div>
        <p className="help">연동한 소셜 계정은 타인에게 드러나지 않습니다.</p>
      </main>
      <footer className="modal-footer">
        <button className="button button-accept" onClick={onClickAccept}>
          <p>네</p>
        </button>
        <button className="button button-decline" onClick={onClickDecline}>
          <p>아니요</p>
        </button>
      </footer>
    </>
  );
});

export default ModalConfirm;