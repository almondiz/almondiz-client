import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

import { Frame } from "../../util";

import Slider from "../../components/slider";
import NaverMap from "../../components/naver-map";

import "./style.scoped.scss";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";
import MyLocationIconFill from "../../asset/icons/mui/my-location-icon-fill";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import LocationOnIconBorder from "../../asset/icons/mui/location-on-icon-border";


const MapDrawer = ({ mapBottomRef }) => {
  const tfPlaceholder = "장소 검색";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move((tfFrame.index === 1 && tf) ? 1 : 0);
  }, [tf]);

  const BottomContent = () => (
    <section className="bottom-item">
      <div className="text-wrap">
        <h3 className="title">수원 영통구 원천동</h3>
        <p className="description">아주대학교</p>
      </div>
      <button className="button button-select-location right" onClick={() => {}}>
        <div className="icon"><LocationOnIconBorder /></div>
        <p>설정</p>
      </button>
    </section>
  );
  const tfHandler = tfFrameIndex => {
    tfFrame.move(tfFrameIndex);
    switch (tfFrameIndex) {
      case 0:
        setTf("");
        mapBottomRef.current?.show({});
        break;
      case 1:
        setTf("");
        break;
      case 2:
        setTf("아주대학교");
        mapBottomRef.current?.show({ content: <BottomContent /> });
        break;
    }
  };

  const tagFrame = new Frame([
    (
      <></>
    ),
    (
      <div className="location-list-group">
        <ul className="list">
          <li className="item" onClick={() => tfHandler(2)}>
            <h3 className="title">아주대학교</h3>
            <p className="description">수원 영통구 원천동</p>
          </li>
          <li className="item">
            <h3 className="title">아주대학교 경영대학원</h3>
            <p className="description">수원 영통구 원천동</p>
          </li>
          <li className="item">
            <h3 className="title">아주대학교다산관</h3>
            <p className="description">수원 영통구 원천동</p>
          </li>
          <li className="item">
            <h3 className="title">아주대학교일신관</h3>
            <p className="description">수원 영통구 원천동</p>
          </li>
        </ul>
      </div>
    ),
  ]);
  const tfFrame = new Frame([
    (
      <section className="tf-frame tf-frame-1">
        <div className="tf" onClick={() => tfHandler(1)}>
          <div className="tf-icon"><SearchIconBorder /></div>
          <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} readOnly />
        </div>
      </section>
    ),
    (
      <section className="tf-frame tf-frame-2">
        <div className="tf">
          <button className="tf-icon" onClick={() => tfHandler(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
          <button className={`tf-clear-button ${tf ? "" : "hide"}`} onClick={() => setTf("")}><CancelIconFill /></button>
        </div>
        {tagFrame.view()}        
      </section>
    ),
    (
      <section className="tf-frame tf-frame-3">
        <div className="tf">
          <button className="tf-icon" onClick={() => tfHandler(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} readOnly onClick={() => tfHandler(1)} />
        </div>
      </section>
    ),
  ]);

  return <aside className="map-drawer">{tfFrame.view()}</aside>;
};


const MapBottom = forwardRef((_, ref) => {
  const BottomInitContent = () => (
    <section className="bottom-item">
      <div className="text-wrap">
        <h3 className="title"><b>서울 서초구 잠원동</b></h3>
        <p className="description">기존에 설정된 위치</p>
      </div>
      <LocationSearchingIcon />
    </section>
  );

  const BottomMyContent = () => (
    <section className="bottom-item">
      <div className="text-wrap">
        <h3 className="title">성남 분당구 백현동</h3>
        <p className="description">내 위치</p>
      </div>
      <div className="buttons right">
        <button className="button button-select-location" onClick={() => {}}>
          <div className="icon"><MyLocationIconFill /></div>
          <p>설정</p>
        </button>
      </div>
    </section>
  );

  const [content, setContent] = useState(<BottomInitContent />);
  const show = ({ content=<BottomInitContent /> }) => {
    setMyLocation(false);
    setContent(content);
  };
  useImperativeHandle(ref, () => ({ show: show, }));

  const [myLocation, setMyLocation] = useState(false);
  const toggleMyLocation = () => {
    if (!myLocation) {
      setContent(<BottomMyContent />);
    } else {
      setContent(<BottomInitContent />);
    }
    setMyLocation(!myLocation);
  };

  return (
    <footer className="map-bottom">
      <button className={`button button-set-my-location ${myLocation ? "set" : ""}`} onClick={toggleMyLocation}>
        <div className="icon">{myLocation ? <MyLocationIconFill /> : <LocationSearchingIcon />}</div>
      </button>
      <div className="bottom-item-container">{content}</div>
    </footer>
  );
});


const BackdropLocation = () => {
  const mapBottomRef = useRef();

  const [distance, setDistance] = useState(5);

  return (
    <>
      <MapDrawer mapBottomRef={mapBottomRef} />
      <div className="map-container">
        <NaverMap />
        <MapBottom ref={mapBottomRef} />
      </div>

      <div className="area-range">
        <div className="row">
          <div className="text-wrap">
            <h3 className="title">위치로부터 <u>{distance}km</u> 이내</h3>
            <p className="description">선택한 범위의 리뷰를 피드에 표시합니다.</p>
          </div>
          <button className="text-button">적용</button>
        </div>
        
        <Slider action={setDistance} initial={distance} min={5} max={30} step={5} ticks={[ "5", "10", "15", "20", "25", "30" ]} />
      </div>
    </>
  );
};

export default BackdropLocation;