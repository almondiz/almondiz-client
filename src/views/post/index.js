import React, { useState } from "react";

import { FeedModel, UserModel } from "../../models";

import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import PostView from "./post-view.js";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import CloseIcon from "../../asset/icons/mui/close-icon";
import NavigateBeforeIcon from "../../asset/icons/mui/navigate-before-icon";
import NavigateNextIcon from "../../asset/icons/mui/navigate-next-icon";


const ImageViewer = ({ images, shownImageIndex, setShownImageIndex }) => {
  const image = images[shownImageIndex];

  return shownImageIndex !== null && (
    <div className="image-viewer">
      <div className="background" style={{ backgroundImage: `url(${image})`}} />
      <img className="image" src={image}></img>
      <button className="button-close icon-xl" onClick={() => setShownImageIndex(null)}>
        <CloseIcon height="2rem" fill="#fff" />
      </button>
      <button className="button-prev icon-xl" onClick={() => setShownImageIndex((shownImageIndex + images.length - 1) % images.length)}>
        <NavigateBeforeIcon height="3rem" fill="#fff" />
      </button>
      <button className="button-next icon-xl" onClick={() => setShownImageIndex((shownImageIndex + 1) % images.length)}>
        <NavigateNextIcon height="3rem" fill="#fff" />
      </button>
      <p className="index">{`${shownImageIndex + 1} / ${images.length}`}</p>
    </div>
  );
};

const Post = ({ index }) => {
  const feedViewModel = new FeedViewModel(new FeedModel());
  const userViewModel = new UserViewModel(new UserModel());

  // for image viewer
  const [shownImageIndex, setShownImageIndex] = useState(null);

  const makePost = (post, index) => (
    <PostItem
      key={index}
      index={index}
      post={post}
      user={userViewModel.getUserLocation()}
      shownImageIndex={shownImageIndex}
      setShownImageIndex={setShownImageIndex}
    />
  );
  const makeImageViewer = images => (
    <ImageViewer
      images={images}
      shownImageIndex={shownImageIndex}
      setShownImageIndex={setShownImageIndex}
    />
  );

  return (
    <PostView
      post={feedViewModel.getPost(index)}
      makePost={makePost}
      makeImageViewer={makeImageViewer}
    />
  );
};

export default Post;