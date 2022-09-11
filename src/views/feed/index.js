import React from "react";

import { FeedModel, UserModel } from "../../models";
import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import FeedItem from "../../components/feed-item";

import "./style.scoped.scss";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";


const Feed = () => {
  const feedViewModel = new FeedViewModel(new FeedModel());
  const userViewModel = new UserViewModel(new UserModel());
  
  const address = userViewModel.getUserLocation().location.address.split(" ");

  const items = feedViewModel.getAllFeedList();
  const makeItems = (post, index) => (<FeedItem key={index} post={post} user={userViewModel.getUserLocation()}></FeedItem>);

  return (
    <div className="page-wrap">
      <header className="header">
        <h1 className="title">Feed</h1>
        <div className="right">
          <button className="button-location">
            <div className="text-wrap">
              <p>{address.slice(0, -1).join(" ")}</p>
              <p>{address[address.length - 1]}</p>
            </div>
            <div className="icon-sm">
              <LocationSearchingIcon />
            </div>
          </button>
        </div>
      </header>
      <section className="feed-list">
        {items.map(makeItems)}
      </section>
    </div>
  );
};

export default Feed;