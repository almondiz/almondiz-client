import React, { useState, useEffect } from "react";

import { Frame } from "../../util";
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
  const data = postViewModel.getData(1);

  const tfPlaceholder = "태그를 추가하세요";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move(tf ? 1 : 0);
  }, [tf]);

  const tagFrame = new Frame([
    (
      <ul className="tags">{data.postTags.map(makeTag)}</ul>
    ),
    (
      <div className="tag-list-group">
        <ul className="list">
          <li className="item" onClick={() => setTf("")}>맥주</li>
          <li className="item" onClick={() => setTf("")}>생맥주</li>
          <li className="item" onClick={() => setTf("")}>치맥</li>
        </ul>
        <div className="if-not-found">
          <h3 className="title">"{tf}" 태그를 찾나요?</h3>
          <button className="text-button" onClick={() => setTf("")}>직접 등록</button>
        </div>
      </div>
    ),
  ]);

  return (
    <>
      <article className="post">
        <header className="header">
          <div className="shop">
            <div className="thumb" style={{ backgroundImage: `url(${data.shopThumbUrl})` }} />
            <div className="text-wrap">
              <p className="name">{data.shopName}</p>
              <p className="date">{data.shopAddress}</p>
            </div>
          </div>
        </header>
  
        <nav className="tags-wrap area-edit-tag">
          <div className="tf">
            <div className="tf-icon"><SellIconBorder /></div>
            <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
            {tf && <button className="tf-clear-button" onClick={() => setTf("")}><CancelIconFill /></button>}
          </div>
          {tagFrame.view()}
        </nav>
      </article>
    </>
  )
};

export default BackdropTag;