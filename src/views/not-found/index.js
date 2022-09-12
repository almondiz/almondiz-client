import React from "react";

import "./style.scoped.scss";


const NotFound = () => {
  const PIC_TEXT = `(╯°□°）╯︵ ┻━┻`;
  const DESCRIPTION = `이게 머선 페이지고?`;

  return (
    <div className="page-wrap">
      <p className="pic-text" >{PIC_TEXT}</p>
      <p className="description">{DESCRIPTION}</p>
    </div>
  );
};

export default NotFound;