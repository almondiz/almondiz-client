import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";

import { Framer } from "../../util";

import NaverMapElement from "../../components/naver-map-element";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import LocationOnIconBorder from "../../asset/icons/mui/location-on-icon-border";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";


const makeTag = (tag, idx) => (
  <li key={idx} className="tag">{tag}</li>
);

const BottomItemInit = () => {
  return (
    <section className="bottom-item-init">
      <p className="msg">리뷰할 점포를 검색해주세요.</p>
    </section>
  );
};

const MapFloat = ({ framer, bottom }) => {
  const DummyBottomItem = (
    <section className="bottom-item-1">
      <div className="text-wrap">
        <h3 className="title">팔달수제맥주</h3>
        <p className="description">경기 수원시 영통구 동수원로537번길 57 (원...</p>
        <nav className="tag-wrap">
          <SellIconBorder />
          <ul className="tags">{[ "맥주", "호프" ].map(makeTag)}</ul>
        </nav>
      </div>
      <button className="text-button button-select-shop" onClick={() => framer.walk(3)}>
        <LocationOnIconBorder />
        선택
      </button>
    </section>
  );

  const [textfield, setTextField] = useState("");
  const handleTextfield = e => {
    setTextField(e.target.value);
  };

  const subframer = new Framer();
  subframer.init([
    (
      <section className="frame-1">
        <div className="textfield" onClick={() => subframer.move(1)}>
          <div className="textfield-icon"><SearchIconBorder /></div>
          <input className="textfield-box" type="text" readOnly placeholder="점포 검색" value={textfield} />
        </div>
      </section>
    ),
    (
      <section className="frame-2">
        <div className="textfield">
          <button className="textfield-icon" onClick={() => subframer.move(0)}><ArrowBackIosIcon /></button>
          <input className="textfield-box" type="text" placeholder="점포 검색" autoFocus value={textfield} />
          <button className="textfield-clear-button" onClick={() => setTextField("")}><CancelIconFill /></button>
        </div>

        <ul className="shop-list">
          <li className="shop-item" onClick={() => subframer.move(2)}>
            <h3 className="title">팔달수제맥주</h3>
            <p className="description">경기 수원시 영통구 동수원로537번길 57 (원천동)</p>
            <nav className="tag-wrap">
              <SellIconBorder />
              <ul className="tags">{[ "맥주", "호프" ].map(makeTag)}</ul>
            </nav>
          </li>
          <li className="shop-item">
            <h3 className="title">팔달김수산</h3>
            <p className="description">대구 북구 팔달로 139 (노원동3가)</p>
            <nav className="tag-wrap">
              <SellIconBorder />
              <ul className="tags">{[ "수산물" ].map(makeTag)}</ul>
            </nav>
          </li>
        </ul>
        <div className="shop-if-not-found">
          <h3 className="title">원하는 점포 결과가 없으신가요?</h3>
          <button className="text-button" onClick={() => framer.next()}>직접 등록</button>
        </div>
      </section>
    ),
    (
      <section className="frame-3">
        <div className="textfield" onClick={() => subframer.move(1)}>
          <div className="textfield-icon"><SearchIconBorder /></div>
          <input className="textfield-box" type="text" readOnly value={textfield} />
        </div>
      </section>
    )
  ]);

  return (
    <footer className="foo">
      {subframer.view({ 0: () => { if (textfield !== "") setTextField(""); bottom.current?.setItem(BottomItemInit); }, 2: () => { if (textfield !== "팔달수제맥주") setTextField("팔달수제맥주"); bottom.current?.setItem(DummyBottomItem); } })}
    </footer>
  );
};


const Bottom = forwardRef((_, ref) => {
  const [item, setItem] = useState(BottomItemInit);
  useImperativeHandle(ref, () => ({ item: item, setItem: setItem, }));

  return (
    <footer className="bottom">
      <button className="button-set-current-location icon-sm right">
        <LocationSearchingIcon />
      </button>
      <div className="bottom-item">
        {item}
      </div>
    </footer>
  );
});


// frame 1
const FrameFindShop = ({ framer }) => {
  const navigate = useNavigate();

  const BottomElement = useRef();

  return (
    <>
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </button>
        <h3 className="title">리뷰 작성</h3>
      </nav>

      <main className="content find-shop">
        <div className="map-container">
          <NaverMapElement id="map-find-shop" />
        </div>

        <Bottom ref={BottomElement} />

        <MapFloat framer={framer} bottom={BottomElement} />
      </main>
    </>
  )
};

export default FrameFindShop;