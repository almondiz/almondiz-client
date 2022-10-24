import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { StaticComponentRefs, Frame } from "../../../util";

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


const FloatController = () => {
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
    const floatRef = StaticComponentRefs.floatRef;
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, []);

  return <></>;
};


const MapDrawer = ({
  frame, mapBottomRef,
  setShop,
  searchShop,
}) => {
  const navigate = useNavigate();
  
  // search
  const [ searchResult, setSearchResult ] = useState([]);
  const onSearchShop = async (tf) => {
    const _shops = await searchShop(tf);
    if (_shops) {
      setSearchResult(_shops);
    } else {
      setSearchResult([]);
    }
  };

  // textfield
  const TF_PLACEHOLDER = "음식점 검색";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move(tf ? 1 : 0);
    onSearchShop(tf);
  }, [tf]);
  const moveTf = (tfFrameIndex, shop) => {
    tfFrame.move(tfFrameIndex);
    switch (tfFrameIndex) {
      case 0:
        setTf("");
        mapBottomRef.current?.show();
        break;
      case 2:
        setTf(shop.shopName);
        mapBottomRef.current?.show(<BottomContent shop={shop} />);
        break;
    }
  };

  const BottomContent = ({ shop }) => {
    const onSelectShop = () => {
      setShop(shop);
      console.log("[FrameFindShop]", shop)
      frame.next();
    };
    return (
      <section className="bottom-item">
        <div className="shop-wrap">
          <div className="shop">
            <div className="thumb" style={{ backgroundImage: `url(${shop.shopThumbUrl})` }} />
            <div className="text-wrap">
              <h3 className="title">{shop.shopName}</h3>
              <p className="description">{shop.shopAddress}</p>
            </div>
          </div>
          <TagList tags={shop.tags} small />
        </div>
        <div className="buttons">
          <button className="button button-select-shop" onClick={onSelectShop}>
            <div className="icon"><LocationOnIconBorder /></div>
            <p>선택</p>
          </button>
        </div>
      </section>
    );
  };
  const ShopSearchItem = ({ shop }) => (
    <li className="item" data-shop-id={shop.shopId} onClick={() => moveTf(2, shop)}>
      <h3 className="title">{shop.shopName}</h3>
      <p className="description">{shop.shopAddress}</p>
      <TagList tags={shop.tags} small />
    </li>
  );
  const tagFrame = new Frame([
    (
      <></>
    ),
    (
      <div className="shop-list-group">
        <ul className="list">{searchResult.map((shop, idx) => <ShopSearchItem key={idx} shop={shop} />)}</ul>
        <div className="if-not-found">
          <h3 className="title">원하는 음식점 결과가 없으신가요?</h3>
          <button className="button button-if-not-found" onClick={() => navigate(`/direct`)}>직접 등록</button>
        </div>
      </div>
    ),
  ]);
  const tfFrame = new Frame([
    (
      <section className="tf-frame tf-frame-1">
        <div className="tf color-light" onClick={() => moveTf(1)}>
          <div className="tf-icon"><SearchIconBorder /></div>
          <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} readOnly />
        </div>
      </section>
    ),
    (
      <section className="tf-frame tf-frame-2">
        <div className="tf">
          <button className="tf-icon" onClick={() => moveTf(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
          <button className={`tf-clear-button ${tf ? "" : "hide"}`} onClick={() => setTf("")}><CancelIconFill /></button>
        </div>
        {tagFrame.view()}
      </section>
    ),
    (
      <section className="tf-frame tf-frame-3">
        <div className="tf color-light">
          <button className="tf-icon" onClick={() => moveTf(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} readOnly onClick={() => moveTf(1)} />
        </div>
      </section>
    ),
  ]);

  return <aside className="map-drawer">{tfFrame.view()}</aside>;
};


const MapBottom = forwardRef((_, ref) => {
  const BottomDefaultContent = () => (
    <section className="bottom-item-init">
      <p className="msg">리뷰할 음식점를 검색해주세요.</p>
    </section>
  );
  const [content, setContent] = useState(null);
  const show = (content=<BottomDefaultContent />) => setContent(content);
  useImperativeHandle(ref, () => ({ show }));
  useEffect(() => { show(); }, []);

  return (
    <footer className="map-bottom color-light">
      <div className="bottom-item-container">{content}</div>
    </footer>
  );
});


// frame 1
const FrameFindShop = ({
  frame,
  setShop,
  searchShop,
}) => {
  const mapBottomRef = useRef();

  return (
    <>
      {useMemo(() => (
        <main className="content">
          <MapDrawer
            frame={frame} mapBottomRef={mapBottomRef}
            setShop={setShop}
            searchShop={searchShop}
          />
          <div className="map-container">
            <NaverMap />
            <MapBottom ref={mapBottomRef} />
          </div>
        </main>
      ), [])}

      {useMemo(() => <FloatController />, [])}
    </>
  )
};

export default FrameFindShop;