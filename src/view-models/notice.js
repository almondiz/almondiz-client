import { UserModel } from "../models";


export default class NoticeViewModel {
  userModel;
  constructor(userModel=(new UserModel())) { this.userModel = userModel; }


  /** 3. NOTIFICATION API */
  // GET /api/notifications
  async getMyNoticeData() {
    const res = await this.userModel.getMyNoticeData();
    console.log("[NoticeViewModel.getMyNoticeData]", res);
    const { dataList } = res;

    dataList.reverse();
    return dataList.map(data => this._makeNoticeItemData(data));
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