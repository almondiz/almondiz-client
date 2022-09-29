import React, { useState, forwardRef, useImperativeHandle } from "react";

import "./style.scoped.scss";
import CloseIcon from "../../asset/icons/mui/close-icon";
import NavigateBeforeIcon from "../../asset/icons/mui/navigate-before-icon";
import NavigateNextIcon from "../../asset/icons/mui/navigate-next-icon";


const ImageViewer = forwardRef(({ images }, ref) => {
  const [index, setIndex] = useState(null);
  useImperativeHandle(ref, () => ({
    index: index,
    setIndex: setIndex,
  }));

  const image = images[index];

  if (index === null) {
    document.body.classList.remove("noscroll");
    return <></>;
  } else {
    document.body.classList.add("noscroll");
    return (
      <div className="image-viewer">
        <div className="background" style={{ /*backgroundImage: `url(${image})`*/ }} />
        <img className="image" src={image} />
        <button className="button-close icon-md" onClick={() => setIndex(null)}>
          <CloseIcon height="2rem" fill="#fff" />
        </button>
        <button className="button-prev icon-lg" onClick={() => setIndex((index + images.length - 1) % images.length)}>
          <NavigateBeforeIcon height="3rem" fill="#fff" />
        </button>
        <button className="button-next icon-lg" onClick={() => setIndex((index + 1) % images.length)}>
          <NavigateNextIcon height="3rem" fill="#fff" />
        </button>
        <p className="index">{`${index + 1} / ${images.length}`}</p>
      </div>
    );
  }
});

export default ImageViewer;