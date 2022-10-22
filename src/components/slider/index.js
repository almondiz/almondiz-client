import React, { useEffect, useRef } from "react";

import "./style.scoped.scss";


const Slider = ({ value, setValue, min=0, max=100, step=1, ticks=[] }) => {
  const inputRef = useRef();

  const onInput = e => setValue(e.target.value);
  useEffect(() => {
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
};

export default Slider;