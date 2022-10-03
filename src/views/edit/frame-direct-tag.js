import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Framer } from "../../util";
import { PostModel } from "../../models";
import { PostViewModel } from "../../view-models";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";
import CloseIcon from "../../asset/icons/mui/close-icon";


const makeTag = (tag, idx) => (
  <li key={idx} className="tag">
    {tag}
    <button className="tag-cancel-button"><CloseIcon /></button>
  </li>
);


// frame 3
const FrameDirectTag = ({ framer }) => {
  const postViewModel = new PostViewModel(new PostModel());
  const post = postViewModel.getData(1);

  const [textfield, setTextfield] = useState("");
  const handleTextfield = e => {
    setTextfield(e.target.value);
    subframer.move(e.target.value ? 1 : 0);
  };
  const subframer = new Framer();
  subframer.init([
    (
      <ul className="tags">{[ "오뎅", ].map(makeTag)}</ul>
    ),
    (
      <ul className="tag-list">
        <li className="tag-item" onClick={() => { subframer.move(0); setTextfield(""); }}>떡볶이</li>
        <li className="tag-item" onClick={() => { subframer.move(0); setTextfield(""); }}>순대</li>
        <li className="tag-item" onClick={() => { subframer.move(0); setTextfield(""); }}>튀김</li>
      </ul>
    ),
  ]);

  return (
    <>
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => framer.prev()}>
          <ArrowBackIcon />
        </button>
        <h3 className="title">태그 추가</h3>
        <button className="button-next" onClick={() => framer.walk(-2)}>등록</button>
      </nav>

      <main className="content">
        <article className="post">
          <header className="header">
            <a href={post.shop.link} className="shop">
              <div className="thumb" style={{ backgroundImage: `` }} />
              <div className="text-wrap">
                <p className="name">아주대 앞 포장마차</p>
                <p className="date">{post.shop.location.address}</p>
              </div>
            </a>
          </header>
    
          <nav className="tag-wrap edit">
            <div className="textfield">
              <div className="textfield-icon"><SellIconBorder /></div>
              <input className="textfield-box" type="text" placeholder="태그를 추가하세요" value={textfield} onChange={handleTextfield} autoFocus />
              <button className="textfield-clear-button" onClick={() => setTextfield("")}><CancelIconFill /></button>
            </div>
            {subframer.view()}
          </nav>
        </article>
      </main>
    </>
  )
};

export default FrameDirectTag;