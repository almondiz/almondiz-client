import React, { useEffect, useState } from "react";

import { Frame } from "../../util";
import { EditViewModel } from "../../view-models";

import FrameFindShop from "./frame-find-shop";
import FrameDirect from "./frame-direct";
import FrameDirectTag from "./frame-direct-tag";
import FrameWrite from "./frame-write";

const EditPage = ({ floatRef, backdropRef }) => {
  const frame = new Frame();
  const editViewModel = new EditViewModel();
  const [ shopData, setShopData ] = useState({});
  const [ content, setContent ] = useState("");
  const [ tags, setTags ] = useState([]);

  useEffect(() => {
    console.log("[EditPage]", shopData);
    shopData.tags && setTags([...shopData.tags]);
  }, [shopData]);

  const createPost = async () => {
    await editViewModel.createPost({
      content,
      images: [
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200512_270%2F1589240248177WIr4l_JPEG%2FKakaoTalk_Photo_2019-11-15-21-09-35.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20160222_124%2F1456108689766cGsT8_JPEG%2F176172516828220_1.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20160222_65%2F1456108689887hMVWw_JPEG%2F176172516828220_2.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMjA4MDVfMTg1%2FMDAxNjU5NjU1NjY2MDY0.9OVwKR1z4PPRPc261Bm6s7uijG0StPCpIjmpGNTN7gog.k3_zLr9zb9AO4HIUhxSAEAMHwMn-fDUtJWv6ggqm_i4g.JPEG%2Fupload_7a34a53d254c06cf9240f8ac12b01655.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_50%2F1640014951911xYfbU_JPEG%2Fupload_72846c3e27e83636fc5315a45bb4ee53.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_238%2F164001495200947VEL_JPEG%2Fupload_438a1fb5d2e2bdf650c5ccc9ae140291.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_245%2F1640014952265p4T4U_JPEG%2Fupload_74f2d577c28ecb075f4f90f026ffd1f1.jpeg",
      ],
      shopId: shopData.shopId,
      // 태그 기능 제대로 구현 필요
      tags: shopData.tags.map(({ tagId }) => tagId),
      lati: shopData.lati,
      longi: shopData.longi,
    });
  }

  frame.init([
    <FrameFindShop
      searchTags={editViewModel.searchTags}
      setShopData={setShopData}
      frame={frame}
      floatRef={floatRef}
    />,
    <FrameDirect frame={frame} floatRef={floatRef} />,
    <FrameDirectTag frame={frame} floatRef={floatRef} />,
    <FrameWrite
      frame={frame}
      floatRef={floatRef}
      backdropRef={backdropRef}
      getShopData={() => shopData}
      getTags={() => tags}
      setContent={setContent}
      setTags={setTags}
      createPost={createPost}
    />,
  ]);

  return (
    <div id="page">{frame.view()}</div>
  );
};

export default EditPage;