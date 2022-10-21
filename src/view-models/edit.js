import { PostModel } from "../models";

export default class EditViewModel {
  constructor() {
    this.postModel = new PostModel();
  }

  async createPost(body) {
    await this.postModel.createPost(body);
  }

  searchTags(keyWord) {
    // dummy
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