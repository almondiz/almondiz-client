import React, { useState, forwardRef, useImperativeHandle } from "react";

import { Motion } from "../../util";

import "./style.scoped.scss";


const Toast = forwardRef((_, ref) => {
  const NORMAL = "normal";
  const ERROR = "error";
  

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const ACTIVE_TIME = 3000;
  const MOTION_DELAY = 500;
  const motion = new Motion({
    "hide": () => (setVisible(false), setMessage(""), setMessageType("")),
    "hide-out": (_message, _messageType) => {
      setVisible(true), setMessage(_message), setMessageType(_messageType);
      motion.delay(100, "show");
    },
    "show": () => motion.delay(ACTIVE_TIME, "hide-in"),
    "hide-in": () => motion.delay(MOTION_DELAY, "hide"),
  }, "hide");

  const log = (message="") => message && motion.go("hide-out", [message, NORMAL]);
  const error = (message="") => message && motion.go("hide-out", [message, ERROR]);
  useImperativeHandle(ref, () => ({ log, error }));

  return visible && (
    <div id="toast" data-motion={motion.get()} data-message-type={messageType}>
      <div className="toast-content-wrap">
        <div className="toast-content">
          <p className={(messageType === ERROR) ? "color-reflect" : ""}>{message}</p>
        </div>
      </div>
    </div>
  );
});

export default Toast;