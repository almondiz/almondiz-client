import React, { useState, forwardRef, useImperativeHandle } from "react";

import { NoScroll } from "../../asset/common/components";

import "./style.scoped.scss";
import CloseIcon from "../../asset/icons/mui/close-icon";
import NavigateBeforeIcon from "../../asset/icons/mui/navigate-before-icon";
import NavigateNextIcon from "../../asset/icons/mui/navigate-next-icon";


const ImageViewer = forwardRef(({ images=[] }, ref) => {
  const [index, setIndex] = useState(-1);
  useImperativeHandle(ref, () => ({ index, setIndex }));

  const image = images[index];

  return (index !== -1) && (
    <div className="image-viewer">
      <div className="background" />
      <img className="image" src={image.url} />
      <button className="button button-close" onClick={() => setIndex(-1)}>
        <div className="icon"><CloseIcon /></div>
      </button>
      <button className="button button-prev" onClick={() => setIndex((index + images.length - 1) % images.length)}>
        <div className="icon"><NavigateBeforeIcon /></div>
      </button>
      <button className="button button-next" onClick={() => setIndex((index + 1) % images.length)}>
        <div className="icon"><NavigateNextIcon /></div>
      </button>
      <p className="index">{`${index + 1} / ${images.length}`}</p>

      <NoScroll />
    </div>
  );
});
export default ImageViewer;