import React, { useState, forwardRef, useImperativeHandle } from "react";

import { NoScroll } from "../../util";

import "./style.scoped.scss";
import CloseIcon from "../../asset/icons/mui/close-icon";
import NavigateBeforeIcon from "../../asset/icons/mui/navigate-before-icon";
import NavigateNextIcon from "../../asset/icons/mui/navigate-next-icon";


const ImageViewer = forwardRef(({ images }, ref) => {
  const [index, setIndex] = useState(-1);
  useImperativeHandle(ref, () => ({ index: index, setIndex: setIndex, }));

  const image = images[index];

  return (index !== -1) && (
    <div className="image-viewer">
      <div className="background" />
      <img className="image" src={image} />
      <button className="button-close icon-md" onClick={() => setIndex(-1)}>
        <CloseIcon />
      </button>
      <button className="button-prev icon-lg" onClick={() => setIndex((index + images.length - 1) % images.length)}>
        <NavigateBeforeIcon />
      </button>
      <button className="button-next icon-lg" onClick={() => setIndex((index + 1) % images.length)}>
        <NavigateNextIcon />
      </button>
      <p className="index">{`${index + 1} / ${images.length}`}</p>

      <NoScroll />
    </div>
  );
});

export default ImageViewer;