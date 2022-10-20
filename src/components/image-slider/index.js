import React from "react";

import "./style.scoped.scss";


const ImageSlider = ({ imageUrls=[] }) => {
  const makeSlide = (src, idx) => (
    <div key={`image-${idx}`}>
      <div className="image" style={{backgroundImage: `url(${src})` }} />
    </div>
  );
  const makeIndicator = imageUrls => {
    const indicator = [];
    imageUrls.forEach((_, idx) => {
      indicator.push(
        <div
          data-index={idx}
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
    if (index < 0 || index >= imageUrls.length) return;
    const indicatorDOM = target.parentNode.querySelector(".indicator");
    setHighLight(indicatorDOM, indicatorDOM.querySelector(`div[data-index="${index}"]`));
  };
  
  return (
    <div className="image-slider">
      <div className="slides" onScroll={onScroll}>{imageUrls.map(makeSlide)}</div>
      <div className="indicator">{makeIndicator(imageUrls)}</div>
    </div>
  );
};

export default ImageSlider;