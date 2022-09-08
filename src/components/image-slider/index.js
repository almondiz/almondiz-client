import React from "react";

import "./style.scoped.scss";

const ImageSlider = ({ images }) => {
  const makeImages = (src, index) => (
    <div key={`image-${index}`}>
      <div className="image" style={{backgroundImage: `url(${src})` }} />
    </div>
  );

  const scrollToElement = ({ target }) => {
    const slideDom = target.parentNode.querySelector(".slides");
    const index = parseInt(target.dataset.id, 10);
    slideDom.scrollTo(index * slideDom.clientWidth, 0);
    setHighLight(target.parentNode, target);
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
  };

  const setHighLight = (dom, target) => {
    if (dom.querySelector(".highlighted") === target) return;
    dom.querySelector(".highlighted").classList.remove("highlighted");
    target.classList.add("highlighted");
  };

  const scrollEvent = ({ target }) => {
    const index = Math.round(target.scrollLeft / target.clientWidth);
    if (index < 0 || index >= images.length) return;
    const thumbnailsDom = target.parentNode.querySelector(".thumbnails");
    setHighLight(thumbnailsDom, thumbnailsDom.querySelector(`div[data-id="${index}"]`));
  };
  
  return (
    <div className="image-slider">
      <div className="thumbnails">
        {makeThumbnails(images)}
      </div>
      <div className="slides" onScroll={scrollEvent}>{images.map(makeImages)}</div>
    </div>
  );
};

export default ImageSlider;