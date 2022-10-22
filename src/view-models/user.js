import { UserModel } from "../models";


export default class UserViewModel {
  model;
  constructor(model=(new UserModel())) { this.model = model; }


  /** 1. USER API */
  // POST /api/user
  async signup(body) {
    const { success, ...res } = await this.model.signup(body);
    if (success) {
      console.log("[UserViewModel.signup]", res);
      return res;
    } else {
      console.error("[UserViewModel.signup]", res);
      return false;
    }
  }
  // POST /api/user/login
  async checkAccount({ providerType, providerUid }, goSignup, goMain) {
    const { success, ...res } = await this.model.login(providerType, providerUid);
    if (success) {
      console.log("[UserViewModel.checkAccount]", res);
      const { data } = res;
      goMain(data);
      return res;
    } else {
      console.error("[UserViewModel.checkAccount]", res);
      switch (res.msg) {
        case "해당 계정이 존재하지 않거나 잘못된 계정입니다.":
          goSignup();
          break;
        case "옳지 않은 이메일입니다. 이메일 형식을 확인해주세요":
        default:
          break;
      }
      return false;
    }
  }
  /*async _login(providerType, providerUid) {
    const { success, ...res } = await this.model.login(providerType, providerUid);
    if (success) {
      console.log("[UserViewModel.login]", res);
      return res;
    }
    console.error("[UserViewModel.login]", res);
    return false;
  }*/

  // GET /api/user
  async whoami() {
    const { success, ...res } = await this.model.whoami();
    if (success) {
      console.log("[UserViewModel.whoami]", res);
      const { data } = res;
      return this._makeUserData(data);
    } else {
      console.error("[UserViewModel.whoami]", res);
      return false;
    }
  }
  // GET /api/user/{userId}
  async get(userId) {
    const { success, ...res } = await this.model.get(userId);
    if (success) {
      console.log("[UserViewModel.get]", res);
      const { data } = res;
      return this._makeUserData(data);
    } else {
      console.error("[UserViewModel.get]", res);
      return false;
    }
  }
  _makeUserData(data) {
    const userId = data.userId;
  
    return {
      userId,

      userEmoji: data.thumb.emoji,
      userColor: data.thumb.color,
      userName: (() => {
        switch (data.relation) {
          case "me":
            return data.nickName;
          case "following":
            return data.alias;
          case "other":
          default:
            return data.nickName;
        }
      })(),
      userNameDescription: (() => {
        switch (data.relation) {
          case "me":
            return data.email;
          case "following":
            return data.nickName;
          case "other":
          default:
            return undefined;
        }
      })(),
      userRelation: data.relation,


      // ### FUTURE WORKS
      followedCount: 0,   // 구독자 수
      scrappedCount: 0,   // 스크랩된 수
      postCount: 0,       // 작성 글 수

      // 아래 두 개는 마이 페이지에만 보여지면 됨
      followingCount: 0,
      followingsHead: (() => {    // 내가 구독하는 유저들 중 상위 10개 정도만 받아오기
        if (data.followingsHead)
          return data.followingsHead.map(user => ({
            userEmoji: user.thumb.emoji,
            goToUserPage: navigate => navigate(`/profile/${user.userId}`),
          }))
        else
          return [];
      })(),


      hasUnreadNotices: false,    // ### FUTURE WORKS : 논의 대상
    };
  }


  /** 2. FOLLOW API */
  // GET /api/api/followings
  async getMyAllFollowings() {
    const { success, ...res } = await this.model.getMyAllFollowings();
    if (success) {
      console.log("[UserViewModel.getMyAllFollowings]", res);
      const { dataList } = res;
      return dataList.map(data => this._makeFollowData(data));
    } else {
      console.error("[UserViewModel.getMyAllFollowings]", res);
      return false;
    }
  }
  _makeFollowData(data) {
    const userId = data.userId;

    return {
      userId,
      
      userEmoji: data.thumb.emoji,
      userColor: data.thumb.color,
      userName: data.alias,
      userNameDescription: data.nickName,
    };
  }
};