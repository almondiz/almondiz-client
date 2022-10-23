import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

import { Frame } from "../../util";
import { SearchViewModel } from "../../view-models";

import Slider from "../../components/slider";
import NaverMap from "../../components/naver-map";

import "./style.scoped.scss";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";
import MyLocationIconFill from "../../asset/icons/mui/my-location-icon-fill";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import LocationOnIconBorder from "../../asset/icons/mui/location-on-icon-border";


const MapDrawer = forwardRef(({ mapBottomRef, setPreferedLocation, searchPlace }, ref) => {
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
        mapBottomRef.current?.show({});
        break;
      case 2:
        setTf(place.placeName);
        mapBottomRef.current?.show({ content: <BottomContent place={place} /> });
        break;
    }
  };
  useImperativeHandle(ref, () => ({ unfocus: () => (tfFrame.move(0), setTf("")) }));

  const BottomContent = ({ place }) => {
    const { lati, longi, placeAddress: address } = place;
    const location = { lati, longi, address };
    return (
      <section className="bottom-item">
        <div className="text-wrap">
          <h3 className="title">{address}</h3>
          <p className="description">{place.placeName}</p>
        </div>
        <button className="button button-select-location" onClick={() => setPreferedLocation({ location })}>
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
      <div className="location-list-group">
        <ul className="list">{searchResult.map((place, idx) => <PlaceSearchItem key={idx} place={place} />)}</ul>
      </div>
    ),
  ]);
  const tfFrame = new Frame([
    (
      <section className="tf-frame tf-frame-1">
        <div className="tf light" onClick={() => moveTf(1)}>
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
        <div className="tf light">
          <button className="tf-icon" onClick={() => moveTf(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} readOnly onClick={() => moveTf(1)} />
        </div>
      </section>
    ),
  ]);

  return <aside className="map-drawer">{tfFrame.view()}</aside>;
});


const MapBottom = forwardRef(({ mapDrawerRef, preferedLocation={}, setPreferedLocation, getMyLocation }, ref) => {
  const BottomInitContent = ({ location }) => {
    const { lati, longi, address } = location;
    return (
      <section className="bottom-item">
        <div className="text-wrap">
          <h3 className="title"><b>{address}</b></h3>
          <p className="description">기존에 설정된 위치</p>
        </div>
        <LocationSearchingIcon />
      </section>
    );
  };
  const BottomMyContent = ({ location }) => {
    const { lati, longi, address } = location;
    return (
      <section className="bottom-item dark">
        <div className="text-wrap">
          <h3 className="title"><b>{address}</b></h3>
          <p className="description">내 위치</p>
        </div>
        <div className="buttons right">
          <button className="button button-select-location" onClick={() => setPreferedLocation({ location }, true)}>
            <div className="icon"><LocationOnIconBorder /></div>
            <p>설정</p>
          </button>
        </div>
      </section>
    )
  };
  const bottomInitContent = <BottomInitContent location={preferedLocation} />;

  const [content, setContent] = useState(<></>);
  const show = ({ content=bottomInitContent }) => {
    setContent(content);
    setIsMyLocation(false);
  };
  useEffect(() => { show({}); }, [preferedLocation]);
  useImperativeHandle(ref, () => ({ show }));

  const [isMyLocation, setIsMyLocation] = useState(false);
  const toggleMyLocation = () => setIsMyLocation(!isMyLocation);

  const [myContent, setMyContent] = useState(<></>);
  const showMyLocation = async () => {
    const myLocation = await getMyLocation();
    setMyContent(<BottomMyContent location={myLocation} />);
    mapDrawerRef.current?.unfocus();
  };
  useEffect(() => { isMyLocation && showMyLocation(); }, [isMyLocation]);

  return (
    <footer className={`map-bottom ${isMyLocation ? "dark" : "light"}`}>
      <button className={`button button-set-my-location ${isMyLocation ? "set" : ""}`} onClick={toggleMyLocation}>
        <div className="icon">{isMyLocation ? <MyLocationIconFill /> : <LocationSearchingIcon />}</div>
      </button>
      <div className="bottom-item-container">{isMyLocation ? myContent : content}</div>
    </footer>
  );
});


const BackdropLocation = () => {
  const mapDrawerRef = useRef();
  const mapBottomRef = useRef();

  const [ preferedLocation, _setPreferedLocation ] = useState({});
  const [ preferedDistance, _setPreferedDistance ] = useState(0);

  /** 0. SEARCH API */
  const searchViewModel = new SearchViewModel();
  const searchPlace = async (keyword) => (await searchViewModel.searchPlace(keyword));
  const getMyLocation = async () => (await searchViewModel.getMyLocation());
  const getPreferedLocation = async () => {
    const data = await searchViewModel.getPreferedLocation();
    const { location, distance } = data;
    _setPreferedLocation(location);
    _setPreferedDistance(distance);
  };
  useEffect(() => { getPreferedLocation(); }, []);
  const setPreferedLocation = async (data, isMyLocation=false) => {
    let { location, distance } = data;
    if (!location)  location = preferedLocation;
    if (!distance)  distance = preferedDistance;
    const success = await searchViewModel.setPreferedLocation({ location, distance });
    if (success) {
      _setPreferedLocation(location);
      _setPreferedDistance(distance);
      mapDrawerRef.current?.unfocus();
    }
  };
  /** */


  const [ distance, setDistance ] = useState(0);
  useEffect(() => { setDistance(preferedDistance); }, [preferedDistance]);

  return (
    <>
      <MapDrawer ref={mapDrawerRef} mapBottomRef={mapBottomRef} setPreferedLocation={setPreferedLocation} searchPlace={searchPlace} />
      <div className="map-container">
        <NaverMap />
        <MapBottom ref={mapBottomRef} mapDrawerRef={mapDrawerRef} preferedLocation={preferedLocation} setPreferedLocation={setPreferedLocation} getMyLocation={getMyLocation} />
      </div>

      <div className="area-range">
        <div className="row">
          <div className="text-wrap">
            <h3 className="title">위치로부터 <u>{distance}km</u> 이내</h3>
            <p className="description">선택한 범위의 리뷰를 피드에 표시합니다.</p>
          </div>
          <button className="text-button" onClick={() => setPreferedLocation({ distance })}>적용</button>
        </div>
        
        <Slider value={distance} setValue={setDistance} min={5} max={30} step={5} ticks={[ 5, 10, 15, 20, 25, 30 ]} />
      </div>
    </>
  );
};

export default BackdropLocation;