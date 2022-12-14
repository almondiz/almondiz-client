import { UserModel } from "../models";
import { StaticComponentRefs } from "../util";

import { setEmail, setProviderType, setProviderUid, setAccessToken, setRefreshToken, setMyUserId } from "../store/slices/account";


export default class UserViewModel {
  model;
  constructor(model=(new UserModel())) { this.model = model; }


  // log out
  async logout({ dispatch, navigate }) {
    UserViewModel._disconnect({ dispatch });
    navigate(`/`, { state: { message: "로그아웃되었습니다." } });
  }
  // DELETE /api/user
  async withdrawal({ dispatch, navigate }) {
    const res = await this.model.withdrawal();
    switch (res?.success) {
      case true:
        console.log("[UserViewModel.withdrawal]", res);
        UserViewModel._disconnect({ dispatch });
        navigate(`/`, { state: { message: "회원 탈퇴되었습니다. 이용해주셔서 감사합니다." } });
        return true;
      case false:
      default:
        console.error("[UserViewModel.login]", res);
        StaticComponentRefs.toastRef?.current?.error("회원 탈퇴 실패했습니다.");
        return false;
    }
  }
  static _disconnect({ dispatch }) {
    dispatch(setEmail(null));
    dispatch(setProviderType(null)), dispatch(setProviderUid(null));
    dispatch(setAccessToken(null)), dispatch(setRefreshToken(null));
    dispatch(setMyUserId(null));
  }


  /** 1. USER API */
  // POST /api/user/login
  async login(social, { dispatch, navigate }) {
    const res = await this.model.login(social);
    switch (res?.success) {
      case true:
        console.log("[UserViewModel.login]", res);
        UserViewModel._connect(social, res.data, { dispatch });
        navigate(`/`, { state: { message: "로그인되었습니다." } });
        return true;
      case false:
        switch (res.msg) {
          case "해당 계정이 존재하지 않거나 잘못된 계정입니다.":
            navigate(`/signup`, { state: { valid: true, social } });    // #### 오류 코드가 제대로 안 뜨는 거 같은데? 500으로만 되는 거 같은데 뭐지
            break;
          case "옳지 않은 이메일입니다. 이메일 형식을 확인해주세요":
          default:
            break;
        }
      default:
        console.error("[UserViewModel.login]", res);
        StaticComponentRefs.toastRef?.current?.error(res?.msg);
        return false;
    }
  }
  // POST /api/user
  async signup(social, profile, { dispatch, navigate }) {
    const body = { ...social, ...profile };
    const res = await this.model.signup(body);
    switch (res?.success) {
      case true:
        console.log("[UserViewModel.signup]", res);
        UserViewModel._connect(social, res.data, { dispatch });
        navigate(`/`, { state: { message: "회원 가입되었습니다." } });
        return true;
      case false:
      default:
        console.error("[UserViewModel.signup]", res);
        StaticComponentRefs.toastRef?.current?.log("회원 가입 실패했습니다.");
        return false;
    }
  }
  static _connect(social, resData, { dispatch }) {
    const { providerType, providerUid, email, raw } = social;
    const { token: { accessToken, refreshToken }, userId } = resData;

    if (!(providerType && providerType && email))   throw new Error();
    if (!(accessToken && refreshToken && userId))   throw new Error();
    dispatch(setProviderType(providerType)), dispatch(setProviderUid(providerUid)), dispatch(setEmail(email));
    dispatch(setAccessToken(accessToken)), dispatch(setRefreshToken(refreshToken)), dispatch(setMyUserId(userId));
  }


