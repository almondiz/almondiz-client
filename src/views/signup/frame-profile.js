import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRandomProfile, getRandomNutList } from "../../util";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import RefreshIcon from "../../asset/icons/mui/refresh-icon";
import ArrowDropDownIcon from "../../asset/icons/mui/arrow-drop-down-icon";


// frame 2
const FrameProfile = ({
  framer,
  onChangeProfile,
  onChangeNut,
  onChangeTag,
  getProfile,
  getNut,
  getTag,
}) => {
  const navigate = useNavigate();

  const [randomProfiles, setRandomProfiles] = useState([null, null, null].map(() => getRandomProfile()));
  let _onChangeProfile = () => {
    let _randomProfiles = [...randomProfiles];
    _randomProfiles.shift();
    _randomProfiles.push(getRandomProfile());
    setRandomProfiles(_randomProfiles);
  };
  const [randomNutList, ] = useState(getRandomNutList());

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
              <input className="field" placeholder="좋아하는 음식" autoFocus onChange={onChangeTag} />
            </div>
            <div className="name-last">
              <select className="field" defaultValue="default" onChange={onChangeNut}>
                {/*<option value="default" disabled>견과류</option>*/}
                {randomNutList.map((val, idx) => <option key={idx} value={idx}>{val}</option>)}
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