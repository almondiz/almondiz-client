import React, { useState, useEffect } from "react";

import "./style.scoped.scss";
import CloseIcon from "../../asset/icons/mui/close-icon";
import NavigateBeforeIcon from "../../asset/icons/mui/navigate-before-icon";
import NavigateNextIcon from "../../asset/icons/mui/navigate-next-icon";


const ImageView = ({ images, controller={} }) => {
  [controller.index, controller.setIndex] = useState(null);
  const image = images[controller.index];

  if (controller.index === null) {
    document.body.classList.remove("noscroll");
    return false;
  } else {
    document.body.classList.add("noscroll");
    return (
      <div className="image-view">
        <div className="background" style={{ /*backgroundImage: `url(${image})`*/ }} />
        <img className="image" src={image} />
        <button className="button-close icon-md" onClick={() => controller.setIndex(null)}>
          <CloseIcon height="2rem" fill="#fff" />
        </button>
        <button className="button-prev icon-lg" onClick={() => controller.setIndex((controller.index + images.length - 1) % images.length)}>
          <NavigateBeforeIcon height="3rem" fill="#fff" />
        </button>
        <button className="button-next icon-lg" onClick={() => controller.setIndex((controller.index + 1) % images.length)}>
          <NavigateNextIcon height="3rem" fill="#fff" />
        </button>
        <p className="index">{`${controller.index + 1} / ${images.length}`}</p>
      </div>
    );
  }
};

export default ImageView;