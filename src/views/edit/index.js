import React, { useState } from "react";

import { Frame } from "../../util";
import { EditViewModel, SearchViewModel } from "../../view-models";

import FrameFindShop from "./frame-find-shop";
import FrameWrite from "./frame-write";


const EditPage = ({ floatRef, backdropRef }) => {
  const [ shop, setShop ] = useState({});
  const [ postTags, setPostTags ] = useState([]);
  const [ postText, setPostText ] = useState("");
  const [ postImages, setPostImages ] = useState([]);

  /** 4. POST API */
  const editViewModel = new EditViewModel();
  const createPost = async () => (await editViewModel.createPost({ shop, postTags, postText, postImages }));
  /** */

  /** 0. SEARCH API */
  const searchViewModel = new SearchViewModel();
  const searchShop = async (keyword) => (await searchViewModel.searchShop(keyword));
  const searchFoodTag = async (keyword) => (await searchViewModel.searchFoodTag(keyword));
  const createFoodTag = async (tagName) => (await searchViewModel.createFoodTag(tagName));
  /** */


  const frame = new Frame();
  frame.init([
    <FrameFindShop frame={frame} floatRef={floatRef}
      setShop={setShop}
      searchShop={searchShop}
    />,
    <FrameWrite frame={frame} floatRef={floatRef} backdropRef={backdropRef}
      shop={shop}
      postTags={postTags} setPostTags={setPostTags}
      postText={postText} setPostText={setPostText}
      postImages={postImages} setPostImages={setPostImages}
      searchFoodTag={searchFoodTag} createFoodTag={createFoodTag}
      createPost={createPost}
    />,
  ]);

  return (
    <div id="page">{frame.view()}</div>
  );
};

export default EditPage;