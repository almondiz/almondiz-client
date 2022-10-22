import React, { useState, useEffect } from "react";

import { Frame } from "../../../util";
import { SearchViewModel } from "../../../view-models";

import TagList, { pushTag } from "../../../components/tag-list";

import "./style.scoped.scss";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import SellIconBorder from "../../../asset/icons/mui/sell-icon-border";


const BackdropTag = ({ shop, postTags, setPostTags }) => {
  // tag
  const [ tags, setTags ] = useState([...postTags]);
  useEffect(() => { setPostTags([...tags]); }, [tags]);
  const onClickTagItem = e => {
    pushTag(tags, setTags, e);
    setTf("");
  };

  // textfield
  const TF_PLACEHOLDER = "태그를 추가하세요";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move(tf ? 1 : 0);
    searchTag(tf);
  }, [tf]);

  /** 7. TAG API */
  const [ searchResult, setSearchResult ] = useState([]);
  const searchViewModel = new SearchViewModel();
  const searchTag = async (tagName) => {
    const _tags = await searchViewModel.searchTag(tagName);
    if (_tags) {
      setSearchResult(_tags);
    }
  };
  const createTag = async (tagName) => {
    const _tag = await searchViewModel.createTag(tagName);
    if (_tag) {
      onClickTagItem(_tag);
    }
  };
  /** */

  const tagFrame = new Frame([
    (
      <TagList tags={tags} editable setTags={setTags} />
    ),
    (
      <div className="tag-list-group">
        <ul className="list">
          {searchResult.map((tag, idx) => (
            <li key={idx} className="item" data-tag-type={tag.tagType} data-tag-id={tag.tagId} onClick={() => onClickTagItem(tag)}>
              {tag.tagName}
            </li>
          ))}
        </ul>
        {(searchResult.map(tag => tag.tagName).indexOf(tf) === -1) && (
          <div className="if-not-found">
            <h3 className="title">"{tf}" 태그를 찾나요?</h3>
            <button className="text-button" onClick={() => createTag(tf)}>직접 등록</button>
          </div>
        )}
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
                <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
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