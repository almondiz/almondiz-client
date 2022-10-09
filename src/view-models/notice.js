import { UserModel } from "../models";


export default class NoticeViewModel {
  constructor(model) { this.model = model; }

  getMyNoticeData() {
    const noticeModel = this.model;

    const userModel = new UserModel();
    const myUserId = userModel.getMyUserId();
    const me = userModel.getMyData();

    const notices = [];
    me.notices.map(noticeId => notices.push(noticeModel.getData(noticeId)));
    notices.reverse();

    return notices.map(notice => {
      return {
        noticeId: notice.id,

        isRead: notice.isRead[myUserId],
        message: notice.message,
        createdAt: notice.createdAt,
      };
    });
  }
};