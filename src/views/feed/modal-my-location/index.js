import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import "./style.scoped.scss";


const ModalMyLocation = forwardRef(({ modalRef, set }, ref) => {
  const hideModal = () => modalRef.current?.hide();
  const destruct = () => ({ choice });
  useImperativeHandle(ref, () => ({ destruct }));

  const [ choice, setChoice ] = useState(null);
  const onClickAccept = () => setChoice(true);
  const onClickDecline = () => setChoice(false);
  useEffect(() => { hideModal(); }, [choice]);

  const SET_TEXT = "계속 내 위치로 설정해 둘까요?";
  const UNSET_TEXT = "위치 추적을 해제하시겠어요?";

  return (
    <>
      <header className="modal-header">
        <p className="title">{set ? SET_TEXT : UNSET_TEXT}</p>
      </header>
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

export default ModalMyLocation;