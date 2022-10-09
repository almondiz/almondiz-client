import React, { useState, useEffect } from "react";

import { Frame } from "../../../util";
import { PostModel } from "../../../models";
import { PostViewModel } from "../../../view-models";

import TagList, { TagController } from "../../../components/tag-list";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import SellIconBorder from "../../../asset/icons/mui/sell-icon-border";


const FloatController = ({ floatRef, frame }) => {
  const Top = () => (
    <nav className="float-top top-nav">
      <button className="button-back icon-sm" onClick={() => frame.prev()}>
        <ArrowBackIcon />
      </button>
      <h3 className="title">음식점 등록</h3>
      <button className="button-next" onClick={() => frame.walk(-2)}>등록</button>
    </nav>
  );

  useEffect(() => {
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, [floatRef.current]);

  return <></>;
};


// frame 3
const FrameDirectTag = ({ frame, floatRef }) => {
  // POST API
  const data = (postId => {
    const postViewModel = new PostViewModel(new PostModel());
    return postViewModel.getData(postId);
  })(1);
  //
  

  const tfPlaceholder = "태그를 추가하세요";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move(tf ? 1 : 0);
  }, [tf]);

  // TAG
  const tagController = new TagController(["오뎅", ]);
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
          <li className="item" onClick={() => onClickTagItem("떡볶이")}>떡볶이</li>
          <li className="item" onClick={() => onClickTagItem("순대")}>순대</li>
          <li className="item" onClick={() => onClickTagItem("튀김")}>튀김</li>
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
                <div className="thumb" />
                <div className="text-wrap">
                  <p className="name">아주대 앞 포장마차</p>
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
      </main>

      <FloatController floatRef={floatRef} frame={frame} />
    </>
  )
};

export default FrameDirectTag;