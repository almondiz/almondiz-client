import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Frame, Motion } from "../../../util";

import "./style.scoped.scss";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import ArrowBackIosIcon from "../../../asset/icons/mui/arrow-back-ios-icon";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import RefreshIcon from "../../../asset/icons/mui/refresh-icon";


const MenuName = ({ getRandomNut, changeNut }) => {
  const [nut, setNut] = useState(getRandomNut());
  const onChangeNut = () => (motion.is("stop") && motion.go("move-in"));
  const onChangeNutStart = () => {
    let _nut;
    while (true) {
      _nut = getRandomNut();
      if (_nut.id === nut.id)
        continue;
      break;
    }
    setNut(_nut);
  };
  useEffect(() => { changeNut(nut.id); }, [nut])


  const tfPlaceholder = "좋아하는 음식";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move((tfFrame.index === 1 && tf) ? 1 : 0);
  }, [tf]);

  const tfHandler = (tfFrameIndex, text="") => {
    tfFrame.move(tfFrameIndex);
    setTf(text);
  };

  // TAG
  const onClickTagItem = text => {
    setTf(text);
    tfHandler(0, text);
  };
  //

  // Motion
  const MOTION_DELAY = 200;
  const motion = new Motion({
    "stop": () => {},
    "move-in": () => {
      onChangeNutStart();
      motion.delay(MOTION_DELAY / 4, "move-out");
    },
    "move-out": () => {
      motion.delay(MOTION_DELAY, "stop");
    }
  }, "stop");
  //

  const tagFrame = new Frame([
    (
      <></>
    ),
    (
      <div className="tag-list-group">
        <ul className="list">
          <li className="item" onClick={() => onClickTagItem("떡볶이")}>떡볶이</li>
          <li className="item" onClick={() => onClickTagItem("마라탕")}>마라탕</li>
          <li className="item" onClick={() => onClickTagItem("제육볶음")}>제육볶음</li>
          <li className="item" onClick={() => onClickTagItem("돈까스")}>돈까스</li>
          <li className="item" onClick={() => onClickTagItem("김치찌개")}>김치찌개</li>
        </ul>
      </div>
    ),
  ]);
  const tfFrame = new Frame([
    (
      <section className="tf-frame tf-frame-1" >
        <div className="tf">
          <input className="name-first tf-box" type="text" placeholder={tfPlaceholder} value={tf} readOnly onClick={() => tfHandler(1)}/>
          <div className={`name-last ${motion.get()}`} onClick={onChangeNut}>
            <p className="field">{nut.name}</p>
            <button className="name-refresh-icon">
              <div className="icon"><RefreshIcon /></div>
            </button>
          </div>
        </div>
      </section>
    ),
    (
      <section className="tf-frame tf-frame-2">
        <div className="tf">
          <button className="tf-icon" onClick={() => tfHandler(0)}><ArrowBackIosIcon /></button>
          <input className="name-first tf-box" type="text" placeholder={tfPlaceholder} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
          <button className={`tf-clear-button ${tf ? "" : "hide"}`} onClick={() => setTf("")}><CancelIconFill /></button>
        </div>
        {tagFrame.view()}
      </section>
    ),
  ]);

  return <aside className="menu-name">{tfFrame.view()}</aside>;
};



const MenuThumb = ({ getRandomThumb, changeThumb }) => {
  const [thumbs, setThumbs] = useState([null, null, null, null, null].map(() => getRandomThumb()));
  const onChangeThumb = () => (motion.is("stop") && motion.go("move"));
  const _onChangeThumbEnd = () => {
    let _thumbs = [...thumbs];
    _thumbs.shift();
    _thumbs.push(getRandomThumb());
    setThumbs(_thumbs);
  };
  useEffect(() => { changeThumb(thumbs[0]); }, [thumbs])

  // Motion
  const MOTION_DELAY = 300;
  const motion = new Motion({
    "stop": () => {},
    "move": () => {
      motion.delay(MOTION_DELAY, "stop");
      return _onChangeThumbEnd;
    },
  }, "stop");
  //

  return (
    <div className="menu-thumb" onClick={onChangeThumb}>
      <div className={`thumbs ${motion.get()}`}>
        {motion.is("move") && <div className="thumb" style={{ backgroundColor: thumbs[4].color }}>{thumbs[4].emoji}</div>}
        <div className="thumb" style={{ backgroundColor: thumbs[3].color }}>{thumbs[3].emoji}</div>
        <div className="thumb" style={{ backgroundColor: thumbs[2].color }}>{thumbs[2].emoji}</div>
        <div className="thumb" style={{ backgroundColor: thumbs[1].color }}>{thumbs[1].emoji}</div>
        <div className="thumb" style={{ backgroundColor: thumbs[0].color }}>{thumbs[0].emoji}</div>
      </div>
      <button className="thumb-refresh-icon">
        <div className="icon"><RefreshIcon /></div>
      </button>
    </div>
  );
};



// frame 2
const FrameProfile = ({
  frame,
  changeProfile,
  changeNut,
  changeTag,
  getProfile,
  getNut,
  getTag,
  getRandomProfile,
  getRandomNut,
}) => {
  return (
    <>
      <nav className="top-nav">
        <button className="button button-back" onClick={() => frame.prev()}>
          <div className="icon"><ArrowBackIcon /></div>
        </button>
        <h3 className="title">프로필 생성</h3>
      </nav>
      
      <main className="content">
        <div className="menu-thumb-group">
          <MenuThumb getRandomThumb={getRandomProfile} changeThumb={changeProfile} />
          <h5 className="description">이모지</h5>
        </div>

        <div className="menu-name-group">
          <MenuName getRandomNut={getRandomNut} changeNut={changeNut} />
          <h5 className="description">닉네임</h5>
        </div>

        <footer className="main-footer">
          <p className="help">한번 정한 프로필은 나중에 바꿀 수 없습니다.</p>
          <button className="button button-next" onClick={() => frame.next()}>
            <p>다음</p>
          </button>
        </footer>
      </main>
    </>
  );
};

export default FrameProfile;
