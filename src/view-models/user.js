import { PostModel, NoticeModel } from "../models";


export default class UserViewModel {
  constructor(model) { this.model = model; }


  getData(id) {
    const res = this.model.getData(id);
    return this._makeUserData(res);
  }
  _makeUserData(user) {
    const userModel = this.model;
    const myUserId = userModel.getMyUserId();
    const userId = user.id;

    const postModel = new PostModel();
    const noticeModel = new NoticeModel();
    
  
    return {
      userId: userId,

      userEmoji: user.profile.thumb.emoji,
      userColor: user.profile.thumb.background,
      userName: (() => {
        if (userId === myUserId)
          return user.profile.name;
        else
          return userModel.getAlias(userId);
      })(),
      userNameDescription: (() => {
        if (userId === myUserId)
          return user.profile.email;
        else if (userModel.isSubscribing(userId))
          return user.profile.name;
        else
          return undefined;
      })(),
      userRelation: (() => {
        if (userId === myUserId)
          return "me";
        else if (userModel.isSubscribing(userId))
          return "following";
        else
            return "other";
      })(),

      scrappedCount: userModel.getSubscribedCount(postModel, userId),
      followedCount: user.subscribed.length,

      // used only in my page
      followingCount: userModel.getSubscribingCount(userId),
      followingEmojis: (() => {
        return Object.keys(user.subscribing).map(userId => userModel.getData(userId).profile.thumb.emoji);
      })(),

      // used only in my page
      hasUnreadNotices: userModel.hasUnreadNotices(noticeModel),
    };
  }
  
  // used only in subscriptions page
  getMyFollowingData() {
    const userModel = this.model;
    const myUserId = userModel.getMyUserId();
    const me = userModel.getData(myUserId);

    return Object.keys(me.subscribing).map(userId => {
      const user = userModel.getData(userId);

      return {
        userId: userId,

        userEmoji: user.profile.thumb.emoji,
        userColor: user.profile.thumb.background,
        userName: userModel.getAlias(userId),
        userNameDescription: user.profile.name,
        userRelation: "following",
      };
    });
  }


  signup(body) {return this.model.signup(body); }
  login(providerType, providerUid) { return this.model.login(providerType, providerUid); }
  async checkAccount({ providerType, providerUid }, goSignup, goMain) {
    const { success, ...result } = await this.login(providerType, providerUid);

    if (!success) {
      switch (result.msg) {
        case "해당 계정이 존재하지 않거나 잘못된 계정입니다.":
          goSignup();
          break;
        case "옳지 않은 이메일입니다. 이메일 형식을 확인해주세요":
          console.error("[login] : ", result.msg);
          break;
        default:
          console.error("[login] : ", result.msg);
          break;
      }
      return;
    }
    console.log("[login] : ", result.data);
    goMain(result.data);
  }
};