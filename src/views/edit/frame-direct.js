import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";

import { Framer } from "../../util";

import NaverMap from "../../components/naver-map";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";


const EditDrawer = ({ bottomRef }) => {
  const [tf, setTf] = useState("");
  const handleTf = e => setTf(e.target.value);
  const subframer = new Framer();

  const DummyBottomContent = () => (
    <section className="bottom-item-2">
      <div className="row">
        {/*<h3 className="title">점포 이름</h3>*/}
        <div className="tf">
          <input className="tf-box" type="text" placeholder="점포 이름" autoFocus />
        </div>
      </div>
    </section>
  );
  const keywordToElement = { "아주대학교": <DummyBottomContent />, };

  const fooHandler = keyword => {
    setTf(keyword);
    if (keywordToElement[keyword])
      bottomRef.current?.show({ content: keywordToElement[keyword] });
    else
      bottomRef.current?.show({});
    subframer.move(0);
  };

  subframer.init([
    (
      <section className="frame-1">
        <div className="tf" onClick={() => { setTf(""); subframer.move(1); }}>
          <div className="tf-icon"><SearchIconBorder /></div>
          <input className="tf-box" type="text" placeholder="장소 검색" value={tf} readOnly />
        </div>
      </section>
    ),
    (
      <section className="frame-2">
        <div className="tf">
          <button className="tf-icon" onClick={() => fooHandler("")}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder="장소 검색" value={tf} onChange={handleTf} autoFocus />
          {tf && <button className="tf-clear-button" onClick={() => setTf("")}><CancelIconFill /></button>}
        </div>

        <ul className="shop-list">
          <li className="shop-item" style={{ height: "5rem", }} onClick={() => fooHandler("아주대학교")}>
            <h3 className="title">아주대학교</h3>
            <p className="description">경기 수원시 영통구 월드컵로 206 (원천동)</p>
          </li>
          <li className="shop-item" style={{ height: "5rem", }}>
            <h3 className="title">아주대학교 경영대학원</h3>
            <p className="description">경기 수원시 영통구 월드컵로 206 (원천동)</p>
          </li>
        </ul>
      </section>
    ),
  ]);

  return <aside className="edit-drawer">{subframer.view()}</aside>;
};


const Bottom = forwardRef((_, ref) => {
  const BottomInitContent = () => (
    <section className="bottom-item-init">
      <p className="msg">새로 등록할 점포의 위치를 찾아주세요.</p>
    </section>
  );

  const [content, setContent] = useState(<BottomInitContent />);
  const show = ({ content=<BottomInitContent /> }) => setContent(content);
  useImperativeHandle(ref, () => ({ show: show, }));

  return (
    <footer className="bottom">
      <button className="button-set-current-location icon-sm">
        <LocationSearchingIcon />
      </button>
      <div className="bottom-item">{content}</div>
    </footer>
  );
});


// frame 2
const FrameDirect = ({ framer }) => {
  const bottomRef = useRef();

  return (
    <>
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => framer.prev()}>
          <ArrowBackIcon />
        </button>
        <h3 className="title">점포 등록</h3>
        <button className="button-next" onClick={() => framer.next()}>다음</button>
      </nav>

      <main className="content find-shop">
        <EditDrawer framer={framer} bottomRef={bottomRef} />
        <div className="map-container">
          <NaverMap id="map-init-shop" />
          <Bottom ref={bottomRef} />
        </div>
      </main>
    </>
  )
};

export default FrameDirect;