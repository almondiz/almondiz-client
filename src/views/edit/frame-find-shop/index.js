import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";

import { Frame } from "../../../util";

import NaverMap from "../../../components/naver-map";
import TagList from "../../../components/tag-list";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import SearchIconBorder from "../../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import LocationSearchingIcon from "../../../asset/icons/mui/location-searching-icon";
import MyLocationIconFill from "../../../asset/icons/mui/my-location-icon-fill";
import ArrowBackIosIcon from "../../../asset/icons/mui/arrow-back-ios-icon";
import LocationOnIconBorder from "../../../asset/icons/mui/location-on-icon-border";


const FloatController = ({ floatRef }) => {
  const navigate = useNavigate();

  const Top = () => (
    <nav className="float-top top-nav">
      <div className="button-back icon-sm" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
      <h3 className="title">리뷰 작성</h3>
    </nav>
  );

  useEffect(() => {
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, [floatRef.current]);

  return <></>;
};

const EditDrawer = ({ frame, searchTags, setShopData, mapBottomRef }) => {
  const tfPlaceholder = "음식점 검색";
  const [tf, setTf] = useState("");
  const [foundTags, setFoundTags] = useState([]);

  useEffect(() => {
    tagFrame.move((tfFrame.index === 1 && tf) ? 1 : 0);
    setFoundTags(searchTags(tf));
  }, [tf]);

  const DummyContent = ({ shopData }) => (
    <section className="bottom-item">
      <div className="text-wrap">
        <h3 className="title">{shopData.shopName}</h3>
        <p className="description">{shopData.shopAddress}</p>
        <TagList dataList={shopData.tags.map(({ tagName }) => tagName)} small />
      </div>
      <button className="button-select-shop text-button" onClick={() => {
          setShopData(shopData);
          console.log(shopData)
          frame.walk(3);
        }}>
        <div className="icon"><LocationOnIconBorder /></div>
        
        선택
      </button>
    </section>
  );
  const tfHandler = (tfFrameIndex, shopData) => {
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
        mapBottomRef.current?.show({ content: <DummyContent shopData={shopData} /> });
        break;
      default:
        break;
    }
  };

  const shopContent = (shopData, index) => {
    return (
      <li className="item" onClick={() => tfHandler(2, shopData)}>
        <h3 className="title">{shopData.shopName}</h3>
        <p className="description">{shopData.shopAddress}</p>
        <TagList dataList={shopData.tags.map(({ tagName }) => tagName)} small />
      </li>
    )
  }
  const tagFrame = new Frame([
    (
      <></>
    ),
    (
      <div className="shop-list-group">
        <ul className="list">
          {foundTags.map(shopContent)}
        </ul>
        <div className="if-not-found">
          <h3 className="title">원하는 음식점 결과가 없으신가요?</h3>
          <button className="text-button" onClick={() => frame.next()}>직접 등록</button>
        </div>
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

  return <aside className="edit-drawer">{tfFrame.view()}</aside>;
};


const MapBottom = forwardRef((_, ref) => {
  const BottomInitContent = () => (
    <section className="bottom-item-init">
      <p className="msg">리뷰할 음식점를 검색해주세요.</p>
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
    <footer className="map-bottom">
      <button className={`button-set-my-location icon-sm${myLocation ? " set" : ""}`} onClick={toggleMyLocation}>
        <div className="icon">{myLocation ? <MyLocationIconFill /> : <LocationSearchingIcon />}</div>
      </button>
      <div className="bottom-item-container">{content}</div>
    </footer>
  );
});


// frame 1
const FrameFindShop = ({ frame, searchTags, setShopData, floatRef }) => {
  const mapBottomRef = useRef();

  return (
    <>
      <main className="content">
        <EditDrawer
          frame={frame}
          searchTags={searchTags}
          setShopData={setShopData}
          mapBottomRef={mapBottomRef}
        />
        <div className="map-container">
          <NaverMap id="map-find-shop" />
          <MapBottom ref={mapBottomRef} />
        </div>
      </main>

      <FloatController floatRef={floatRef} />
    </>
  )
};

export default FrameFindShop;