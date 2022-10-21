import React, { useState, useEffect } from "react";

import { Frame } from "../../../util";
import { PostModel } from "../../../models";
import { PostViewModel } from "../../../view-models";

import TagList, { pushTag } from "../../../components/tag-list";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import SellIconBorder from "../../../asset/icons/mui/sell-icon-border";


const FloatController = ({ floatRef, frame }) => {
  const Top = () => (
    <nav className="float-top top-nav">
      <button className="button button-back" onClick={() => frame.prev()}>
        <div className="icon"><ArrowBackIcon /></div>
      </button>
      <h3 className="title">음식점 등록</h3>
      <button className="button button-next" onClick={() => frame.walk(-2)}>등록</button>
    </nav>
  );

  useEffect(() => {
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, [floatRef.current]);

  return <></>;
};


// frame 3
const FrameDirectTag = ({
  frame, floatRef,
  shop, setShop
}) => {
  const [ shopTags, setShopTags ] = useState([]);

  // tag
  const DUMMY_SEARCH_TAG_LIST = [
    { tagType: "food", tagId: 5, tagName: "떡볶이" },
    { tagType: "food", tagId: 6, tagName: "순대" },
    { tagType: "food", tagId: 7, tagName: "튀김" },
    { tagType: "food", tagId: 15, tagName: "오뎅" },
  ];
  const onClickTagItem = e => {
    pushTag(shopTags, setShopTags, e);
    setTf("");
  };

  // textfield
  const tfPlaceholder = "태그를 추가하세요";
  const [tf, setTf] = useState("");
  useEffect(() => { tagFrame.move(tf ? 1 : 0); }, [tf]);

  const tagFrame = new Frame([
    (
      <TagList tags={shopTags} editable setTags={setShopTags} />
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
                <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
                <button className={`tf-clear-button ${tf ? "" : "hide"}`} onClick={() => setTf("")}><CancelIconFill /></button>
              </div>
              {tagFrame.view()}
            </nav>
          </header>
        </article>
      </main>

      <FloatController floatRef={floatRef} frame={frame} />
    </>
  )
};

export default FrameDirectTag;