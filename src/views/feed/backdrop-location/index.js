import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

import { SearchViewModel } from "../../../view-models";

import { StaticComponentRefs, Frame } from "../../../util";
import { showModalFormConfirm } from "../../../components/modal";
import Slider from "../../../components/slider";
import NaverMap from "../../../components/naver-map";

import "./style.scoped.scss";
import ExpandMoreIcon from "../../../asset/icons/mui/expand-more-icon";
import SearchIconBorder from "../../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../../asset/icons/mui/cancel-icon-fill";
import LocationSearchingIcon from "../../../asset/icons/mui/location-searching-icon";
import MyLocationIconFill from "../../../asset/icons/mui/my-location-icon-fill";
import ArrowBackIosIcon from "../../../asset/icons/mui/arrow-back-ios-icon";
import LocationOnIconBorder from "../../../asset/icons/mui/location-on-icon-border";


const MapDrawer = forwardRef(({ mapBottomRef, updateLocation, searchPlace }, ref) => {
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
  useImperativeHandle(ref, () => ({ unfocus: () => (tfFrame.move(0), setTf("")) }));

  const BottomSearchContent = ({ place }) => {
    const { lati, longi, placeAddress: address } = place;
    const location = { lati, longi, address };
    return (
      <section className="bottom-item color-light">
        <div className="text-wrap">
          <h3 className="title">{address}</h3>
          <p className="description">{place.placeName}</p>
        </div>
        <button className="button button-select-location" onClick={() => updateLocation(location, false)}>
          <div className="icon"><LocationOnIconBorder /></div>
          <p>설정</p>
        </button>
      </section>
    )
  };
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
      <div className="place-list-group">
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
});


const MapBottom = forwardRef(({ mapDrawerRef,
  tracking, location, updateLocation, getMyLocation
}, ref) => {
  const BottomDefaultUntrackContent = ({ location }) => {
    const { lati, longi, address } = location;
    return (
      <section className="bottom-item color-light">
        <div className="text-wrap">
          <h3 className="title"><b>{address}</b></h3>
          <p className="description">설정한 위치</p>
        </div>
        <LocationSearchingIcon />
      </section>
    );
  };
  const BottomDefaultTrackContent = ({ location }) => {
    const { lati, longi, address } = location;
    return (
      <section className="bottom-item color-dark">
        <div className="text-wrap">
          <h3 className="title"><b>{address}</b></h3>
          <p className="description">내 위치</p>
        </div>
        <MyLocationIconFill />
      </section>
    );
  };
  const BottomMyContent = ({ location }) => {
    const { lati, longi, address } = location;
    return (
      <section className="bottom-item color-dark">
        <div className="text-wrap">
          <h3 className="title"><b>{address}</b></h3>
          <p className="description">내 위치</p>
        </div>
        <div className="buttons right">
          <button className="button button-select-location" onClick={() => updateLocation(location, true)}>
            <div className="icon"><LocationOnIconBorder /></div>
            <p>설정</p>
          </button>
        </div>
      </section>
    );
  };


  const [content, setContent] = useState(null);
  const [isMyLocation, setIsMyLocation] = useState(null);   // 현 위치 버튼이 켜져 있는지 여부

  // 장소 정보 영역
  const unfocus = async () => {
    if (tracking) {
      const myLocation = await getMyLocation();
      setContent(<BottomDefaultTrackContent location={myLocation} />);
    } else {
      setContent(<BottomDefaultUntrackContent location={location} />);
    }
    mapDrawerRef.current?.unfocus();
  };
  const focusMyLocation = async () => {
    const myLocation = await getMyLocation();
    setContent(<BottomMyContent location={myLocation} />);
    mapDrawerRef.current?.unfocus();
  };
  const show = content => {
    if (content) {    // 텍스트 상자에 의한 장소 검색 시
      setContent(content);
      setIsMyLocation(false);
    } else {
      unfocus();
      setIsMyLocation(tracking);
    }
  };
  useImperativeHandle(ref, () => ({ show }));
  useEffect(() => { show(); }, [tracking, location]);

  // 현 위치 버튼
  const onMyLocation = async () => {    // 현 위치 버튼 설정
    if (tracking) {
      await unfocus();
      setIsMyLocation(true);
      
    } else {
      await focusMyLocation();
      setIsMyLocation(true);
    }
  };
  const offMyLocation = async () => {   // 현 위치 버튼 해제
    if (tracking) {    // 위치 추적 설정 상태였다면
      const myLocation = await getMyLocation();
      updateLocation(myLocation, false);
      setIsMyLocation(true);
    } else {
      unfocus();
      setIsMyLocation(false);
    }
  };

  return (
    <footer className="map-bottom">
      {
        isMyLocation ?
        (
          <button className="button button-set-my-location set color-dark" onClick={offMyLocation}>
            <div className="icon"><MyLocationIconFill /></div>
          </button>
        ) :
        (
          <button className="button button-set-my-location color-light" onClick={onMyLocation}>
            <div className="icon"><LocationSearchingIcon /></div>
          </button>
        )
      }
      <div className="bottom-item-container">{content}</div>
    </footer>
  );
});


