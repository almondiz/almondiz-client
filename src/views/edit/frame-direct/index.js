import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

import { Frame } from "../../../util";

import NaverMap from "../../../components/naver-map";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import SearchIconBorder from "../../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import LocationSearchingIcon from "../../../asset/icons/mui/location-searching-icon";
import MyLocationIconFill from "../../../asset/icons/mui/my-location-icon-fill";
import ArrowBackIosIcon from "../../../asset/icons/mui/arrow-back-ios-icon";


const FloatController = ({ floatRef, frame }) => {
  const Top = () => (
    <nav className="float-top top-nav">
      <button className="button-back icon-sm" onClick={() => frame.prev()}>
        <ArrowBackIcon />
      </button>
      <h3 className="title">음식점 등록</h3>
      <button className="button-next" onClick={() => frame.next()}>다음</button>
    </nav>
  );

  useEffect(() => {
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, [floatRef.current]);

  return <></>;
};


const EditDrawer = ({ mapBottomRef }) => {
  const tfPlaceholder = "장소 검색";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move((tfFrame.index === 1 && tf) ? 1 : 0);
  }, [tf]);

  const DummyContent = () => (
    <section className="bottom-item">
      <div className="row">
        {/*<h3 className="title">음식점 이름</h3>*/}
        <div className="tf">
          <input className="tf-box" type="text" placeholder="음식점 이름" autoFocus />
        </div>
      </div>
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
        mapBottomRef.current?.show({ content: <DummyContent /> });
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
        <div className="tf tf-step-1" onClick={() => tfHandler(1)}>
          <div className="tf-icon"><SearchIconBorder /></div>
          <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} readOnly />
        </div>
      </section>
    ),
    (
      <section className="tf-frame tf-frame-2">
        <div className="tf tf-step-2">
          <button className="tf-icon" onClick={() => tfHandler("")}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
          {tf && <button className="tf-clear-button" onClick={() => setTf("")}><CancelIconFill /></button>}
        </div>
        {tagFrame.view()}
      </section>
    ),
    (
      <section className="tf-frame tf-frame-3">
        <div className="tf tf-step-3">
          <button className="tf-icon" onClick={() => tfHandler(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} readOnly onClick={() => tfHandler(1)} />
        </div>
      </section>
    ),
  ]);

  return <aside className="edit-drawer">{tfFrame.view()}</aside>;
};


const Bottom = forwardRef((_, ref) => {
  const BottomInitContent = () => (
    <section className="bottom-item-init">
      <p className="msg">새로 등록할 음식점의 위치를 찾아주세요.</p>
    </section>
  );

  const [content, setContent] = useState(<BottomInitContent />);
  const show = ({ content=<BottomInitContent /> }) => setContent(content);
  useImperativeHandle(ref, () => ({ show: show, }));

  const [myLocation, setMyLocation] = useState(false);
  const toggleMyLocation = () => {
    setMyLocation(!myLocation);
  };

  return (
    <footer className="bottom">
      <button className={`button-set-my-location icon-sm${myLocation ? " set" : ""}`} onClick={toggleMyLocation}>
        {myLocation ? <MyLocationIconFill /> : <LocationSearchingIcon />}
      </button>
      <div className="bottom-item-container">{content}</div>
    </footer>
  );
});


// frame 2
const FrameDirect = ({ frame, floatRef }) => {
  const mapBottomRef = useRef();

  return (
    <>
      <main className="content">
        <EditDrawer frame={frame} mapBottomRef={mapBottomRef} />
        <div className="map-container">
          <NaverMap id="map-init-shop" />
          <Bottom ref={mapBottomRef} />
        </div>
      </main>

      <FloatController floatRef={floatRef} frame={frame} />
    </>
  )
};

export default FrameDirect;