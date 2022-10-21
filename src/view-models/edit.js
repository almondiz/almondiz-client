import { PostModel } from "../models";


export default class EditViewModel {
  postModel;
  constructor(postModel=(new PostModel())) { this.postModel = postModel; }


  /** 4-0. POST API */
  // POST /api/post
  async createPost({ shop, postTags, postText, postImages }) {
    if ((postText = postText.trim()) === "")  return false;


    // upload images
    const postImageUrls = [];
    for (let i = 0; i < postImages.length; i++) {
      const imageFormData = new FormData();
      imageFormData.append("file", postImages[i]);
      // ### 스토리지 연결 작업 선행되어야 함 : file 전송하고, 업로드한 image의 url 응답받아서 url 배열 만든다.
      /*const imageRes = await apiClient.post("where", imageFormData);
      console.log("[EditViewModel.createPost - image]", imageRes);
      if (imageRes.success) {
        const imageUrl = imageRes.data.location;
        postImageUrls.push(imageUrl);
      }*/
    }

    // upload post
    const body = {
      // ### 새 태그, 새 음식점 등록은 여기서 일괄 처리하는 것이 좋지 않을까? (뜬금없는데 새 태그나 음식점은 역링크 글이 없으면 일정 기간 이후 자동으로 삭제되는 시스템도 괜찮을 거 같음)

      shopId: shop.shopId,
      tags: postTags.map(({ tagId }) => tagId),   // ### 태그 기능 제대로 구현 필요
      content: postText,
      //images: postImageUrls,
      images: [
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200512_270%2F1589240248177WIr4l_JPEG%2FKakaoTalk_Photo_2019-11-15-21-09-35.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20160222_124%2F1456108689766cGsT8_JPEG%2F176172516828220_1.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20160222_65%2F1456108689887hMVWw_JPEG%2F176172516828220_2.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMjA4MDVfMTg1%2FMDAxNjU5NjU1NjY2MDY0.9OVwKR1z4PPRPc261Bm6s7uijG0StPCpIjmpGNTN7gog.k3_zLr9zb9AO4HIUhxSAEAMHwMn-fDUtJWv6ggqm_i4g.JPEG%2Fupload_7a34a53d254c06cf9240f8ac12b01655.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_50%2F1640014951911xYfbU_JPEG%2Fupload_72846c3e27e83636fc5315a45bb4ee53.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_238%2F164001495200947VEL_JPEG%2Fupload_438a1fb5d2e2bdf650c5ccc9ae140291.jpeg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_245%2F1640014952265p4T4U_JPEG%2Fupload_74f2d577c28ecb075f4f90f026ffd1f1.jpeg",
      ],

      lati: shop.lati,      // ### 굳이?
      longi: shop.longi,    // ### 굳이?
    };
    const res = await this.postModel.createPost(body);
    console.log("[EditViewModel.createPost]", res);
    const { success } = res;
    return success;
  }


  searchTags(keyWord) {
    // DUMMY
    // shopId, shopName, shopThumbUrl, shopAddress, tags만 필요
    return [
      {
        shopId: 4,
        shopName: "팔달수제맥주",
        shopAddress: "경기 수원시 영통구",
        shopAddressDetail: "경기 수원시 영통구 동수원로537번길 57 (원천동)",
        shopThumbUrl: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200512_270%2F1589240248177WIr4l_JPEG%2FKakaoTalk_Photo_2019-11-15-21-09-35.jpeg",
        tags: [
          { tagType: "food", tagId: 3, tagName: "맥주" }, { tagType: "food", tagId: 4, tagName: "호프" },
        ],
        //lati: 37.275004, longi: 127.045749,
      },
      {
        shopId: 1,
        shopName: "팔달김수산",
        shopAddress: "대구 북구 팔달로",
        shopAddressDetail: "대구 북구 팔달로 139 (노원동3가)",
        shopThumbUrl: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200512_270%2F1589240248177WIr4l_JPEG%2FKakaoTalk_Photo_2019-11-15-21-09-35.jpeg",
        tags: [
          { tagType: "food", tagId: 2, tagName: "마라탕" },
        ],
        //lati: 37.275004, longi: 127.045749,
      },
    ];
  }

}