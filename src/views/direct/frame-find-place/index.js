import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";

import { StaticComponentRefs, Frame } from "../../../util";

import NaverMap from "../../../components/naver-map";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import SearchIconBorder from "../../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import LocationSearchingIcon from "../../../asset/icons/mui/location-searching-icon";
import MyLocationIconFill from "../../../asset/icons/mui/my-location-icon-fill";
import ArrowBackIosIcon from "../../../asset/icons/mui/arrow-back-ios-icon";


const FloatController = ({ frame }) => {
  const navigate = useNavigate();

  const Top = () => (
    <nav className="float-top top-nav">
      <button className="button button-back" onClick={() => navigate(-1)}>
        <div className="icon"><ArrowBackIcon /></div>
      </button>
      <h3 className="title">음식점 등록</h3>
      <button className="button button-next" onClick={() => frame.next()}>다음</button>
    </nav>
  );

  useEffect(() => {
    const floatRef = StaticComponentRefs.floatRef;
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, []);

  return <></>;
};


const MapDrawer = ({ mapBottomRef, searchPlace }) => {
  // search
  const [ searchResult, setSearchResult ] = useState([]);
  const onSearchPlace = async (tf) => {
    const _places = await searchPlace(tf);
    if (_places) {
      setSearchResult(_places);
    } else {
      setSearchResult([]);
    }
  };

  // textfield
  const TF_PLACEHOLDER = "장소 검색";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move(tf ? 1 : 0);
    onSearchPlace(tf);
  }, [tf]);
  const moveTf = (tfFrameIndex, place) => {
    tfFrame.move(tfFrameIndex);
    switch (tfFrameIndex) {
      case 0:
        setTf("");
        mapBottomRef.current?.show();
        break;
      case 2:
        setTf(place.placeName);
        mapBottomRef.current?.show(<BottomSearchContent place={place} />);
        break;
    }
  };

  const BottomSearchContent = ({ place }) => (
    <section className="bottom-item">
      <div className="row">
        {/*<h3 className="title">음식점 이름</h3>*/}
        <div className="tf">
          <input className="tf-box" type="text" placeholder="음식점 이름" autoFocus />
        </div>
      </div>
    </section>
  );
  const PlaceSearchItem = ({ place }) => (
    <li className="item" data-place-id={place.placeId} onClick={() => moveTf(2, place)}>
      <h3 className="title">{place.placeName}</h3>
      <p className="description">{place.placeAddress}</p>
    </li>
  );
  const tagFrame = new Frame([
    (
      <></>
    ),
    (
      <div className="location-list-group">
        <ul className="list">{searchResult.map((place, idx) => <PlaceSearchItem key={idx} place={place} />)}</ul>
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
          <button className="tf-icon" onClick={() => moveTf("")}><ArrowBackIosIcon /></button>
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
      <p className="msg">새로 등록할 음식점의 위치를 찾아주세요.</p>
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
const FrameFindPlace = ({ frame, searchPlace }) => {
  const mapBottomRef = useRef();

  return (
    <>
      <main className="content">
        <MapDrawer frame={frame} mapBottomRef={mapBottomRef} searchPlace={searchPlace} />
        <div className="map-container">
          <NaverMap />
          <MapBottom ref={mapBottomRef} />
        </div>
      </main>

      <FloatController frame={frame} />
    </>
  )
};

export default FrameFindPlace;