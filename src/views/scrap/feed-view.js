import React from "react";

import "./style.scoped.scss";

import { FeedModel, UserModel } from "../../models";
import UserViewModel from "../../view-models/user";


const Feed = ({ items, makeItems }) => {
  const userViewModel = new UserViewModel(new UserModel());
  const address = userViewModel.getUserLocation().location.address.split(" ");

  return (
    <div className="page-wrap">
      <header className="header">
        <h1 className="title">Scrapped</h1>
        <div className="right" />
      </header>
      <section className="feed-list">
        {items.map(makeItems)}
      </section>
    </div>
  );
};

export default Feed;