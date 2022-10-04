import React, { useState } from "react";

import { Framer } from "../../util";
import { PostModel } from "../../models";
import { PostViewModel } from "../../view-models";

import "./style.scoped.scss";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";
import CloseIcon from "../../asset/icons/mui/close-icon";


const makeTag = (tag, idx) => (
  <li key={idx} className="tag">
    {tag}
    <button className="tag-cancel-button"><CloseIcon /></button>
  </li>
);


const BackdropTag = () => {
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
      <ul className="tags">{post.tags.map(makeTag)}</ul>
    ),
    (
      <ul className="tag-list">
        <li className="tag-item" onClick={() => { subframer.move(0); setTextfield(""); }}>맥주</li>
        <li className="tag-item" onClick={() => { subframer.move(0); setTextfield(""); }}>생맥주</li>
        <li className="tag-item" onClick={() => { subframer.move(0); setTextfield(""); }}>치맥</li>
      </ul>
    ),
  ]);

  return (
    <>
      <article className="post">
        <header className="header">
          <a href={post.shop.link} className="shop">
            <div className="thumb" style={{ backgroundImage: `url(${post.shop.thumb})` }} />
            <div className="text-wrap">
              <p className="name">{post.shop.name}</p>
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
    </>
  )
};

export default BackdropTag;