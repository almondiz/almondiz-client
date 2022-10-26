import { UserModel } from "../models";
import { StaticComponentRefs, getTime } from "../util";


export default class NoticeViewModel {
  userModel;
  constructor(userModel=(new UserModel())) { this.userModel = userModel; }


  /** 3. NOTIFICATION API */
  // GET /api/notifications
  async getMyNoticeData() {
    const { success, ...res } = await this.userModel.getMyNoticeData();
    if (success) {
      console.log("[NoticeViewModel.getMyNoticeData]", res);
      const { dataList } = res;

      return NoticeViewModel._dummyNoticeData; // ###
      
      dataList.reverse();
      return dataList.map(data => this._makeNoticeItemData(data));
    } else {
      console.error("[NoticeViewModel.getMyNoticeData]", res);
      StaticComponentRefs.toastRef?.current?.error(res.msg);
      return false;
    }
  }
  _makeNoticeItemData(data) {
    const noticeId = data.noticeId;

    return {
      noticeId,

      isRead: data.read,    // boolean
      noticeText: data.text,
      noticeCreatedAt: data.createdAt,

      pop: async () => {
        const { res } = await this.userModel.popNotice(noticeId);
        if (res.success) {
          console.log(`[NoticeViewModel.pop]`, res);
          return res.success;
        } else {
          console.error(`[NoticeViewModel.pop]`, res);
          StaticComponentRefs.toastRef?.current?.error(res.msg);
          return null;
        }
      },
    }
  }
  static _dummyNoticeData = [
    {
      noticeId: 1,
      isRead: true,
      noticeText: `회원님이 "소고" 음식점을 리뷰한 글의 스크랩 수가 100개를 달성했습니다.`,
      noticeCreatedAt: getTime(1638802800000),

      pop: () => true,
    },
    {
      noticeId: 2,
      isRead: false,
      noticeText: `닭발 피스타치오님이 대댓글을 달았습니다.\n"고마워요 :)"`,
      noticeCreatedAt: getTime(1663155700000),

      pop: () => true,
    },
  ];
};