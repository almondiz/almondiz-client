import React from "react";

import { FeedModel, UserModel } from "../../models";

import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import PostView from "./post-view.js";

import PostItem from "../../components/post-item";

const Post = ({ index }) => {
  const feedViewModel = new FeedViewModel(new FeedModel());
  const userViewModel = new UserViewModel(new UserModel());

  const makePost = (post, index) => (<PostItem key={index} index={index} post={post} user={userViewModel.getUserLocation()} />);

  return (
    <PostView
      post={feedViewModel.getPost(index)}
      makePost={makePost}
    />
  );
}


export default Post;