import { UserModel } from "../models";


export default class UserViewModel {
  model;
  constructor(model=(new UserModel())) { this.model = model; }


  /** 1. USER API */
  // POST /api/user
  signup(body) {
    return this.model.signup(body);
  }
  // POST /api/user/login
  login(providerType, providerUid) {
    return this.model.login(providerType, providerUid);
  }
  async checkAccount({ providerType, providerUid }, goSignup, goMain) {
    const { success, ...result } = await this.login(providerType, providerUid);

    if (!success) {
      switch (result.msg) {
        case "해당 계정이 존재하지 않거나 잘못된 계정입니다.":
          goSignup();
          break;
        case "옳지 않은 이메일입니다. 이메일 형식을 확인해주세요":
          console.error("[login]", result.msg);
          break;
        default:
          console.error("[login]", result.msg);
          break;
      }
      return;
    }
    console.log("[login] : ", result.data);
    goMain(result.data);
  }

  // GET /api/user
  async whoami() {
    const res = await this.model.whoami();
    console.log("[UserViewModel.whoami]", res);
    const { data } = res;
    return this._makeUserData(data);
  }
  // GET /api/user/{userId}
  async get(userId) {
    const res = await this.model.get(userId);
    console.log("[UserViewModel.get]", res);
    const { data } = res;
    return this._makeUserData(data);
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
    const res = await this.model.getMyAllFollowings();
    console.log("[UserViewModel.getMyAllFollowings]", res);
    const { dataList } = res;
    return dataList.map(data => this._makeFollowData(data));
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