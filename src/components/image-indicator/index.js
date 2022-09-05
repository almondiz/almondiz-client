import React, { useRef, useState } from "react";

import "./style.scoped.scss";

const makeImages = (src, index) => (
  <div key={index}><img src={src} /></div>
);

const ImageIndicator = ({ images }) => {
  return (
    <div className="gallery-container">
      <div className="thumbnails" />
      <div className="slides">{images.map(makeImages)}</div>
    </div>
  )
};

export default ImageIndicator;