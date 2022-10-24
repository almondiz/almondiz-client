import { SearchModel } from "../models";
import { StaticComponentRefs, filterText } from "../util";


export default class SearchViewModel {
  model;
  constructor(model=(new SearchModel())) { this.model = model; }


  /** 7. TAG API */
  // POST /api/tag
  async createFoodTag(tagName) {
    if ((tagName = filterText(tagName)) === "")   return false;

    const body = { tagName, };
    const { success, ...res } = await this.model.createFoodTag(body);
    if (success) {
      console.log("[SearchViewModel.createFoodTag]", res);
      const { data } = res;
      return data;  
    } else {
      console.error("[SearchViewModel.createFoodTag]", res);
      StaticComponentRefs.toastRef?.current?.error(res.msg);
      return false;
    }
  }
  // GET /api/tag/like/{tagName}
  async searchFoodTag(keyword) {
    if ((keyword = filterText(keyword)) === "")   return [];

    const { success, ...res } = await this.model.searchFoodTag(keyword);
    if (success) {
      console.log("[SearchViewModel.searchFoodTag]", res);
      const { dataList } = res;
      return dataList;
    } else {
      console.error("[SearchViewModel.searchFoodTag]", res);
      StaticComponentRefs.toastRef?.current?.error(res.msg);
      return [];
    }
  }

  // #### API 만들어야 함. (food 태그, region 태그 둘 다 주는 것)
  async searchFullTag(keyword) {
    StaticComponentRefs.toastRef?.current?.error("API가 없습니다.");
    if ((keyword = filterText(keyword)) === "")   return [];

    console.log("[SearchViewModel.searchFullTag]", "DUMMY");
    return SearchViewModel._dummyFullTagResult;
  }
  static _dummyFullTagResult = {
    foods: [
      { tagType: "food", tagId: 14, tagName: "대구" },
    ],
    regions: [
      { tagType: "region", tagId: 1, tagName: "대구" },
      { tagType: "region", tagId: 2, tagName: "대구 남구" },
      { tagType: "region", tagId: 3, tagName: "대구 달서구" },
      { tagType: "region", tagId: 4, tagName: "대구 북구" },
      { tagType: "region", tagId: 5, tagName: "대구 중구" },
    ],
  };

  // #### API 만들어야 함. (검색 기록 가져오기)
  async readSearchHistory() {
    StaticComponentRefs.toastRef?.current?.error("API가 없습니다.");
    console.log("[SearchViewModel.getSearchHistory]", "DUMMY");
    return SearchViewModel._dummySearchHistory;
  }
  // #### API 만들어야 함. (검색 기록 지우기)
  async removeSearchHistory(idx) {
    StaticComponentRefs.toastRef?.current?.error("API가 없습니다.");
    console.log(`[SearchViewModel.removeSearchHistory(${idx})]`, "DUMMY");
    return true;
  }
  static _dummySearchHistory = [
    [
      { tagType: "food", tagId: 1, tagName: "한식" },
      { tagType: "region", tagId: 6, tagName: "서울" },
    ],
    [
      { tagType: "food", tagId: 2, tagName: "짬뽕" },
      { tagType: "region", tagId: 7, tagName: "성남 분당구" }, { tagType: "region", tagId: 8, tagName: "수원 팔달구 우만동" },
    ],
    [
      { tagType: "food", tagId: 3, tagName: "스시" }, { tagType: "food", tagId: 4, tagName: "마라탕" },
      { tagType: "region", tagId: 9, tagName: "천안" },
    ],
  ];

