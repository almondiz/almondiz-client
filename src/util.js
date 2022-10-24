import React, { useState, useEffect, useRef } from "react";

import store from "./store";


/** hooks */

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => { savedCallback.current = callback; }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay !== null) {
      let timer = setInterval(tick, delay);
      return () => clearInterval(timer);
    }
  }, [delay]);
};
export const useTimeout = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => { savedCallback.current = callback; }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay !== null) {
      let timer = setTimeout(tick, delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);
};


export const useWindowDimensions = () => {
  const bodyDOM = document.body;
  const getDimensions = () => {
    const { scrollHeight: height, scrollWidth: width } = bodyDOM;
    return { height, width };
  };

  const [dimensions, setDimensions] = useState({});
  const poll = () => {
    const _dimensions = getDimensions();
    let dirty = false;
    for (let k in _dimensions) {
      if (_dimensions[k] !== dimensions[k]) {
        dirty = true;
        break;
      }
    }
    if (dirty)  setDimensions(_dimensions);
  };

  const INTERVAL = 300;
  useInterval(poll, INTERVAL);
  return dimensions;
};


/** components */

export const NoScroll = () => {
  useEffect(() => {
    const bodyDOM = document.body;
    bodyDOM.classList.add("noscroll");
    return () => bodyDOM.classList.remove("noscroll");
  }, []);

  return <></>;
};


/*
export const isFunctionComponent = component => ( typeof component === 'function' && String(component).includes("return React.createElement"));
export const isClassComponent = component => (typeof component === 'function' && !!component.prototype.isReactComponent);
*/
export const isElement = element => React.isValidElement(element);
export const isDOMTypeElement = element => (isElement(element) && typeof element.type === "string");

export const isEmptyElement = element => {
  if (element === null || element === undefined)
    return true;
  if (isElement(element) && element.type === React.Fragment)
    return true;
  return false;
};


/** controllers */

export class StaticComponentRefs {};

export class Pipe {
  static data = {};

  static set(key, val) {
    useEffect(() => {
      Pipe.data[key] = val;
      //console.log("[Pipe]", `key '${key}' added`);
      return () => {
        delete Pipe.data[key];
        //console.log("[Pipe]", `key '${key}' deleted`);
      };
    }, []);
  }

  static get(key) {
    return Pipe.data[key];
  }
};

export class Frame {
  index;
  setIndex;
  elements;

  constructor(...params) { this.init(...params); }
  init(elements=[], initialIndex=0) {
    const [index, setIndex] = useState(initialIndex);
    this.index = index, this.setIndex = setIndex;
    this.elements = elements;
  }

  view() { return this.elements[this.index]; }

  move(index) {
    index = Math.min(Math.max(index, 0), this.elements.length - 1);
    if (index === this.index)   return false;
    this.setIndex(index);
    return true;
  }

  walk(inc) { return this.move(this.index + inc); }
  next() { return this.walk(1); }
  prev() { return this.walk(-1); }
};

export class Motion {
  state;
  setState;
  handlers;
  _setTimer;

  constructor(...params) { this.init(...params); }
  init(handlers={}, initKey="init", initArgs=[]) {
    this.handlers = handlers;
    
    const [state, setState] = useState({
      key: initKey,
      handler: this._getHandler(initKey, initArgs),
    });
    this.state = state, this.setState = setState;

    useEffect(() => {
      const destroy = state.handler();
      return (typeof destroy === "function") ? destroy : () => {};
    }, [state]);


    const [_timer, _setTimer] = useState(-1);
    this._setTimer = _setTimer;
    useEffect(() => {
      return () => clearInterval(_timer);
    }, [_timer]);
  }
  
  go(key, args=[]) {
    this.delay(0, key, args);
  }
  delay(delay, key, args=[]) {
    const callback = () => this.setState({ key: key, handler: this._getHandler(key, args) });

    const _timer = setTimeout(callback, delay);
    this._setTimer(_timer);
  }
  
  get() { return this.state.key; }
  is(key) { return this.state.key === key; }
  isIn(...keys) {   // prefix array
    for (let i = 0; i < keys.length; i++) {
      if (this.state.key?.startsWith(keys[i]))
        return true;
    }
    return false;
  }

  _getHandler(key, args) {
    return (typeof this.handlers[key] === "function") ? () => this.handlers[key](...args) : () => {};
  }
};


/** functions */

export const filterText = text => {
  if (typeof text !== "string")
    throw new Error(`value is not string : ${text}`);
  text = text.trim();
  return text;
};

export const getMyLocation = () => {  // 내 GPS 위치
  return store.getState().global.location;
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
  
  return getFullTime(epoch);
};
export const getFullTime = epoch => {
  const date = new Date(epoch);
  return (date.getFullYear() !== now.getFullYear() ? `${date.getFullYear()}년 ` : ``) + `${date.getMonth() + 1}월 ${date.getDate()}일`;
};


