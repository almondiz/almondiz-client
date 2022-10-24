import { UserModel } from "../models";
import { StaticComponentRefs } from "../util";


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
    }
  }
};