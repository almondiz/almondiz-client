import React from "react";

import "./style.scoped.scss";

import { FeedModel, UserModel } from "../../models";
import UserViewModel from "../../view-models/user";

import LocationSearchingIcon from "../../asset/icons/location-searching-icon";


const Feed = (props) => {
  const { posts, makeItems } = props;

  const userViewModel = new UserViewModel(new UserModel());
  const address = userViewModel.getUserLocation().location.address.split(" ");

  return (
    <main>
      <div className="feed-list-head">
        <p className="title">Feed</p>
        <div className="right">
          <div className="location">
            <p>{address.slice(0, -1).join(" ")}</p>
            <p>{address[address.length - 1]}</p>
          </div>
          <LocationSearchingIcon height="1.5rem" fill="var(--primary-text-color)" />
        </div>
      </div>
      {posts.map(makeItems)}
    </main>
  );
};

export default Feed;