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
      <div className="button button-back" onClick={() => navigate(-1)}>
        <div className="icon"><ArrowBackIcon /></div>
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

const MapDrawer = ({ frame, searchTags, setShop, mapBottomRef }) => {
  const TF_PLACEHOLDER = "음식점 검색";
  const [tf, setTf] = useState("");
  const [foundTags, setFoundTags] = useState([]);

  useEffect(() => {
    tagFrame.move((tfFrame.index === 1 && tf) ? 1 : 0);
    setFoundTags(searchTags(tf));
  }, [tf]);

  const BottomContent = ({ shop }) => (
    <section className="bottom-item">
      <div className="text-wrap">
        <h3 className="title">{shop.shopName}</h3>
        <p className="description">{shop.shopAddress}</p>
        <TagList tags={shop.tags} small />
      </div>
      <div className="buttons right">
        <button className="button button-select-shop" onClick={() => {
          setShop(shop);
          console.log("[FrameFindShop]", shop)
          frame.walk(3);
        }}>
          <div className="icon"><LocationOnIconBorder /></div>
          <p>선택</p>
        </button>
      </div>
    </section>
  );
  const handleTf = (tfFrameIndex, shop) => {
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
        mapBottomRef.current?.show({ content: <BottomContent shop={shop} /> });
        break;
      default:
        break;
    }
  };

  const shopContent = (shop, idx) => {
    return (
      <li className="item" key={idx} onClick={() => handleTf(2, shop)}>
        <h3 className="title">{shop.shopName}</h3>
        <p className="description">{shop.shopAddress}</p>
        <TagList tags={shop.tags} small />
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
        <div className="tf light" onClick={() => handleTf(1)}>
          <div className="tf-icon"><SearchIconBorder /></div>
          <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} readOnly />
        </div>
      </section>
    ),
    (
      <section className="tf-frame tf-frame-2">
        <div className="tf">
          <button className="tf-icon" onClick={() => handleTf(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
          <button className={`tf-clear-button ${tf ? "" : "hide"}`} onClick={() => setTf("")}><CancelIconFill /></button>
        </div>
        {tagFrame.view()}
      </section>
    ),
    (
      <section className="tf-frame tf-frame-3">
        <div className="tf light">
          <button className="tf-icon" onClick={() => handleTf(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} readOnly onClick={() => handleTf(1)} />
        </div>
      </section>
    ),
  ]);

  return <aside className="map-drawer">{tfFrame.view()}</aside>;
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
    <footer className="map-bottom light">
      <button className={`button button-set-my-location ${myLocation ? "set" : ""}`} onClick={toggleMyLocation}>
        <div className="icon">{myLocation ? <MyLocationIconFill /> : <LocationSearchingIcon />}</div>
      </button>
      <div className="bottom-item-container">{content}</div>
    </footer>
  );
});


// frame 1
const FrameFindShop = ({ frame, searchTags, setShop, floatRef }) => {
  const mapBottomRef = useRef();

  return (
    <>
      <main className="content">
        <MapDrawer
          frame={frame}
          searchTags={searchTags}
          setShop={setShop}
          mapBottomRef={mapBottomRef}
        />
        <div className="map-container">
          <NaverMap />
          <MapBottom ref={mapBottomRef} />
        </div>
      </main>

      <FloatController floatRef={floatRef} />
    </>
  )
};

export default FrameFindShop;