/** profile */

const EMOJIS = ["\ud83d\ude00", "\ud83d\ude03", "\ud83d\ude04", "\ud83d\ude01", "\ud83d\ude06", "\ud83d\ude05", "\ud83e\udd23", "\ud83d\ude02", "\ud83d\ude42", "\ud83d\ude43", "\ud83e\udee0", "\ud83d\ude09", "\ud83d\ude0a", "\ud83d\ude07", "\ud83e\udd70", "\ud83d\ude0d", "\ud83e\udd29", "\ud83d\ude18", "\ud83d\ude17", "\u263a", "\ud83d\ude1a", "\ud83d\ude19", "\ud83e\udd72", "\ud83d\ude0b", "\ud83d\ude1b", "\ud83d\ude1c", "\ud83e\udd2a", "\ud83d\ude1d", "\ud83e\udd11", "\ud83e\udd17", "\ud83e\udd2d", "\ud83e\udee2", "\ud83e\udee3", "\ud83e\udd2b", "\ud83e\udd14", "\ud83e\udee1", "\ud83e\udd10", "\ud83e\udd28", "\ud83d\ude10", "\ud83d\ude11", "\ud83d\ude36", "\ud83e\udee5", "\ud83d\ude0f", "\ud83d\ude12", "\ud83d\ude44", "\ud83d\ude2c", "\ud83d\ude2e", "\ud83e\udd25", "\ud83e\udee8", "\ud83d\ude0c", "\ud83d\ude14", "\ud83d\ude2a", "\ud83e\udd24", "\ud83d\ude34", "\ud83d\ude37", "\ud83e\udd12", "\ud83e\udd15", "\ud83e\udd22", "\ud83e\udd2e", "\ud83e\udd27", "\ud83e\udd75", "\ud83e\udd76", "\ud83e\udd74", "\ud83d\ude35", "\ud83e\udd2f", "\ud83e\udd20", "\ud83e\udd73", "\ud83e\udd78", "\ud83d\ude0e", "\ud83e\udd13", "\ud83e\uddd0", "\ud83d\ude15", "\ud83e\udee4", "\ud83d\ude1f", "\ud83d\ude41", "\u2639", "\ud83d\ude2f", "\ud83d\ude32", "\ud83d\ude33", "\ud83e\udd7a", "\ud83e\udd79", "\ud83d\ude26", "\ud83d\ude27", "\ud83d\ude28", "\ud83d\ude30", "\ud83d\ude25", "\ud83d\ude22", "\ud83d\ude2d", "\ud83d\ude31", "\ud83d\ude16", "\ud83d\ude23", "\ud83d\ude1e", "\ud83d\ude13", "\ud83d\ude29", "\ud83d\ude2b", "\ud83e\udd71", "\ud83d\ude24", "\ud83d\ude21", "\ud83d\ude20", "\ud83e\udd2c", "\ud83d\ude08", "\ud83d\udc7f", "\ud83d\udc80", "\u2620", "\ud83d\udca9", "\ud83e\udd21", "\ud83d\udc79", "\ud83d\udc7a", "\ud83d\udc7b", "\ud83d\udc7d", "\ud83d\udc7e", "\ud83e\udd16", "\ud83d\ude3a", "\ud83d\ude38", "\ud83d\ude39", "\ud83d\ude3b", "\ud83d\ude3c", "\ud83d\ude3d", "\ud83d\ude40", "\ud83d\ude3f", "\ud83d\ude3e", "\ud83d\ude48", "\ud83d\ude49", "\ud83d\ude4a", "\ud83d\udc8c", "\ud83d\udc98", "\ud83d\udc9d", "\ud83d\udc96", "\ud83d\udc97", "\ud83d\udc93", "\ud83d\udc9e", "\ud83d\udc95", "\ud83d\udc9f", "\u2763", "\ud83d\udc94", "\u2764", "\ud83e\ude77", "\ud83e\udde1", "\ud83d\udc9b", "\ud83d\udc9a", "\ud83d\udc99", "\ud83e\ude75", "\ud83d\udc9c", "\ud83e\udd0e", "\ud83d\udda4", "\ud83e\ude76", "\ud83e\udd0d", "\ud83d\udc8b", "\ud83d\udcaf", "\ud83d\udca2", "\ud83d\udca5", "\ud83d\udcab", "\ud83d\udca6", "\ud83d\udca8", "\ud83d\udd73", "\ud83d\udcac", "\ud83d\udc41", "\ud83d\udde8", "\ud83d\uddef", "\ud83d\udcad", "\ud83d\udca4", "\ud83d\udc4b", "\ud83e\udd1a", "\ud83d\udd90", "\u270b", "\ud83d\udd96", "\ud83e\udef1", "\ud83e\udef2", "\ud83e\udef3", "\ud83e\udef4", "\ud83e\udef7", "\ud83e\udef8", "\ud83d\udc4c", "\ud83e\udd0c", "\ud83e\udd0f", "\u270c", "\ud83e\udd1e", "\ud83e\udef0", "\ud83e\udd1f", "\ud83e\udd18", "\ud83e\udd19", "\ud83d\udc48", "\ud83d\udc49", "\ud83d\udc46", "\ud83d\udd95", "\ud83d\udc47", "\u261d", "\ud83e\udef5", "\ud83d\udc4d", "\ud83d\udc4e", "\u270a", "\ud83d\udc4a", "\ud83e\udd1b", "\ud83e\udd1c", "\ud83d\udc4f", "\ud83d\ude4c", "\ud83e\udef6", "\ud83d\udc50", "\ud83e\udd32", "\ud83e\udd1d", "\ud83d\ude4f", "\u270d", "\ud83d\udc85", "\ud83e\udd33", "\ud83d\udcaa", "\ud83e\uddbe", "\ud83e\uddbf", "\ud83e\uddb5", "\ud83e\uddb6", "\ud83d\udc42", "\ud83e\uddbb", "\ud83d\udc43", "\ud83e\udde0", "\ud83e\udec0", "\ud83e\udec1", "\ud83e\uddb7", "\ud83e\uddb4", "\ud83d\udc40", "\ud83d\udc45", "\ud83d\udc44", "\ud83e\udee6", "\ud83d\udc76", "\ud83e\uddd2", "\ud83d\udc66", "\ud83d\udc67", "\ud83e\uddd1", "\ud83d\udc71", "\ud83d\udc68", "\ud83e\uddd4", "\ud83d\udc69", "\ud83e\uddd3", "\ud83d\udc74", "\ud83d\udc75", "\ud83d\ude4d", "\ud83d\ude4e", "\ud83d\ude45", "\ud83d\ude46", "\ud83d\udc81", "\ud83d\ude4b", "\ud83e\uddcf", "\ud83d\ude47", "\ud83e\udd26", "\ud83e\udd37", "\ud83d\udc6e", "\ud83d\udd75", "\ud83d\udc82", "\ud83e\udd77", "\ud83d\udc77", "\ud83e\udec5", "\ud83e\udd34", "\ud83d\udc78", "\ud83d\udc73", "\ud83d\udc72", "\ud83e\uddd5", "\ud83e\udd35", "\ud83d\udc70", "\ud83e\udd30", "\ud83e\udec3", "\ud83e\udec4", "\ud83e\udd31", "\ud83d\udc7c", "\ud83c\udf85", "\ud83e\udd36", "\ud83e\uddb8", "\ud83e\uddb9", "\ud83e\uddd9", "\ud83e\uddda", "\ud83e\udddb", "\ud83e\udddc", "\ud83e\udddd", "\ud83e\uddde", "\ud83e\udddf", "\ud83e\uddcc", "\ud83d\udc86", "\ud83d\udc87", "\ud83d\udeb6", "\ud83e\uddcd", "\ud83e\uddce", "\ud83c\udfc3", "\ud83d\udc83", "\ud83d\udd7a", "\ud83d\udd74", "\ud83d\udc6f", "\ud83e\uddd6", "\ud83e\uddd7", "\ud83e\udd3a", "\ud83c\udfc7", "\u26f7", "\ud83c\udfc2", "\ud83c\udfcc", "\ud83c\udfc4", "\ud83d\udea3", "\ud83c\udfca", "\u26f9", "\ud83c\udfcb", "\ud83d\udeb4", "\ud83d\udeb5", "\ud83e\udd38", "\ud83e\udd3c", "\ud83e\udd3d", "\ud83e\udd3e", "\ud83e\udd39", "\ud83e\uddd8", "\ud83d\udec0", "\ud83d\udecc", "\ud83d\udc6d", "\ud83d\udc6b", "\ud83d\udc6c", "\ud83d\udc8f", "\ud83d\udc91", "\ud83d\udc6a", "\ud83d\udde3", "\ud83d\udc64", "\ud83d\udc65", "\ud83e\udec2", "\ud83d\udc63", "\ud83d\udc35", "\ud83d\udc12", "\ud83e\udd8d", "\ud83e\udda7", "\ud83d\udc36", "\ud83d\udc15", "\ud83e\uddae", "\ud83d\udc29", "\ud83d\udc3a", "\ud83e\udd8a", "\ud83e\udd9d", "\ud83d\udc31", "\ud83d\udc08", "\ud83e\udd81", "\ud83d\udc2f", "\ud83d\udc05", "\ud83d\udc06", "\ud83d\udc34", "\ud83e\udece", "\ud83e\udecf", "\ud83d\udc0e", "\ud83e\udd84", "\ud83e\udd93", "\ud83e\udd8c", "\ud83e\uddac", "\ud83d\udc2e", "\ud83d\udc02", "\ud83d\udc03", "\ud83d\udc04", "\ud83d\udc37", "\ud83d\udc16", "\ud83d\udc17", "\ud83d\udc3d", "\ud83d\udc0f", "\ud83d\udc11", "\ud83d\udc10", "\ud83d\udc2a", "\ud83d\udc2b", "\ud83e\udd99", "\ud83e\udd92", "\ud83d\udc18", "\ud83e\udda3", "\ud83e\udd8f", "\ud83e\udd9b", "\ud83d\udc2d", "\ud83d\udc01", "\ud83d\udc00", "\ud83d\udc39", "\ud83d\udc30", "\ud83d\udc07", "\ud83d\udc3f", "\ud83e\uddab", "\ud83e\udd94", "\ud83e\udd87", "\ud83d\udc3b", "\ud83d\udc28", "\ud83d\udc3c", "\ud83e\udda5", "\ud83e\udda6", "\ud83e\udda8", "\ud83e\udd98", "\ud83e\udda1", "\ud83d\udc3e", "\ud83e\udd83", "\ud83d\udc14", "\ud83d\udc13", "\ud83d\udc23", "\ud83d\udc24", "\ud83d\udc25", "\ud83d\udc26", "\ud83d\udc27", "\ud83d\udd4a", "\ud83e\udd85", "\ud83e\udd86", "\ud83e\udda2", "\ud83e\udd89", "\ud83e\udda4", "\ud83e\udeb6", "\ud83e\udda9", "\ud83e\udd9a", "\ud83e\udd9c", "\ud83e\udebd", "\ud83e\udebf", "\ud83d\udc38", "\ud83d\udc0a", "\ud83d\udc22", "\ud83e\udd8e", "\ud83d\udc0d", "\ud83d\udc32", "\ud83d\udc09", "\ud83e\udd95", "\ud83e\udd96", "\ud83d\udc33", "\ud83d\udc0b", "\ud83d\udc2c", "\ud83e\uddad", "\ud83d\udc1f", "\ud83d\udc20", "\ud83d\udc21", "\ud83e\udd88", "\ud83d\udc19", "\ud83d\udc1a", "\ud83e\udeb8", "\ud83e\udebc", "\ud83d\udc0c", "\ud83e\udd8b", "\ud83d\udc1b", "\ud83d\udc1c", "\ud83d\udc1d", "\ud83e\udeb2", "\ud83d\udc1e", "\ud83e\udd97", "\ud83e\udeb3", "\ud83d\udd77", "\ud83d\udd78", "\ud83e\udd82", "\ud83e\udd9f", "\ud83e\udeb0", "\ud83e\udeb1", "\ud83e\udda0", "\ud83d\udc90", "\ud83c\udf38", "\ud83d\udcae", "\ud83e\udeb7", "\ud83c\udff5", "\ud83c\udf39", "\ud83e\udd40", "\ud83c\udf3a", "\ud83c\udf3b", "\ud83c\udf3c", "\ud83c\udf37", "\ud83e\udebb", "\ud83c\udf31", "\ud83e\udeb4", "\ud83c\udf32", "\ud83c\udf33", "\ud83c\udf34", "\ud83c\udf35", "\ud83c\udf3e", "\ud83c\udf3f", "\u2618", "\ud83c\udf40", "\ud83c\udf41", "\ud83c\udf42", "\ud83c\udf43", "\ud83e\udeb9", "\ud83e\udeba", "\ud83c\udf44", "\ud83c\udf47", "\ud83c\udf48", "\ud83c\udf49", "\ud83c\udf4a", "\ud83c\udf4b", "\ud83c\udf4c", "\ud83c\udf4d", "\ud83e\udd6d", "\ud83c\udf4e", "\ud83c\udf4f", "\ud83c\udf50", "\ud83c\udf51", "\ud83c\udf52", "\ud83c\udf53", "\ud83e\uded0", "\ud83e\udd5d", "\ud83c\udf45", "\ud83e\uded2", "\ud83e\udd65", "\ud83e\udd51", "\ud83c\udf46", "\ud83e\udd54", "\ud83e\udd55", "\ud83c\udf3d", "\ud83c\udf36", "\ud83e\uded1", "\ud83e\udd52", "\ud83e\udd6c", "\ud83e\udd66", "\ud83e\uddc4", "\ud83e\uddc5", "\ud83e\udd5c", "\ud83e\uded8", "\ud83c\udf30", "\ud83e\udeda", "\ud83e\udedb", "\ud83c\udf5e", "\ud83e\udd50", "\ud83e\udd56", "\ud83e\uded3", "\ud83e\udd68", "\ud83e\udd6f", "\ud83e\udd5e", "\ud83e\uddc7", "\ud83e\uddc0", "\ud83c\udf56", "\ud83c\udf57", "\ud83e\udd69", "\ud83e\udd53", "\ud83c\udf54", "\ud83c\udf5f", "\ud83c\udf55", "\ud83c\udf2d", "\ud83e\udd6a", "\ud83c\udf2e", "\ud83c\udf2f", "\ud83e\uded4", "\ud83e\udd59", "\ud83e\uddc6", "\ud83e\udd5a", "\ud83c\udf73", "\ud83e\udd58", "\ud83c\udf72", "\ud83e\uded5", "\ud83e\udd63", "\ud83e\udd57", "\ud83c\udf7f", "\ud83e\uddc8", "\ud83e\uddc2", "\ud83e\udd6b", "\ud83c\udf71", "\ud83c\udf58", "\ud83c\udf59", "\ud83c\udf5a", "\ud83c\udf5b", "\ud83c\udf5c", "\ud83c\udf5d", "\ud83c\udf60", "\ud83c\udf62", "\ud83c\udf63", "\ud83c\udf64", "\ud83c\udf65", "\ud83e\udd6e", "\ud83c\udf61", "\ud83e\udd5f", "\ud83e\udd60", "\ud83e\udd61", "\ud83e\udd80", "\ud83e\udd9e", "\ud83e\udd90", "\ud83e\udd91", "\ud83e\uddaa", "\ud83c\udf66", "\ud83c\udf67", "\ud83c\udf68", "\ud83c\udf69", "\ud83c\udf6a", "\ud83c\udf82", "\ud83c\udf70", "\ud83e\uddc1", "\ud83e\udd67", "\ud83c\udf6b", "\ud83c\udf6c", "\ud83c\udf6d", "\ud83c\udf6e", "\ud83c\udf6f", "\ud83c\udf7c", "\ud83e\udd5b", "\u2615", "\ud83e\uded6", "\ud83c\udf75", "\ud83c\udf76", "\ud83c\udf7e", "\ud83c\udf77", "\ud83c\udf78", "\ud83c\udf79", "\ud83c\udf7a", "\ud83c\udf7b", "\ud83e\udd42", "\ud83e\udd43", "\ud83e\uded7", "\ud83e\udd64", "\ud83e\uddcb", "\ud83e\uddc3", "\ud83e\uddc9", "\ud83e\uddca", "\ud83e\udd62", "\ud83c\udf7d", "\ud83c\udf74", "\ud83e\udd44", "\ud83d\udd2a", "\ud83e\uded9", "\ud83c\udffa", "\ud83c\udf0d", "\ud83c\udf0e", "\ud83c\udf0f", "\ud83c\udf10", "\ud83d\uddfa", "\ud83d\uddfe", "\ud83e\udded", "\ud83c\udfd4", "\u26f0", "\ud83c\udf0b", "\ud83d\uddfb", "\ud83c\udfd5", "\ud83c\udfd6", "\ud83c\udfdc", "\ud83c\udfdd", "\ud83c\udfde", "\ud83c\udfdf", "\ud83c\udfdb", "\ud83c\udfd7", "\ud83e\uddf1", "\ud83e\udea8", "\ud83e\udeb5", "\ud83d\uded6", "\ud83c\udfd8", "\ud83c\udfda", "\ud83c\udfe0", "\ud83c\udfe1", "\ud83c\udfe2", "\ud83c\udfe3", "\ud83c\udfe4", "\ud83c\udfe5", "\ud83c\udfe6", "\ud83c\udfe8", "\ud83c\udfe9", "\ud83c\udfea", "\ud83c\udfeb", "\ud83c\udfec", "\ud83c\udfed", "\ud83c\udfef", "\ud83c\udff0", "\ud83d\udc92", "\ud83d\uddfc", "\ud83d\uddfd", "\u26ea", "\ud83d\udd4c", "\ud83d\uded5", "\ud83d\udd4d", "\u26e9", "\ud83d\udd4b", "\u26f2", "\u26fa", "\ud83c\udf01", "\ud83c\udf03", "\ud83c\udfd9", "\ud83c\udf04", "\ud83c\udf05", "\ud83c\udf06", "\ud83c\udf07", "\ud83c\udf09", "\u2668", "\ud83c\udfa0", "\ud83d\udedd", "\ud83c\udfa1", "\ud83c\udfa2", "\ud83d\udc88", "\ud83c\udfaa", "\ud83d\ude82", "\ud83d\ude83", "\ud83d\ude84", "\ud83d\ude85", "\ud83d\ude86", "\ud83d\ude87", "\ud83d\ude88", "\ud83d\ude89", "\ud83d\ude8a", "\ud83d\ude9d", "\ud83d\ude9e", "\ud83d\ude8b", "\ud83d\ude8c", "\ud83d\ude8d", "\ud83d\ude8e", "\ud83d\ude90", "\ud83d\ude91", "\ud83d\ude92", "\ud83d\ude93", "\ud83d\ude94", "\ud83d\ude95", "\ud83d\ude96", "\ud83d\ude97", "\ud83d\ude98", "\ud83d\ude99", "\ud83d\udefb", "\ud83d\ude9a", "\ud83d\ude9b", "\ud83d\ude9c", "\ud83c\udfce", "\ud83c\udfcd", "\ud83d\udef5", "\ud83e\uddbd", "\ud83e\uddbc", "\ud83d\udefa", "\ud83d\udeb2", "\ud83d\udef4", "\ud83d\udef9", "\ud83d\udefc", "\ud83d\ude8f", "\ud83d\udee3", "\ud83d\udee4", "\ud83d\udee2", "\u26fd", "\ud83d\udede", "\ud83d\udea8", "\ud83d\udea5", "\ud83d\udea6", "\ud83d\uded1", "\ud83d\udea7", "\u2693", "\ud83d\udedf", "\u26f5", "\ud83d\udef6", "\ud83d\udea4", "\ud83d\udef3", "\u26f4", "\ud83d\udee5", "\ud83d\udea2", "\u2708", "\ud83d\udee9", "\ud83d\udeeb", "\ud83d\udeec", "\ud83e\ude82", "\ud83d\udcba", "\ud83d\ude81", "\ud83d\ude9f", "\ud83d\udea0", "\ud83d\udea1", "\ud83d\udef0", "\ud83d\ude80", "\ud83d\udef8", "\ud83d\udece", "\ud83e\uddf3", "\u231b", "\u23f3", "\u231a", "\u23f0", "\u23f1", "\u23f2", "\ud83d\udd70", "\ud83d\udd5b", "\ud83d\udd67", "\ud83d\udd50", "\ud83d\udd5c", "\ud83d\udd51", "\ud83d\udd5d", "\ud83d\udd52", "\ud83d\udd5e", "\ud83d\udd53", "\ud83d\udd5f", "\ud83d\udd54", "\ud83d\udd60", "\ud83d\udd55", "\ud83d\udd61", "\ud83d\udd56", "\ud83d\udd62", "\ud83d\udd57", "\ud83d\udd63", "\ud83d\udd58", "\ud83d\udd64", "\ud83d\udd59", "\ud83d\udd65", "\ud83d\udd5a", "\ud83d\udd66", "\ud83c\udf11", "\ud83c\udf12", "\ud83c\udf13", "\ud83c\udf14", "\ud83c\udf15", "\ud83c\udf16", "\ud83c\udf17", "\ud83c\udf18", "\ud83c\udf19", "\ud83c\udf1a", "\ud83c\udf1b", "\ud83c\udf1c", "\ud83c\udf21", "\u2600", "\ud83c\udf1d", "\ud83c\udf1e", "\ud83e\ude90", "\u2b50", "\ud83c\udf1f", "\ud83c\udf20", "\ud83c\udf0c", "\u2601", "\u26c5", "\u26c8", "\ud83c\udf24", "\ud83c\udf25", "\ud83c\udf26", "\ud83c\udf27", "\ud83c\udf28", "\ud83c\udf29", "\ud83c\udf2a", "\ud83c\udf2b", "\ud83c\udf2c", "\ud83c\udf00", "\ud83c\udf08", "\ud83c\udf02", "\u2602", "\u2614", "\u26f1", "\u26a1", "\u2744", "\u2603", "\u26c4", "\u2604", "\ud83d\udd25", "\ud83d\udca7", "\ud83c\udf0a", "\ud83c\udf83", "\ud83c\udf84", "\ud83c\udf86", "\ud83c\udf87", "\ud83e\udde8", "\u2728", "\ud83c\udf88", "\ud83c\udf89", "\ud83c\udf8a", "\ud83c\udf8b", "\ud83c\udf8d", "\ud83c\udf8e", "\ud83c\udf8f", "\ud83c\udf90", "\ud83c\udf91", "\ud83e\udde7", "\ud83c\udf80", "\ud83c\udf81", "\ud83c\udf97", "\ud83c\udf9f", "\ud83c\udfab", "\ud83c\udf96", "\ud83c\udfc6", "\ud83c\udfc5", "\ud83e\udd47", "\ud83e\udd48", "\ud83e\udd49", "\u26bd", "\u26be", "\ud83e\udd4e", "\ud83c\udfc0", "\ud83c\udfd0", "\ud83c\udfc8", "\ud83c\udfc9", "\ud83c\udfbe", "\ud83e\udd4f", "\ud83c\udfb3", "\ud83c\udfcf", "\ud83c\udfd1", "\ud83c\udfd2", "\ud83e\udd4d", "\ud83c\udfd3", "\ud83c\udff8", "\ud83e\udd4a", "\ud83e\udd4b", "\ud83e\udd45", "\u26f3", "\u26f8", "\ud83c\udfa3", "\ud83e\udd3f", "\ud83c\udfbd", "\ud83c\udfbf", "\ud83d\udef7", "\ud83e\udd4c", "\ud83c\udfaf", "\ud83e\ude80", "\ud83e\ude81", "\ud83d\udd2b", "\ud83c\udfb1", "\ud83d\udd2e", "\ud83e\ude84", "\ud83c\udfae", "\ud83d\udd79", "\ud83c\udfb0", "\ud83c\udfb2", "\ud83e\udde9", "\ud83e\uddf8", "\ud83e\ude85", "\ud83e\udea9", "\ud83e\ude86", "\u2660", "\u2665", "\u2666", "\u2663", "\u265f", "\ud83c\udccf", "\ud83c\udc04", "\ud83c\udfb4", "\ud83c\udfad", "\ud83d\uddbc", "\ud83c\udfa8", "\ud83e\uddf5", "\ud83e\udea1", "\ud83e\uddf6", "\ud83e\udea2", "\ud83d\udc53", "\ud83d\udd76", "\ud83e\udd7d", "\ud83e\udd7c", "\ud83e\uddba", "\ud83d\udc54", "\ud83d\udc55", "\ud83d\udc56", "\ud83e\udde3", "\ud83e\udde4", "\ud83e\udde5", "\ud83e\udde6", "\ud83d\udc57", "\ud83d\udc58", "\ud83e\udd7b", "\ud83e\ude71", "\ud83e\ude72", "\ud83e\ude73", "\ud83d\udc59", "\ud83d\udc5a", "\ud83e\udead", "\ud83d\udc5b", "\ud83d\udc5c", "\ud83d\udc5d", "\ud83d\udecd", "\ud83c\udf92", "\ud83e\ude74", "\ud83d\udc5e", "\ud83d\udc5f", "\ud83e\udd7e", "\ud83e\udd7f", "\ud83d\udc60", "\ud83d\udc61", "\ud83e\ude70", "\ud83d\udc62", "\ud83e\udeae", "\ud83d\udc51", "\ud83d\udc52", "\ud83c\udfa9", "\ud83c\udf93", "\ud83e\udde2", "\ud83e\ude96", "\u26d1", "\ud83d\udcff", "\ud83d\udc84", "\ud83d\udc8d", "\ud83d\udc8e", "\ud83d\udd07", "\ud83d\udd08", "\ud83d\udd09", "\ud83d\udd0a", "\ud83d\udce2", "\ud83d\udce3", "\ud83d\udcef", "\ud83d\udd14", "\ud83d\udd15", "\ud83c\udfbc", "\ud83c\udfb5", "\ud83c\udfb6", "\ud83c\udf99", "\ud83c\udf9a", "\ud83c\udf9b", "\ud83c\udfa4", "\ud83c\udfa7", "\ud83d\udcfb", "\ud83c\udfb7", "\ud83e\ude97", "\ud83c\udfb8", "\ud83c\udfb9", "\ud83c\udfba", "\ud83c\udfbb", "\ud83e\ude95", "\ud83e\udd41", "\ud83e\ude98", "\ud83e\ude87", "\ud83e\ude88", "\ud83d\udcf1", "\ud83d\udcf2", "\u260e", "\ud83d\udcde", "\ud83d\udcdf", "\ud83d\udce0", "\ud83d\udd0b", "\ud83e\udeab", "\ud83d\udd0c", "\ud83d\udcbb", "\ud83d\udda5", "\ud83d\udda8", "\u2328", "\ud83d\uddb1", "\ud83d\uddb2", "\ud83d\udcbd", "\ud83d\udcbe", "\ud83d\udcbf", "\ud83d\udcc0", "\ud83e\uddee", "\ud83c\udfa5", "\ud83c\udf9e", "\ud83d\udcfd", "\ud83c\udfac", "\ud83d\udcfa", "\ud83d\udcf7", "\ud83d\udcf8", "\ud83d\udcf9", "\ud83d\udcfc", "\ud83d\udd0d", "\ud83d\udd0e", "\ud83d\udd6f", "\ud83d\udca1", "\ud83d\udd26", "\ud83c\udfee", "\ud83e\ude94", "\ud83d\udcd4", "\ud83d\udcd5", "\ud83d\udcd6", "\ud83d\udcd7", "\ud83d\udcd8", "\ud83d\udcd9", "\ud83d\udcda", "\ud83d\udcd3", "\ud83d\udcd2", "\ud83d\udcc3", "\ud83d\udcdc", "\ud83d\udcc4", "\ud83d\udcf0", "\ud83d\uddde", "\ud83d\udcd1", "\ud83d\udd16", "\ud83c\udff7", "\ud83d\udcb0", "\ud83e\ude99", "\ud83d\udcb4", "\ud83d\udcb5", "\ud83d\udcb6", "\ud83d\udcb7", "\ud83d\udcb8", "\ud83d\udcb3", "\ud83e\uddfe", "\ud83d\udcb9", "\u2709", "\ud83d\udce7", "\ud83d\udce8", "\ud83d\udce9", "\ud83d\udce4", "\ud83d\udce5", "\ud83d\udce6", "\ud83d\udceb", "\ud83d\udcea", "\ud83d\udcec", "\ud83d\udced", "\ud83d\udcee", "\ud83d\uddf3", "\u270f", "\u2712", "\ud83d\udd8b", "\ud83d\udd8a", "\ud83d\udd8c", "\ud83d\udd8d", "\ud83d\udcdd", "\ud83d\udcbc", "\ud83d\udcc1", "\ud83d\udcc2", "\ud83d\uddc2", "\ud83d\udcc5", "\ud83d\udcc6", "\ud83d\uddd2", "\ud83d\uddd3", "\ud83d\udcc7", "\ud83d\udcc8", "\ud83d\udcc9", "\ud83d\udcca", "\ud83d\udccb", "\ud83d\udccc", "\ud83d\udccd", "\ud83d\udcce", "\ud83d\udd87", "\ud83d\udccf", "\ud83d\udcd0", "\u2702", "\ud83d\uddc3", "\ud83d\uddc4", "\ud83d\uddd1", "\ud83d\udd12", "\ud83d\udd13", "\ud83d\udd0f", "\ud83d\udd10", "\ud83d\udd11", "\ud83d\udddd", "\ud83d\udd28", "\ud83e\ude93", "\u26cf", "\u2692", "\ud83d\udee0", "\ud83d\udde1", "\u2694", "\ud83d\udca3", "\ud83e\ude83", "\ud83c\udff9", "\ud83d\udee1", "\ud83e\ude9a", "\ud83d\udd27", "\ud83e\ude9b", "\ud83d\udd29", "\u2699", "\ud83d\udddc", "\u2696", "\ud83e\uddaf", "\ud83d\udd17", "\u26d3", "\ud83e\ude9d", "\ud83e\uddf0", "\ud83e\uddf2", "\ud83e\ude9c", "\u2697", "\ud83e\uddea", "\ud83e\uddeb", "\ud83e\uddec", "\ud83d\udd2c", "\ud83d\udd2d", "\ud83d\udce1", "\ud83d\udc89", "\ud83e\ude78", "\ud83d\udc8a", "\ud83e\ude79", "\ud83e\ude7c", "\ud83e\ude7a", "\ud83e\ude7b", "\ud83d\udeaa", "\ud83d\uded7", "\ud83e\ude9e", "\ud83e\ude9f", "\ud83d\udecf", "\ud83d\udecb", "\ud83e\ude91", "\ud83d\udebd", "\ud83e\udea0", "\ud83d\udebf", "\ud83d\udec1", "\ud83e\udea4", "\ud83e\ude92", "\ud83e\uddf4", "\ud83e\uddf7", "\ud83e\uddf9", "\ud83e\uddfa", "\ud83e\uddfb", "\ud83e\udea3", "\ud83e\uddfc", "\ud83e\udee7", "\ud83e\udea5", "\ud83e\uddfd", "\ud83e\uddef", "\ud83d\uded2", "\ud83d\udeac", "\u26b0", "\ud83e\udea6", "\u26b1", "\ud83e\uddff", "\ud83e\udeac", "\ud83d\uddff", "\ud83e\udea7", "\ud83e\udeaa"];
const COLORS = ["#ef9a9a", "#f48fb1", "#ce93d8", "#b39ddb", "#9fa8da", "#90caf9", "#81d4fa", "#80deea", "#80cbc4", "#a5d6a7", "#c5e1a5", "#e6ee9c", "#fff59d", "#ffe082", "#ffcc80", "#ffab91", "#bcaaa4", "#eeeeee", "#b0bec5", ];
export const getRandomThumb = () => {
  const idx = Math.floor(Math.random() * (EMOJIS.length * COLORS.length));
  return {
    thumbId: idx,
    emoji: EMOJIS[parseInt(idx / COLORS.length)],
    color: COLORS[idx % COLORS.length],
  };
};


const NUTS = ["호두", "피스타치오", "캐슈넛", "땅콩", "마카다미아", "아몬드", "밤"];
export const getRandomNut = () => {
  const idx = Math.floor(Math.random() * NUTS.length);
  return {
    nutId: idx,
    nutName: NUTS[idx],
  };
};