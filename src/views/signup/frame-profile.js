import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import RefreshIcon from "../../asset/icons/mui/refresh-icon";
import ArrowDropDownIcon from "../../asset/icons/mui/arrow-drop-down-icon";


// frame 2
const FrameProfile = ({
  framer,
  changeProfile,
  changeNut,
  changeTag,
  getProfile,
  getNut,
  getTag,
  getRandomProfile,
  getRandomNutList,
}) => {
  const [randomProfiles, setRandomProfiles] = useState([null, null, null].map(() => getRandomProfile()));
  let _onChangeProfile = () => {
    let _randomProfiles = [...randomProfiles];
    _randomProfiles.shift();
    _randomProfiles.push(getRandomProfile());
    setRandomProfiles(_randomProfiles);
    changeProfile({
      emoji: _randomProfiles[0][0],
      color: _randomProfiles[0][1]
    });
  };
  const [randomNutList, setRandomNutList] = useState([]);
  const getFirstNutId = (list) => {
    return list[0]?.id;
  };
  useEffect(() => {
    const nutList = getRandomNutList();
    setRandomNutList(nutList);
    changeProfile({
      emoji: randomProfiles[0][0],
      color: randomProfiles[0][1]
    });
    changeNut(getFirstNutId(nutList));
  }, []);

  return (
    <div className="frame-profile">
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => framer.prev()}>
          <ArrowBackIcon />
        </button>
        <h3 className="title">프로필 생성</h3>
      </nav>
      
      <main className="content">
        <div className="menu-thumb">
          <div className="thumb candidate" style={{ backgroundColor: randomProfiles[2][1] }}>{randomProfiles[2][0]}</div>
          <div className="thumb candidate" style={{ backgroundColor: randomProfiles[1][1] }}>{randomProfiles[1][0]}</div>
          <div className="thumb-wrap">
            <div className="thumb" style={{ backgroundColor: randomProfiles[0][1] }}>{randomProfiles[0][0]}</div>
            <button className="refresh-icon" onClick={_onChangeProfile}>
              <RefreshIcon />
            </button>
          </div>
          
          <h5 className="description">이모지</h5>
        </div>
        <div className="menu-name">
          <div className="name">
            <div className="name-first">
              <input className="field" placeholder="좋아하는 음식" autoFocus onChange={(event) => changeTag(event.target.value)} />
            </div>
            <div className="name-last">
              <select className="field" defaultValue={getFirstNutId(randomNutList)} onChange={(event) => changeNut(event.target.value)}>
                {randomNutList.map((val) => <option key={val.id} value={val.id}>{val.name}</option>)}
              </select>
              <div className="decoration">
                <ArrowDropDownIcon />
              </div>
            </div>
          </div>
          <h5 className="description">닉네임</h5>
        </div>
      </main>

      <footer className="footer">
        <p className="help">한번 정한 프로필은 나중에 바꿀 수 없습니다.</p>
        <button className="button-next" onClick={() => framer.next()}>다음</button>
      </footer>
    </div>
  );
};

export default FrameProfile;
