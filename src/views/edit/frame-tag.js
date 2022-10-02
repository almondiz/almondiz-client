import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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


// frame 5
const FrameTag = ({ framer }) => {
  const navigate = useNavigate();

  const postViewModel = new PostViewModel(new PostModel());
  const post = postViewModel.getData(1);

  const subframer = new Framer();
  subframer.init([
    (
      <ul className="tags">{post.tags.map(makeTag)}</ul>
    ),
    (
      <ul className="tag-list">
        <li className="tag-item" onClick={() => { subframer.move(0); setTextField(""); }}>맥주</li>
        <li className="tag-item" onClick={() => { subframer.move(0); setTextField(""); }}>생맥주</li>
        <li className="tag-item" onClick={() => { subframer.move(0); setTextField(""); }}>치맥</li>
      </ul>
    ),
  ]);

  const [textfield, setTextField] = useState("");
  const handleTextfield = e => {
    subframer.move(e.target.value ? 1 : 0);
    setTextField(e.target.value);
  };

  return (
    <>
      <nav className="navbar">
        {/*<button className="button-back icon-sm" onClick={() => framer.prev()}>
          <ArrowBackIcon />
        </button>*/}
        <h3 className="title">태그 추가</h3>
        <button className="button-next" onClick={() => framer.prev()}>
          완료
        </button>
      </nav>

      <main className="content">
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
            <div className="textfield" onClick={() => {}}>
              <div className="textfield-icon"><SellIconBorder /></div>
              <input className="textfield-box" type="text" autoFocus placeholder="태그를 추가하세요" value={textfield} onChange={handleTextfield} />
              <button className="textfield-clear-button" onClick={() => setTextField("")}><CancelIconFill /></button>
            </div>
            {subframer.view()}
          </nav>
        </article>
      </main>
    </>
  )
};

export default FrameTag;