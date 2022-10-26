import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";

import { Motion, NoScroll } from "../../util";

import "./style.scoped.scss";


const ModalFormMenuList = forwardRef(({ modalRef, title, body=<></>, menus=[] }, ref) => {
  const hideModal = () => modalRef?.current?.hide();
  const destruct = () => ({ choice });
  useImperativeHandle(ref, () => ({ destruct }));

  const [ choice, setChoice ] = useState(null);
  useEffect(() => { hideModal(); }, [choice]);

  return (
    <>
      {title && (
        <header className="modal-header">
          <p className="title">{title}</p>
        </header>
      )}
      {body}
      <ul className="modal-menu-list">
        {menus.map((menu, idx) => (
          <li key={idx} className="modal-menu-item" data-danger={menu.danger} onClick={() => setChoice(menu.choice)}>
            <p>{menu.title}</p>
          </li>
        ))}
        <li className="modal-menu-item" onClick={hideModal}>
          <p>취소</p>
        </li>
      </ul>
    </>
  );
});
const ModalFormConfirm = forwardRef(({ modalRef, title, body=<></>, acceptText="네", declineText="아니요" }, ref) => {
  const hideModal = () => modalRef?.current?.hide();
  const destruct = () => ({ choice });
  useImperativeHandle(ref, () => ({ destruct }));

  const [ choice, setChoice ] = useState(null);
  const onClickAccept = () => setChoice(true);
  const onClickDecline = () => setChoice(false);
  useEffect(() => { hideModal(); }, [choice]);

  return (
    <>
      {title && (
        <header className="modal-header">
          <p className="title">{title}</p>
        </header>
      )}
      {body}
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
const ERR_NO_REF_MESSSAGE = "ref가 할당되지 않았습니다.";
export const showModalFormMenuList = (modalRef, modalMenuListRef, { title, body, menus, callback }) => {
  if (!(modalRef && modalMenuListRef))  throw new Error(ERR_NO_REF_MESSSAGE);
  modalRef?.current?.show(
    <ModalFormMenuList modalRef={modalRef} ref={modalMenuListRef}
      title={title} body={body} menus={menus}
    />,
    async () => {
      const { choice } = modalMenuListRef.current?.destruct();
      callback && (await callback(choice));
    }
  );
};
export const showModalFormConfirm = (modalRef, modalConfirmRef, { title, body, callback }) => {
  if (!(modalRef && modalConfirmRef))   throw new Error(ERR_NO_REF_MESSSAGE);
  modalRef?.current?.show(
    <ModalFormConfirm modalRef={modalRef} ref={modalConfirmRef}
      title={title} body={body}
    />,
    async () => {
      const { choice } = modalConfirmRef.current?.destruct();
      callback && (await callback(choice));
    }
  );
};


const Modal = forwardRef((_, ref) => {
  const { pathname } = useLocation();
  useEffect(() => { !motion.is("hide") && motion.go("hide-in"); }, [pathname]);

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(<></>);
  const [callback, setCallback] = useState(null);

  const MOTION_DELAY = 500;
  const motion = new Motion({
    "hide": async () => {
      if (callback)   await callback();
      setVisible(false), setContent(<></>), setCallback(null);
    },
    "hide-out": (_content, _callback) => {
      setVisible(true), setContent(_content), setCallback(() => _callback);   // wrapping a function to store it
      motion.delay(100, "show");
    },
    "show": () => {},
    "hide-in": () => motion.delay(MOTION_DELAY, "hide"),
  }, "hide");

  const show = (content=<></>, callback=null) => (motion.is("hide") && motion.go("hide-out", [content, callback]));
  const hide = () => (motion.is("show") && motion.go("hide-in"));
  useImperativeHandle(ref, () => ({ show, hide }));

  return visible && (
    <div id="modal" data-motion={motion.get()}>
      <div className="modal-content-wrap">
        <div className="modal-content">{content}</div>
      </div>

      <div className="modal-background" onClick={hide} />
      <NoScroll />
    </div>
  );
});

export default Modal;