import React, { useRef, useState } from "react";

import "./style.scoped.scss";

const ImageSlider = ({ images }) => {
  const _slide = document.querySelector(".slides");
  const makeImages = (src, index) => (
    <div key={`image-${index}`}><img src={src} alt="" /></div>
  );

  const scrollToElement = ({ target }) => {
    const index = parseInt(target.dataset.id, 10);
    _slide.scrollTo(index * _slide.clientWidth, 0);
    setHighLight(target);
  };

  const makeThumbnails = (images) => {
    const thumbnails = [];
    images.forEach((_, index) => {
      thumbnails.push(
        <div
          onClick={scrollToElement}
          data-id={index}
          className={index === 0 ? "highlighted" : ""}
          key={`thumbnails-${index}`}
        ></div>
      );
    });
    return (thumbnails);
  }

  const setHighLight = (target) => {
    if (document.querySelector(".highlighted") === target) return;
    document.querySelector(".highlighted").classList.remove("highlighted");
    target.classList.add("highlighted");
  }

  const scrollEvent = () => {
    const index = Math.floor(_slide.scrollLeft / _slide.clientWidth);
    setHighLight(document.querySelector(`div[data-id="${index}"]`));
  }
  
  return (
    <div className="gallery-container">
      <div className="thumbnails">
        {makeThumbnails(images)}
      </div>
      <div className="slides" onScroll={scrollEvent}>{images.map(makeImages)}</div>
    </div>
  )
};

export default ImageSlider;