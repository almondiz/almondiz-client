import React, { useState, useEffect } from "react";


export class StaticComponentRefs {};


export class Pipe {
  static data = {};

  static set(key, val, depList=[]) {
    useEffect(() => {
      Pipe.data[key] = val;
      //console.log("[Pipe]", `key '${key}' added`);
      return () => {
        delete Pipe.data[key];
        //console.log("[Pipe]", `key '${key}' deleted`);
      };
    }, depList);
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