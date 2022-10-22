import React, { useState } from "react";

import { Frame } from "../../util";
import { SearchViewModel } from "../../view-models";

import FrameFindPlace from "./frame-find-place";
import FrameTag from "./frame-tag";


const DirectPage = ({ floatRef, backdropRef }) => {
  const [ shop, setShop ] = useState({});

  /** 0. SEARCH API */
  const searchViewModel = new SearchViewModel();
  const searchPlace = async (keyword) => (await searchViewModel.searchPlace(keyword));
  const searchFoodTag = async (keyword) => (await searchViewModel.searchFoodTag(keyword));
  const createFoodTag = async (tagName) => (await searchViewModel.createFoodTag(tagName));
  /** */


  const frame = new Frame();
  frame.init([
    <FrameFindPlace frame={frame} floatRef={floatRef} searchPlace={searchPlace} />,
    <FrameTag frame={frame} floatRef={floatRef}
      shop={shop} setShop={setShop}
      searchFoodTag={searchFoodTag} createFoodTag={createFoodTag}
    />,
  ]);

  return (
    <div id="page">{frame.view()}</div>
  );
};

export default DirectPage;