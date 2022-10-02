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


const makeTag = (tag, idx) => (
  <li key={idx} className="tag">{tag}</li>
);

const BottomItemInit = () => {
  return (
    <section className="bottom-item-init">
      <p className="msg">위치가 어디인가요? 마커를 찍어주세요.</p>
    </section>
  );
};

const MapFloat = ({ framer, bottom }) => {
  const DummyBottomItem = (
    <section className="bottom-item-2">
      <div className="row">
        {/*<h3 className="title">점포 이름</h3>*/}
        <div className="textfield">
          <input className="textfield-box" type="text" placeholder="점포 이름" autoFocus />
        </div>
      </div>
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
          <input className="textfield-box" type="text" readOnly placeholder="장소 검색" value={textfield} />
        </div>
      </section>
    ),
    (
      <section className="frame-2">
        <div className="textfield">
          <button className="textfield-icon" onClick={() => subframer.move(0)}><ArrowBackIosIcon /></button>
          <input className="textfield-box" type="text" placeholder="장소 검색" autoFocus value={textfield} />
          <button className="textfield-clear-button" onClick={() => setTextField("")}><CancelIconFill /></button>
        </div>

        <ul className="shop-list">
          <li className="shop-item" style={{ height: "5rem", }} onClick={() => subframer.move(2)}>
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
      {subframer.view({ 0: () => { if (textfield !== "") setTextField(""); bottom.current?.setItem(BottomItemInit); }, 2: () => { if (textfield !== "아주대학교") setTextField("아주대학교"); bottom.current?.setItem(DummyBottomItem); } })}
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


// frame 2
const FrameDirect = ({ framer }) => {
  const navigate = useNavigate();

  const BottomElement = useRef();

  return (
    <>
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => framer.prev()}>
          <ArrowBackIcon />
        </button>
        <h3 className="title">점포 등록</h3>
        <button className="button-next" onClick={() => framer.next()}>
          다음
        </button>
      </nav>

      <main className="content find-shop">
        <div className="map-container">
          <NaverMapElement id="map-init-shop" />
        </div>

        <Bottom ref={BottomElement} />

        <MapFloat framer={framer} bottom={BottomElement} />
      </main>
    </>
  )
};

export default FrameDirect;