import React from "react";

import "./style.scoped.scss";

import { FeedModel, UserModel } from "../../models";
import UserViewModel from "../../view-models/user";

import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";


const Feed = ({ items, makeItems }) => {
  const userViewModel = new UserViewModel(new UserModel());
  const address = userViewModel.getUserLocation().location.address.split(" ");

  return (
    <div className="page-wrap">
      <header className="header">
        <h1 className="title">Feed</h1>
        <div className="right">
          <div className="location">
            <div className="text-wrap">
              <p>{address.slice(0, -1).join(" ")}</p>
              <p>{address[address.length - 1]}</p>
            </div>
            <button className="icon-sm">
              <LocationSearchingIcon height="1.5rem" fill="var(--primary-text-color)" />
            </button>
          </div>
        </div>
      </header>
      <section className="feed-list">
        {items.map(makeItems)}
      </section>
    </div>
  );
};

export default Feed;