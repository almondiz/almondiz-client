import React, { useState, useEffect } from "react";

import { Frame, Motion } from "../../../util";
import { SearchViewModel } from "../../../view-models";

import "./style.scoped.scss";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import ArrowBackIosIcon from "../../../asset/icons/mui/arrow-back-ios-icon";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import RefreshIcon from "../../../asset/icons/mui/refresh-icon";


const MenuThumb = ({ getRandomThumb, setProfileThumb }) => {
  const [thumbs, setThumbs] = useState([null, null, null, null, null].map(() => getRandomThumb()));
  const onChangeThumb = () => (motion.is("stop") && motion.go("move"));
  const _onChangeThumbEnd = () => {
    let _thumbs = [...thumbs];
    _thumbs.shift();
    _thumbs.push(getRandomThumb());
    setThumbs(_thumbs);
  };
  useEffect(() => { setProfileThumb(thumbs[0]); }, [thumbs]);

  // motion
  const MOTION_DELAY = 300;
  const motion = new Motion({
    "stop": () => {},
    "move": () => {
      motion.delay(MOTION_DELAY, "stop");
      return _onChangeThumbEnd;
    },
  }, "stop");

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
const MenuName = ({ getRandomNut, setProfileTag, setProfileNut }) => {
  // tag
  const [tag, setTag] = useState();
  const onClickTagItem = _tag => {
    const { tagName } = _tag;
    handleTf(0, tagName);
    setTf(tagName);
    setTag(_tag);
  };
  useEffect(() => { setProfileTag(tag); }, [tag]);

  // nut
  const [nut, setNut] = useState(getRandomNut());
  const onChangeNut = () => (motion.is("stop") && motion.go("move-in"));
  const onChangeNutStart = () => {
    let _nut;
    while (true) {
      _nut = getRandomNut();
      if (_nut.nutId === nut.nutId)
        continue;
      break;
    }
    setNut(_nut);
  };
  useEffect(() => { setProfileNut(nut); }, [nut]);

  // textfield
  const TF_PLACEHOLDER = "좋아하는 음식";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move((tfFrame.index === 1 && tf) ? 1 : 0);
    searchTag(tf);
  }, [tf]);
  const handleTf = (tfFrameIndex, text="") => {
    tfFrame.move(tfFrameIndex);
    setTf(text);
  };

  /** 7. TAG API */
  const [ searchResult, setSearchResult ] = useState([]);
  const searchViewModel = new SearchViewModel();
  const searchTag = async (tagName) => {
    const _tags = await searchViewModel.searchTag(tagName);
    if (_tags) {
      setSearchResult(_tags);
    }
  };

  // motion
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

  const tagFrame = new Frame([
    (
      <></>
    ),
    (
      <div className="tag-list-group">
        <ul className="list">
          {searchResult.map((tag, idx) => (
            <li key={idx} className="item" data-tag-type={tag.tagType} data-tag-id={tag.tagId} onClick={() => onClickTagItem(tag)}>
              {tag.tagName}
            </li>
          ))}
        </ul>
      </div>
    ),
  ]);
  const tfFrame = new Frame([
    (
      <section className="tf-frame tf-frame-1" >
        <div className="tf">
          <input className="name-first tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} readOnly onClick={() => handleTf(1)}/>
          <div className={`name-last ${motion.get()}`} onClick={onChangeNut}>
            <p className="field">{nut.nutName}</p>
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
          <button className="tf-icon" onClick={() => handleTf(0)}><ArrowBackIosIcon /></button>
          <input className="name-first tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
          <button className={`tf-clear-button ${tf ? "" : "hide"}`} onClick={() => setTf("")}><CancelIconFill /></button>
        </div>
        {tagFrame.view()}
      </section>
    ),
  ]);

  return <aside className="menu-name">{tfFrame.view()}</aside>;
};


// frame 2
const FrameProfile = ({
  frame,
  getRandomThumb, getRandomNut,
  profileThumb, profileTag, profileNut,
  setProfileThumb, setProfileTag, setProfileNut,
}) => {
  const onNextClick = () => {
    if (profileThumb && profileTag && profileNut)
      frame.next();
    else
      console.error("[FrameProfile]", "빈 필드가 존재합니다.");
  };

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
          <MenuThumb getRandomThumb={getRandomThumb} setProfileThumb={setProfileThumb} />
          <h5 className="description">이모지</h5>
        </div>
        <div className="menu-name-group">
          <MenuName getRandomNut={getRandomNut} setProfileTag={setProfileTag} setProfileNut={setProfileNut} />
          <h5 className="description">닉네임</h5>
        </div>
      </main>
      <footer className="footer">
        <p className="help">한번 결정한 프로필은 다시 바꿀 수 없습니다.</p>
        <button className="button button-next" onClick={onNextClick}>
          <p>다음</p>
        </button>
      </footer>
    </>
  );
};

export default FrameProfile;