  // #### API 만들어야 함. (shop 검색)
  async searchShop(keyword) {
    StaticComponentRefs.toastRef?.current?.error("API가 없습니다.");
    if ((keyword = filterText(keyword)) === "")   return [];

    console.log("[SearchViewModel.searchShop]", "DUMMY");
    return SearchViewModel._dummyShopResult;
  }
  static _dummyShopResult = [    // shopId, shopName, shopThumbUrl, shopAddress, tags만 필요
    {
      shopId: 4,
      shopName: "팔달수제맥주",
      shopAddress: "경기 수원시 영통구",
      shopAddressDetail: "경기 수원시 영통구 동수원로537번길 57 (원천동)",
      lati: 37.275004, longi: 127.045749,
      shopThumbUrl: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200512_270%2F1589240248177WIr4l_JPEG%2FKakaoTalk_Photo_2019-11-15-21-09-35.jpeg",
      tags: [
        { tagType: "food", tagId: 3, tagName: "맥주" }, { tagType: "food", tagId: 4, tagName: "호프" },
      ],
    },
    {
      shopId: 1,
      shopName: "팔달김수산",
      shopAddress: "대구 북구 팔달로",
      shopAddressDetail: "대구 북구 팔달로 139 (노원동3가)",
      lati: 37.275004, longi: 127.045749,
      shopThumbUrl: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200512_270%2F1589240248177WIr4l_JPEG%2FKakaoTalk_Photo_2019-11-15-21-09-35.jpeg",
      tags: [
        { tagType: "food", tagId: 2, tagName: "마라탕" },
      ],
    },
  ];

  // #### API 만들어야 함. (장소 검색)
  async searchPlace(keyword) {
    if ((keyword = filterText(keyword)) === "")   return [];

    console.log("[SearchViewModel.searchPlace]", "DUMMY");
    return SearchViewModel._dummyPlaceResult;
  }
  static _dummyPlaceResult = [
    {
      placeId: 1,
      placeName: "아주대학교",
      placeAddress: "수원 영통구 원천동",
      placeAddressDetail: "경기 수원시 영통구 월드컵로 206 (원천동)",
      lati: 37.275004, longi: 127.045749,
    },
    {
      placeId: 2,
      placeName: "아주대학교 경영대학원",
      placeAddress: "수원 영통구 원천동",
      placeAddressDetail: "경기 수원시 영통구 월드컵로 206 (원천동)",
      lati: 37.275004, longi: 127.045749,
    },
    {
      placeId: 3,
      placeName: "아주대학교다산관",
      placeAddress: "수원 영통구 원천동",
      placeAddressDetail: "경기 수원시 영통구 월드컵로 206 (원천동)",
      lati: 37.275004, longi: 127.045749,
    },
    {
      placeId: 4,
      placeName: "아주대학교일신관",
      placeAddress: "수원 영통구 원천동",
      placeAddressDetail: "경기 수원시 영통구 월드컵로 206 (원천동)",
      lati: 37.275004, longi: 127.045749,
    },
  ];

  // #### API 만들어야 함. (기존에 설정했던 위치)
  async getPreferedLocationSet() {
    StaticComponentRefs.toastRef?.current?.error("API가 없습니다.");
    const data = SearchViewModel._dummyPreferedLocationSet;
    console.log("[SearchViewModel.getPreferedLocationSet]", data);
    //const { tracking, location, distance } = data;
    return data;
  }
  async setPreferedLocationSet(data) {
    StaticComponentRefs.toastRef?.current?.error("API가 없습니다.");
    console.log("[SearchViewModel.setPreferedLocationSet]", data);
    //const { tracking, location, distance } = data;
    SearchViewModel._dummyPreferedLocationSet = data;
    return true;
  }
  static _dummyPreferedLocationSet = {
    tracking: false,
    location: { lati: 37.275004, longi: 127.045749, address: "성남 분당구 백현동", },
    distance: 15,  // km
  };

  // #### API 만들어야 함. (현재 내가 있는 위치 (GPS))
  async getMyLocation() {
    StaticComponentRefs.toastRef?.current?.error("API가 없습니다.");
    const location = { lati: 37.275004, longi: 127.045749, address: "서울 서초구 잠원동", };
    console.log("[SearchViewModel.getMyLocation]", location);
    return location;
  };
};