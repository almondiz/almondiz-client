import React from "react";

import "./style.scoped.scss";

import LocationSearchingIcon from "../../asset/icons/location-searching-icon";


const Feed = (props) => {
  const { posts, makeItems } = props;

  return (
    <main>
      <div className="feed-list-head">
        <p className="feed-list-head-title">Feed</p>
        <div className="feed-list-head-wrap">
          <div className="feed-list-head-wrap column">
            <p>수원 팔달구</p>
            <p>우만동</p>
          </div>
            <LocationSearchingIcon height="1.5rem" fill="var(--primary-text-color)" />
        </div>
      </div>
      {posts.map(makeItems)}
    </main>
  );
};

export default Feed;