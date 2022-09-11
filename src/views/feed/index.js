import React from "react";
import { useSelector } from "react-redux";

import { FeedModel } from "../../models";
import FeedViewModel from "../../view-models/feed";

import FeedItem from "../../components/feed-item";

import "./style.scoped.scss";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";


const Feed = ({ me }) => {
  const location = useSelector(state => state.global.location);
  const address = location.address.split(" ");

  const feedViewModel = new FeedViewModel(new FeedModel());
  const feedItems = feedViewModel.getAllFeedList();
  const makeFeedItems = (post, index) => (<FeedItem key={index} post={post} me={me}></FeedItem>);

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
        {feedItems.map(makeFeedItems)}
      </section>
    </div>
  );
};

export default Feed;