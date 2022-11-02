import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchViewModel } from "../../view-models";

import { StaticComponentRefs, Frame } from "../../asset/common/controllers";

import FrameFindPlace from "./frame-find-place";
import FrameRegister from "./frame-register";


const DirectPage = () => {
  const navigate = useNavigate();

  const [ place, setPlace ] = useState({});
  const [ shop, setShop ] = useState({});

  /** 0. SEARCH API */
  const searchViewModel = new SearchViewModel();
  const searchPlace = async (keyword) => (await searchViewModel.searchPlace(keyword));
  const searchFoodTag = async (keyword) => (await searchViewModel.searchFoodTag(keyword));
  const createFoodTag = async (tagName) => (await searchViewModel.createFoodTag(tagName));
  /** */

  const registerShop = async () => {
    const success = await createPost();
    if (success) {
      navigate(`/edit`, { state: { newShop: shop } });
      StaticComponentRefs.toastRef?.current?.log("글을 게시했습니다.");
    }
  };

  const frame = new Frame();
  frame.init([
    <FrameFindPlace frame={frame} setPlace={setPlace} searchPlace={searchPlace} />,

    // [DEPRECATED]
    <FrameRegister frame={frame} registerShop={registerShop}
      place={place}
      shop={shop} setShop={setShop}
      searchFoodTag={searchFoodTag} createFoodTag={createFoodTag}
    />,
  ]);

  return (
    <div id="page">{frame.view()}</div>
  );
};
export default DirectPage;