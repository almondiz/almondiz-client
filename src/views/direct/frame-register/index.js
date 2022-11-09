import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { StaticComponentRefs, Frame } from "../../../asset/common/controllers";

import TagList, { pushTag } from "../../../components/tag-list";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import SellIconBorder from "../../../asset/icons/mui/sell-icon-border";


const FloatController = ({ frame }) => {
  const navigate = useNavigate();
  
  const Top = () => (
    <nav className="float-top top-nav">
      <button className="button button-back" onClick={() => frame.prev()}>
        <div className="icon"><ArrowBackIcon /></div>
      </button>
      <h3 className="title">음식점 등록</h3>
      <button className="button button-next" onClick={() => navigate(-1)}>등록</button>
    </nav>
  );

  useEffect(() => {
    const { floatRef } = StaticComponentRefs;
    (floatRef?.current?.setTop(<Top />));
    return () => (floatRef?.current?.setTop());
  }, []);

  return <></>;
};


// frame 2
const FrameRegister = ({
  frame,
  shop, setShop,
  searchFoodTag, createFoodTag,
}) => {
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
  const [ tags, setTags ] = useState([]);
  useEffect(() => {
    const _shop = { ...shop };
    _shop.tags = [...tags];
    setShop(_shop);
  }, [tags]);
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
        <div className="area-if-not-found">
          <h3 className="title">"{tf}" 태그를 찾나요?</h3>
          <button className="button button-if-not-found" onClick={() => onCreateFoodTag(tf)}>직접 등록</button>
        </div>
      </div>
    ),
  ]);

  return (
    <>
      <main className="content">
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
      </main>

      <FloatController frame={frame} />
    </>
  )
};
export default FrameRegister;