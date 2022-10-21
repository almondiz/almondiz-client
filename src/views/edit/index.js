import React, { useState } from "react";

import { Frame } from "../../util";
import { EditViewModel } from "../../view-models";

import FrameFindShop from "./frame-find-shop";
import FrameDirect from "./frame-direct";
import FrameDirectTag from "./frame-direct-tag";
import FrameWrite from "./frame-write";


const EditPage = ({ floatRef, backdropRef }) => {
  const [ shop, setShop ] = useState({});
  const [ postTags, setPostTags ] = useState([]);
  const [ postText, setPostText ] = useState("");
  const [ postImages, setPostImages ] = useState([]);

  /** 4-0. POST API */
  const editViewModel = new EditViewModel();
  const createPost = async () => (await editViewModel.createPost({ shop, postTags, postText, postImages }));


  const frame = new Frame();
  frame.init([
    <FrameFindShop
      searchTags={editViewModel.searchTags}
      setShop={setShop}
      frame={frame}
      floatRef={floatRef}
    />,
    <FrameDirect frame={frame} floatRef={floatRef} />,
    <FrameDirectTag frame={frame} floatRef={floatRef}
      shop={shop} setShop={setShop}
    />,
    <FrameWrite frame={frame} floatRef={floatRef} backdropRef={backdropRef}
      shop={shop}
      postTags={postTags} setPostTags={setPostTags}
      postText={postText} setPostText={setPostText}
      postImages={postImages} setPostImages={setPostImages}
      createPost={createPost}
    />,
  ]);

  return (
    <div id="page">{frame.view()}</div>
  );
};

export default EditPage;