  // GET /api/user
  async whoami() {
    const { success, ...res } = await this.model.whoami();
    if (success) {
      console.log("[UserViewModel.whoami]", res);
      const { data } = res;
      return this._makeUserData(data);
    } else {
      console.error("[UserViewModel.whoami]", res);
      StaticComponentRefs.toastRef?.current?.error(res.msg);
      return {};
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
      StaticComponentRefs.toastRef?.current?.error(res.msg);
      return {};
    }
  }
  _makeUserData(data) {
    try {
      const userId = data.userId;

      //data.relation = "me";   // ### DUMMY
      //data.alias = "곰돌이 푸";   // ### DUMMY
      const userRelation = data.relation;   // "me" | "following" | "other"

      return {
        userId,

        userEmoji: data.thumb.emoji,
        userColor: data.thumb.color,
        userOriginalName: data.nickName,
        userName: (() => {
          switch (userRelation) {
            case "me":          return data.nickName;
            case "following":   return data.alias;
            case "other":
            default:            return data.nickName;
          }
        })(),
        userNameDescription: (() => {
          switch (userRelation) {
            case "me":          return data.email;
            case "following":   return data.nickName;
            case "other":
            default:            return undefined;
          }
        })(),
        userNameBadge: (() => {
          switch (userRelation) {
            case "me":          return "나";
            case "following":   return "구독";
            case "other":
            default:            return undefined;
          }
        })(),
        userRelation,


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
              goToUserPage: navigate => navigate(`/user/${user.userId}`),
            }))
          else
            return [];
        })(),


        hasUnreadNotices: false,    // ### FUTURE WORKS : 논의 대상
      };
    } catch (err) {
      console.error("[UserViewModel._makeUserData]", err, data);
      StaticComponentRefs.toastRef?.current?.error("데이터 형식이 잘못되었습니다.");
      return {};
    }
  }


  /** 2. FOLLOW API */
  // GET /api/api/followings
  async getMyAllFollowings() {
    const { success, ...res } = await this.model.getMyAllFollowings();
    if (success) {
      console.log("[UserViewModel.getMyAllFollowings]", res);
      const { dataList } = res;

      //return UserViewModel._dummyAllFollowingsData; // ###

      return dataList.map(data => this._makeFollowingData(data));
    } else {
      console.error("[UserViewModel.getMyAllFollowings]", res);
      StaticComponentRefs.toastRef?.current?.error(res.msg);
      return [];
    }
  }
  _makeFollowingData(data) {
    try {
      const userId = data.userId;

      return {
        userId,
        
        userEmoji: data.thumb.emoji,
        userColor: data.thumb.color,
        userName: data.alias,
        userNameDescription: data.nickName,

        unfollow: async () => (await this.unfollow(userId)),
      };
    } catch (err) {
      console.error("[UserViewModel._makeFollowData]", err, data);
      StaticComponentRefs.toastRef?.current?.error("데이터 형식이 잘못되었습니다.");
      return {};
    }
  }
  static _dummyAllFollowingsData = [
    {
      userId: 142,
      userEmoji: "🤔",
      userColor: "#ef9a9a",
      userName: "곰돌이푸",
      userNameDescription: "닭발 피스타치오",

      unfollow: () => true,
    },
    {
      userId: 240,
      userEmoji: "1️⃣",
      userColor: "#9fa8da",
      userName: "아이조아죽겠어",
      userNameDescription: "마제멘 호두",

      unfollow: () => true,
    },
  ];
  
  // POST /api/follow
  async follow(userId, alias) {
    const body = { followeeId: userId, alias, };
    const { success, ...res } = await this.model.follow(body);
    if (success) {
      console.log(`[UserViewModel.follow]`, res);
      return success;
    } else {
      console.error(`[UserViewModel.follow]`, res);
      return false;
    }
  }
  // DELETE /api/follow/{followId}
  async unfollow(userId) {
    const { success, ...res } = await this.model.unfollow(userId);
    if (success) {
      console.log(`[UserViewModel.unfollow]`, res);
      return success;
    } else {
      console.error(`[UserViewModel.unfollow]`, res);
      return false;
    }
  }
  // PATCH /api/api/follow
  async changeAlias(userId, alias) {
    const body = { followeeId: userId, alias, };
    const { success, ...res } = await this.model.changeAlias(body);
    if (success) {
      console.log(`[UserViewModel.changeAlias]`, res);
      return success;
    } else {
      console.error(`[UserViewModel.changeAlias]`, res);
      return false;
    }
  }
};