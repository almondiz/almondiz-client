import DefaultModel from "./default-model";


export default class UserModel extends DefaultModel {
  /** 1. USER API */
  // GET /api/user
  whoami() {
    return this.callApi(() => this.api.whoami());
  }
  // POST /api/user
  signup(body) {
    return this.callApi(() => this.api.signup(body));
  }
  // POST /api/user/login
  login(providerType, providerUid) {
    return this.callApi(() => this.api.login({ providerType, providerUid }));
  }
  // GET /api/user/{userId}
  get(userId) {
    return this.callApi(() => this.api.get(userId));
  }


  /** 2. FOLLOW API */
  // GET /api/api/followings
  getMyAllFollowings() {
    return this.callApi(() => this.api.getMyAllFollowings());
  }
  // DELETE /api/follow/{followId}
  unfollow(userId) {
    return this.callApi(() => this.api.unfollow(userId));
  }


  /** 3. NOTIFICATION API */
  // GET /api/notifications
  getMyNoticeData() {
    return this.callApi(() => this.api.getMyNoticeData());
  }
  // DELETE /api/notifications
  popNotice(noticeId) {
    return this.callApi(() => this.api.popNotice(noticeId));
  }
  
  



  
  // [DEPRECATED]
  /*data = {
    1: {
      id: 1,

      profile: {
        name: "마제멘 호두",
        thumb: { emoji: "😀", background: "#e1bee7", },
        email: "almondiz.ajou@gmail.com",
      },

      posts: [],                    // 올린 글 (postId)
      subscribing: {                // 이 회원이 구독하는 다른 사용자들 (userId)
        3: "후루룩챱챱",
        4: "맛에진심인편",
      },
      subscribed: [2,],             // 이 회원을 구독하는 다른 사용자들 (userId)
      scrapping: [1,],              // 이 회원이 스크랩한 글 (postId)

      notices: [1, 2,],             // 이 회원한테 간 알림 (noticeId)
    },
    2: {
      id: 2,

      profile: {
        name: "닭발 피스타치오",
        thumb: { emoji: "🙈", background: "#ffcc80", },
        email: "canplane@gmail.com",
      },

      posts: [1,],
      subscribing: {},
      subscribed: [4,],
      scrapping: [],

      notices: [],
    },
    3: {
      id: 3,

      profile: {
        name: "달고나 마카다미아",
        thumb: { emoji: "👾", background: "#b2dfdb", },
        email: "gattenmaster@gmail.com",
      },

      posts: [],
      subscribing: {},
      subscribed: [1,],
      scrapping: [],

      notices: [],
    },
    4: {
      id: 4,

      profile: {
        name: "마라탕 캐슈넛",
        thumb: { emoji: "😀", background: "#cfd8dc", },
        email: "95eksldpf@gmail.com",
      },

      posts: [],
      subscribing: {
        2: "주정뱅이",
      },
      subscribed: [1,],
      scrapping: [1,],

      notices: [],
    },
    5: {
      id: 5,
      
      profile: {
        name: "소바 아몬드",
        thumb: { emoji: "🙈", background: "#cfd8dc", },
        email: "bellflower9904@gmail.com",
      },

      posts: [],
      subscribing: {},
      subscribed: [],
      scrapping: [],

      notices: [],
    },
  };*/
};