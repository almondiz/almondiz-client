import store from "../../store";


export const filterText = text => {
    if (typeof text !== "string")
      throw new Error(`value is not string : ${text}`);
    text = text.trim();
    return text;
  };
  

  export const getMyLocation = () => {  // 내 GPS 위치
    const { location } = store.getState().global;
    return location;
  };
  
  export const getDistance = (location_1, location_2) => {  // generally used geo measurement function
    let R = 6378.137; // radius of earth in KM
    let dLati = (location_2.lati - location_1.lati) * Math.PI / 180;
    let dLongi = (location_2.longi - location_1.longi) * Math.PI / 180;
    let a = Math.sin(dLati / 2) * Math.sin(dLati / 2) +
      Math.cos(location_1.lati * Math.PI / 180) * Math.cos(location_2.lati * Math.PI / 180) * Math.sin(dLongi / 2) * Math.sin(dLongi / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return Math.round(d); // KM
  };

  export const getTime = epoch => {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
  
    const now = new Date();
  
    const dt = Math.floor(now.valueOf() - epoch);
    if (dt < MINUTE)
      return `방금`;
    else if (dt < HOUR)   // 1 ~ 59 mins
      return `${Math.floor(dt / MINUTE)}분 전`;
    else if (dt < DAY)    // 1 ~ 23 hours
      return `${Math.floor(dt / HOUR)}시간 전`;
    else if (dt < WEEK)   // 1 ~ 7 days
      return `${Math.floor(dt / DAY)}일 전`;
  
    const date = new Date(epoch);
    return (date.getFullYear() !== now.getFullYear() ? `${date.getFullYear()}년 ` : ``) + `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };
  export const getFullTime = epoch => {
    const date = new Date(epoch);
    return `${date.getFullYear()}년 + ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };