import React from "react";

import "./style.scoped.scss";


const ImageSlider = ({ images=[] }) => {
  const makeSlide = (image, idx) => (
    <div key={`image-${idx}`}>
      <div className="image" style={{backgroundImage: `url(${image.url})` }} />
    </div>
  );
  const makeIndicator = images => {
    const indicator = [];
    images.forEach((_, idx) => {
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
    const setHighLight = (indicatorDOM, target) => {
      const highlightDOM = indicatorDOM.querySelector(".highlight");
      if (highlightDOM === target)  return;
      highlightDOM.classList.remove("highlight");
      target.classList.add("highlight");
    };

    const index = Math.round(target.scrollLeft / target.clientWidth);
    if (index < 0 || index >= images.length)  return;
    const indicatorDOM = target.parentNode.querySelector(".indicator");
    setHighLight(indicatorDOM, indicatorDOM.querySelector(`div[data-index="${index}"]`));
  };
  
  return (
    <div className="image-slider">
      <div className="slides" onScroll={onScroll}>{images.map(makeSlide)}</div>
      <div className="indicator">{makeIndicator(images)}</div>
    </div>
  );
};

export default ImageSlider;