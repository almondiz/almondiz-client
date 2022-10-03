import React from "react";

import "./style.scoped.scss";


const Slider = () => {
  return (
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
  );
};

export default Slider;