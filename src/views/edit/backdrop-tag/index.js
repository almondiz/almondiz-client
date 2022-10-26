import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import { Frame } from "../../../util";

import TagList, { pushTag } from "../../../components/tag-list";

import "./style.scoped.scss";
import ExpandMoreIcon from "../../../asset/icons/mui/expand-more-icon";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import SellIconBorder from "../../../asset/icons/mui/sell-icon-border";


const BackdropTag = forwardRef(({
  backdropRef,
  shop, postTags,
  searchFoodTag, createFoodTag,
}, ref) => {
  const hideBackdrop = () => backdropRef?.current?.hide();
  const destruct = () => ({ tags });
  useImperativeHandle(ref, () => ({ destruct }));


  // search
  const [ searchResult, setSearchResult ] = useState([]);
  const onSearchFoodTag = async (tf) => {
    const _tags = await searchFoodTag(tf);
    if (_tags) {
      setSearchResult(_tags);
    } else {
      setSearchResult([]);
    }
  };
  const onCreateFoodTag = async (tf) => {
    const _tag = await createFoodTag(tf);
    if (_tag) {
      onSelectTagItem(_tag);
    }
  };

  // textfield
  const TF_PLACEHOLDER = "태그를 추가하세요";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move(tf ? 1 : 0);
    onSearchFoodTag(tf);
  }, [tf]);

  // tag
  const [ tags, setTags ] = useState([...postTags]);
  const onSelectTagItem = _tag => {
    pushTag(tags, setTags, _tag);
    setTf("");
  };

  const TagSearchItem = ({ tag }) => (
    <li className="item" data-tag-type={tag.tagType} data-tag-id={tag.tagId} onClick={() => onSelectTagItem(tag)}>
      {tag.tagName}
    </li>
  );
  const tagFrame = new Frame([
    (
      <TagList tags={tags} editable setTags={setTags} />
    ),
    (
      <div className="tag-list-group">
        <ul className="list">{searchResult.map((tag, idx) => <TagSearchItem key={idx} tag={tag} />)}</ul>
        {(searchResult.map(tag => tag.tagName).indexOf(tf) === -1) && (
          <div className="if-not-found">
            <h3 className="title">"{tf}" 태그를 찾나요?</h3>
            <button className="button button-if-not-found" onClick={() => onCreateFoodTag(tf)}>직접 등록</button>
          </div>
        )}
      </div>
    ),
  ]);

  return (
    <>
      <header className="backdrop-header" onClick={hideBackdrop}>
        <h3 className="title">태그 추가</h3>
        <div className="button button-close">
          <div className="icon"><ExpandMoreIcon /></div>
        </div>
      </header>
      <main className="backdrop-body">
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
      </main>
    </>
  )
});

export default BackdropTag;