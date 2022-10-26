import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { StaticComponentRefs, Frame } from "../../util";
import { PostViewModel, EditViewModel, SearchViewModel } from "../../view-models";

import FrameFindShop from "./frame-find-shop";
import FrameWrite from "./frame-write";


const EditMode = ({ postId }) => {
  const navigate = useNavigate();

  const [ shop, setShop ] = useState(null);
  const [ postTags, setPostTags ] = useState(null);
  const [ postText, setPostText ] = useState(null);
  const [ postImages, setPostImages ] = useState(null);

  /** 4. POST API */
  const postViewModel = new PostViewModel();
  const readPost = async () => {
    const post = await postViewModel.readPost(postId);
    const { postTags, postText, postImages } = post;
    const shop = {
      shopId: post.shopId,
      shopName: post.shopName,
      shopAddress: post.shopAddress,
      shopThumbUrl: post.shopThumbUrl,
    };
    setShop(shop), setPostTags(postTags), setPostText(postText), setPostImages(postImages);
  };
  useEffect(() => { readPost(); }, []);

  const editViewModel = new EditViewModel();
  const modifyPost = async () => (await editViewModel.modifyPost(postId, { shop, postTags, postText, postImages }));
  /** */

  /** 0. SEARCH API */
  const searchViewModel = new SearchViewModel();
  const searchFoodTag = async (keyword) => (await searchViewModel.searchFoodTag(keyword));
  const createFoodTag = async (tagName) => (await searchViewModel.createFoodTag(tagName));
  /** */

  const publishPost = async () => {
    const success = await modifyPost();
    if (success) {
      navigate(`/me`);
      StaticComponentRefs.toastRef?.current?.log("글을 수정했습니다.");
    }
  };

  return (shop && postTags && postText && postImages) && (
    <FrameWrite isModifyMode={true} goBack={() => navigate(-1)} publishPost={publishPost}
      shop={shop}
      postTags={postTags} setPostTags={setPostTags}
      postText={postText} setPostText={setPostText}
      postImages={postImages} setPostImages={setPostImages}
      searchFoodTag={searchFoodTag} createFoodTag={createFoodTag}
    />
  );
};
const CreateMode = () => {
  const navigate = useNavigate();

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

  const publishPost = async () => {
    const success = await createPost();
    if (success) {
      navigate(`/me`);
      StaticComponentRefs.toastRef?.current?.log("글을 게시했습니다.");
    }
  };

  const frame = new Frame();
  frame.init([
    <FrameFindShop frame={frame} setShop={setShop} searchShop={searchShop} />,
    <FrameWrite isModifyMode={false} goBack={() => frame.prev()} publishPost={publishPost}
      shop={shop}
      postTags={postTags} setPostTags={setPostTags}
      postText={postText} setPostText={setPostText}
      postImages={postImages} setPostImages={setPostImages}
      searchFoodTag={searchFoodTag} createFoodTag={createFoodTag}
    />,
  ]);
  return frame.view();
};

const EditPage = () => {
  const location = useLocation();
  const postId = location.state?.postId;    // edit mode (not create mode) if this field exists

  return (
    <div id="page">
      {postId ? <EditMode postId={postId} /> : <CreateMode />}
    </div>
  );
};

export default EditPage;