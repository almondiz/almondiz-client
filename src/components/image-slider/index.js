import React from "react";

import "./style.scoped.scss";


const ImageSlider = ({ images }) => {
  const makeSlide = (src, idx) => (
    <div key={`image-${idx}`}>
      <div className="image" style={{backgroundImage: `url(${src})` }} />
    </div>
  );
  const makeIndicator = (images) => {
    const indicator = [];
    images.forEach((_, idx) => {
      indicator.push(
        <div
          data-id={idx}
          className={idx === 0 ? "highlight" : ""}
          key={`indicator-${idx}`}
        ></div>
      );
    });
    return indicator;
  };

  const onScroll = ({ target }) => {
    const setHighLight = (dom, target) => {
      if (dom.querySelector(".highlight") === target) return;
      dom.querySelector(".highlight").classList.remove("highlight");
      target.classList.add("highlight");
    };

    const index = Math.round(target.scrollLeft / target.clientWidth);
    if (index < 0 || index >= images.length) return;
    const indicatorDom = target.parentNode.querySelector(".indicator");
    setHighLight(indicatorDom, indicatorDom.querySelector(`div[data-id="${index}"]`));
  };
  
  return (
    <div className="image-slider">
      <div className="slides" onScroll={onScroll}>{images.map(makeSlide)}</div>
      <div className="indicator">{makeIndicator(images)}</div>
    </div>
  );
};

export default ImageSlider;