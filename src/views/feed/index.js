import React from "react";

import { FeedModel, UserModel } from "../../models";

import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import FeedView from "./feed-view.js";

import FeedItem from "../../components/feed-item";

const Feed = () => {
  const feedViewModel = new FeedViewModel(new FeedModel());
  const userViewModel = new UserViewModel(new UserModel());

  const makeItems = (post, index) => (<FeedItem key={index} post={post} user={userViewModel.getUserLocation()}></FeedItem>);

  return (
    <FeedView
      posts={feedViewModel.getAllFeedList()}
      makeItems={makeItems}
    />
  );
}


export default Feed;