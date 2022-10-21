import React, { useState, useEffect } from "react";

import { Frame } from "../../../util";

import TagList, { pushTag } from "../../../components/tag-list";

import "./style.scoped.scss";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import SellIconBorder from "../../../asset/icons/mui/sell-icon-border";


const BackdropTag = ({ shop, postTags, setPostTags }) => {
  // tag
  const DUMMY_SEARCH_TAG_LIST = [
    { tagType: "food", tagId: 3, tagName: "맥주" },
    { tagType: "food", tagId: 6, tagName: "생맥주" },
    { tagType: "food", tagId: 7, tagName: "치맥" },
  ];
  const [ tags, setTags ] = useState([...postTags]);
  useEffect(() => { setPostTags([...tags]); }, [tags]);
  const onClickTagItem = e => {
    pushTag(tags, setTags, e);
    setTf("");
  };

  // textfield
  const tfPlaceholder = "태그를 추가하세요";
  const [tf, setTf] = useState("");
  useEffect(() => { tagFrame.move(tf ? 1 : 0); }, [tf]);

  const tagFrame = new Frame([
    (
      <TagList tags={tags} editable setTags={setTags} />
    ),
    (
      <div className="tag-list-group">
        <ul className="list">
          {DUMMY_SEARCH_TAG_LIST.map((tag, idx) => <li key={idx} className="item" onClick={() => onClickTagItem(tag)}>{tag.tagName}</li>)}
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
                <div className="thumb" style={{ backgroundImage: `url(${shop.shopThumbUrl})` }} />
                <div className="text-wrap">
                  <p className="name">{shop.shopName}</p>
                  <p className="description">{shop.shopAddress}</p>
                </div>
              </button>
            </div>
            <nav className="row row-tags">
              <div className="tf">
                <div className="tf-icon"><SellIconBorder /></div>
                <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
                <button className={`tf-clear-button ${tf ? "" : "hide"}`} onClick={() => setTf("")}><CancelIconFill /></button>
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