const BackdropLocation = forwardRef(({ backdropRef }, ref) => {
  const hideBackdrop = () => backdropRef?.current?.hide();
  const destruct = () => ({ dirty });
  useImperativeHandle(ref, () => ({ destruct }));

  
  const [ dirty, setDirty ] = useState(false);    // check if feed page should be refreshed due to location information modified

  const [ loaded, setLoaded ] = useState(false);
  const [ tracking, setTracking ] = useState(null);     // 위치 추적 상태 여부
  const [ location, setLocation ] = useState(null);
  const [ distance, setDistance ] = useState(null);

  /** 0. SEARCH API */
  const searchViewModel = new SearchViewModel();
  const searchPlace = async (keyword) => (await searchViewModel.searchPlace(keyword));
  const getMyLocation = async () => (await searchViewModel.getMyLocation());
  const initLocationSet = async () => {
    const data = await searchViewModel.getPreferedLocationSet();
    const { tracking, location, distance } = data;
    setTracking(tracking);
    setLocation(location), setDistance(distance);
    setNewDistance(distance);
    setLoaded(true);
  };
  useEffect(() => { initLocationSet(); }, []);

  // location
  const updateLocation = async (_location, isMyLocation) => {
    if (tracking) {
      if (!isMyLocation) {
        askUntrackMyLocation(_location);
      }
    } else {
      if (isMyLocation) {
        askTrackMyLocation(_location);
      } else {
        updateLocationComplete(_location, false); 
      }
    }
  };
  const updateLocationComplete = async (_location, _tracking) => {
    const success = await searchViewModel.setPreferedLocationSet({ location: _location, distance, tracking: _tracking });
    if (success) {
      setDirty(true);
      setTracking(_tracking), setLocation(_location);
    }
  };

  const { modalRef } = StaticComponentRefs;
  const modalFormConfirmRef = useRef();
  const askTrackMyLocation = data => {
    showModalFormConfirm(modalRef, modalFormConfirmRef, {
      title: "계속 내 위치로 설정해 둘까요?",
      callback: async (choice) => updateLocationComplete(data, choice),
    });
  };
  const askUntrackMyLocation = data => {
    showModalFormConfirm(modalRef, modalFormConfirmRef, {
      title: "위치 추적을 해제하시겠어요?",
      callback: async (choice) => (choice && updateLocationComplete(data, false)),
    });
  };

  // distance
  const updateDistance = async (_distance) => {
    const success = await searchViewModel.setPreferedLocationSet({ location, distance: _distance, tracking });
    if (success) {
      setDirty(true);
      setDistance(_distance);
    }
  };
  const [ newDistance, setNewDistance ] = useState(null);
  /** */

  const mapDrawerRef = useRef();
  const mapBottomRef = useRef();

  const ButtonUpdateDistance = ({ newDistance, distance }) => {
    const [ disabled, setDisabled ] = useState(true);
    useEffect(() => { setDisabled(newDistance == distance); }, [newDistance, distance]);
    const onClick = () => (!disabled && updateDistance(newDistance));

    return <button className="button button-update-distance" disabled={disabled} onClick={onClick}>적용</button>
  };
  return loaded && (
    <>
      <header className="backdrop-header" onClick={hideBackdrop}>
        <h3 className="title">위치 설정</h3>
        <div className="button button-close">
          <div className="icon"><ExpandMoreIcon /></div>
        </div>
      </header>
      <main className="backdrop-body">
        <MapDrawer ref={mapDrawerRef} mapBottomRef={mapBottomRef} updateLocation={updateLocation} searchPlace={searchPlace} />
        <div className="map-container">
          <NaverMap />
          <MapBottom ref={mapBottomRef} mapDrawerRef={mapDrawerRef} tracking={tracking} location={location} updateLocation={updateLocation} getMyLocation={getMyLocation} />
        </div>

        <div className="area-range">
          <div className="row">
            <div className="text-wrap">
              <h3 className="title">위치로부터 <u>{newDistance}km</u> 이내</h3>
              <p className="description">선택한 범위의 글들을 피드에 표시합니다.</p>
            </div>
            <ButtonUpdateDistance newDistance={newDistance} distance={distance} />
          </div>
          
          <Slider value={newDistance} setValue={setNewDistance} min={5} max={30} step={5} ticks={[ 5, 10, 15, 20, 25, 30 ]} />
        </div>
      </main>
    </>
  );
});

export default BackdropLocation;