import React from "react";

import "./style.scoped.scss";


const NotFoundPage = () => {
  const PIC_TEXT = `(╯°□°）╯︵ ┻━┻`;
  const DESCRIPTION = `이게 머선 페이지고?`;

  return (
    <div id="page">
      <main className="content">
        <p className="pic-text" >{PIC_TEXT}</p>
        <p className="description">{DESCRIPTION}</p>
      </main>
    </div>
  );
};
export default NotFoundPage;