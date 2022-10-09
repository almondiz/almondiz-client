import React, { useState, useEffect } from "react";

import { Frame } from "../../../util";
import { PostModel } from "../../../models";
import { PostViewModel } from "../../../view-models";

import TagList, { TagController } from "../../../components/tag-list";

import "./style.scoped.scss";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import SellIconBorder from "../../../asset/icons/mui/sell-icon-border";


const BackdropTag = ({ tagController }) => {
  const postViewModel = new PostViewModel(new PostModel());
  const data = postViewModel.getData(1);

  const tfPlaceholder = "태그를 추가하세요";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move(tf ? 1 : 0);
  }, [tf]);

  // TAG - bug
  const onClickTagItem = data => {
    tagController.push(data);
    setTf("");
  };
  //

  const tagFrame = new Frame([
    (
      <TagList controller={tagController} />
    ),
    (
      <div className="tag-list-group">
        <ul className="list">
          <li className="item" onClick={() => onClickTagItem("맥주")}>맥주</li>
          <li className="item" onClick={() => onClickTagItem("생맥주")}>생맥주</li>
          <li className="item" onClick={() => onClickTagItem("치맥")}>치맥</li>
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
        <article className="post editable">
          <header className="header">
            <div className="row row-shop">
              <button className="shop">
                <div className="thumb" style={{ backgroundImage: `url(${data.shopThumbUrl})` }} />
                <div className="text-wrap">
                  <p className="name">{data.shopName}</p>
                  <p className="description">{data.shopAddress} · {data.shopDistance}</p>
                </div>
              </button>
            </div>
            <nav className="row row-tags">
              <div className="tf">
                <div className="tf-icon"><SellIconBorder /></div>
                <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
                {tf && <button className="tf-clear-button" onClick={() => setTf("")}><CancelIconFill /></button>}
              </div>
              {tagFrame.view()}
            </nav>
          </header>
        </article>
      </article>
    </>
  )
};

export default BackdropTag;