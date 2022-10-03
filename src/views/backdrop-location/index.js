import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";

import { Framer } from "../../util";

import Slider from "../../components/slider";
import NaverMap from "../../components/naver-map";

import "./style.scoped.scss";
import MyLocationIconFill from "../../asset/icons/mui/my-location-icon-fill";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import LocationOnIconBorder from "../../asset/icons/mui/location-on-icon-border";


const MapFloat = ({ BottomElement }) => {
  const [textfield, setTextfield] = useState("");
  const handleTextfield = e => setTextfield(e.target.value);
  const subframer = new Framer();

  const DummyBottomContent = () => (
    <section className="bottom-item-3">
      <div className="text-wrap">
        <h3 className="title">아주대학교</h3>
        <p className="description">경기 수원시 영통구 월드컵로 206 (원천동)</p>
      </div>
      <button className="text-button button-select-shop" onClick={() => {}}>
        <LocationOnIconBorder />
        설정
      </button>
    </section>
  );
  const keywordToElement = { "아주대학교": <DummyBottomContent />, };

  const fooHandler = keyword => {
    setTextfield(keyword);
    if (keywordToElement[keyword])
      BottomElement.current?.show({ content: keywordToElement[keyword] });
    else
      BottomElement.current?.show({});
    subframer.move(0);
  };

  subframer.init([
    (
      <section className="frame-1">
        <div className="textfield" onClick={() => { setTextfield(""); subframer.move(1); }}>
          <div className="textfield-icon"><SearchIconBorder /></div>
          <input className="textfield-box" type="text" placeholder="장소 검색" value={textfield} readOnly />
        </div>
      </section>
    ),
    (
      <section className="frame-2">
        <div className="textfield">
          <button className="textfield-icon" onClick={() => fooHandler("")}><ArrowBackIosIcon /></button>
          <input className="textfield-box" type="text" placeholder="장소 검색" value={textfield} onChange={handleTextfield} autoFocus />
          <button className="textfield-clear-button" onClick={() => setTextfield("")}><CancelIconFill /></button>
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

  return <aside className="map-float">{subframer.view()}</aside>;
};


const Bottom = forwardRef((_, ref) => {
  const BottomInitContent = () => <></>;

  const [content, setContent] = useState(<BottomInitContent />);
  const show = ({ content=<BottomInitContent /> }) => setContent(content);
  useImperativeHandle(ref, () => ({ show: show, }));

  return (
    <footer className="bottom">
      <button className="button-set-current-location icon-sm right">
        <LocationSearchingIcon />
      </button>
      <div className="bottom-item">{content}</div>
    </footer>
  );
});


const BackdropLocation = () => {
  const BottomElement = useRef();

  return (
    <>
      <div className="foo">
        <div className="area-my-location">
          <div className="icon location-icon"><MyLocationIconFill /></div>
          <p className="location-text">수원시 팔달구 우만동</p>
          <button className="text-button">현 위치로 설정</button>
        </div>
      </div>

      <MapFloat BottomElement={BottomElement} />
      <div className="map-container">
        <NaverMap id="map-find-shop" />
        <Bottom ref={BottomElement} />
      </div>

      <div className="bar">
        <div className="row">
          <div className="text-wrap">
            <h3 className="title">위치로부터 <u>15km</u> 이내</h3>
            <p className="description">선택한 범위의 리뷰만 피드에 표시됩니다.</p>
          </div>
          <button className="text-button">적용</button>
        </div>
        
        <Slider />
      </div>
    </>
  );
};

export default BackdropLocation;