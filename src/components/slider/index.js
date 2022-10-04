import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";

import "./style.scoped.scss";


const Slider = forwardRef(({ action=(() => {}), initial=0, min=0, max=100, step=1, ticks=[] }, ref) => {
  const [value, setValue] = useState(initial);
  useImperativeHandle(ref, () => ({ value: value, }));
  const inputRef = useRef();

  const onInput = e => setValue(e.target.value);
  useEffect(() => {
    action(value);

    const obj = inputRef.current;
    obj.style.backgroundSize = `${(value - min) * 100 / (max - min)}% 100%`;
  }, [value]);

  return (
    <div className="slider">
      <div className="slider-indicator">
      <input type="range" ref={inputRef} min={min} max={max} step={step} value={value} onInput={onInput} />
      </div>
      <ul className="slider-ticks">
        {ticks.map((tick, idx) => <li key={idx} className="slider-ticks-tick"><span>{tick}</span></li>)}
      </ul>
    </div>
  );

  /*return (
    <div className="slider">
      <div className="slider-indicator">
        <div className="slider-indicator-inactive" />
        <div className="slider-indicator-active">
          <div className="slider-indicator-active-track" />
          <div className="slider-indicator-active-knob" />
        </div>
      </div>
      <ul className="slider-ticks">
        <li className="slider-ticks-tick">0km</li>
        <li className="slider-ticks-tick">10km</li>
        <li className="slider-ticks-tick">20km</li>
        <li className="slider-ticks-tick">30km</li>
      </ul>
    </div>
  );*/
});

export default Slider;