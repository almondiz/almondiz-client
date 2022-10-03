import React, { useEffect } from "react";

import "./style.scoped.scss";


const NaverMap = ({ id="map" }) => {
  useEffect(() => {
    const map = new naver.maps.Map(id, {
      center: new naver.maps.LatLng(37.2844252, 127.043568),
      zoom: 14,
    });
    const markers = [];

    const setMarker = (title, lat, lng) => {
      return new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map,
        title: title,
        icon: {
          content: `
<div class="marker">
  <span class="point">${Math.floor(Math.random() * 200)}</span>
  <span class="name">${title}</span>
</div>
`
        }
      });
    };
    markers.push(setMarker("이의동", 37.297806, 127.048455));
    markers.push(setMarker("우만동", 37.284776, 127.032053));
    markers.push(setMarker("원천동", 37.270674, 127.055251));
    markers.push(setMarker("매탄동", 37.266125, 127.047474));
    markers.push(setMarker("인계동", 37.269442, 127.025008));
    markers.push(setMarker("지동", 37.280543, 127.024628));
    markers.push(setMarker("연무동", 37.294092, 127.0270216));
    markers.push(setMarker("하동", 37.292083, 127.07));

    markers.push(new naver.maps.Marker({
        position: new naver.maps.LatLng(37.2844252, 127.043568),
        map: map,
        title: "내 위치",
        icon: {
            content: `<div class="my_marker"></div>`,
        }
    }));
  }, []);

  const mapStyle = { width: "100%", height: "100%" };
  
  return (
    <div id={id} className="map" style={mapStyle} />
  );
};

export default NaverMap;