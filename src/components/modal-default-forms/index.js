import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import "./style.scoped.scss";


export const ModalDefaultMenuList = forwardRef(({ modalRef, menus=[] }, ref) => {
  const hideModal = () => modalRef?.current?.hide();
  const destruct = () => ({ choice });
  useImperativeHandle(ref, () => ({ destruct }));

  const [ choice, setChoice ] = useState(null);
  useEffect(() => { hideModal(); }, [choice]);

  return (
    <>
      <ul className="modal-menu-list">
        {menus.map((menu, idx) => (
          <li key={idx} className="modal-menu-item" data-danger={menu.danger} onClick={() => setChoice(menu.choice)}>
            <p>{menu.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
});

export const ModalDefaultConfirm = forwardRef(({ modalRef, title, acceptText="네", declineText="아니요" }, ref) => {
  const hideModal = () => modalRef?.current?.hide();
  const destruct = () => ({ choice });
  useImperativeHandle(ref, () => ({ destruct }));

  const [ choice, setChoice ] = useState(null);
  const onClickAccept = () => setChoice(true);
  const onClickDecline = () => setChoice(false);
  useEffect(() => { hideModal(); }, [choice]);

  return (
    <>
      <header className="modal-header">
        <p className="title">{title}</p>
      </header>
      <footer className="modal-footer">
        <button className="button button-accept" onClick={onClickAccept}>
          <p>{acceptText}</p>
        </button>
        <button className="button button-decline" onClick={onClickDecline}>
          <p>{declineText}</p>
        </button>
      </footer>
    </>
  );
});
