import DefaultModel from "./default-model";


export default class UserModel extends DefaultModel {
  static myUserId = 1;

  data = {
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
  };

  getSubscribingCount(id=this.getMyUserId()) { return Object.keys(this.data[id].subscribing).length; }
  getSubscribedCount(postViewModel, id=this.getMyUserId()) {
    let count = 0;
    this.data[id].posts.map(postId => count += postViewModel.getData(postId).scrapped.length);
    return count;
  }

  getMyUserId() { return UserModel.myUserId; }

  isSubscribing(dst, src=this.getMyUserId()) {
    return this.data[src].subscribing.hasOwnProperty(dst);
  }
  getAlias(dst, src=this.getMyUserId()) {
    if (this.isSubscribing(dst, src))
      return this.data[src].subscribing[dst];
    if (dst)
      return this.data[dst].profile.name;
    return "";
  }

  hasUnreadNotices(noticeViewModel, id=this.getMyUserId()) {
    const notices = this.data[id].notices;
    for (let i = 0; i < notices.length; i++)
      if (!noticeViewModel.getData(notices[i]).isRead[id])
        return true;
    return false;
  }

  getData(id=this.getMyUserId()) { return this.data[id]; }
  getMyData() { return this.data[this.getMyUserId()]; }

  signup(body) { return this.callApi(() => this.api.signup(body)); }
  login(userEmail) { return this.callApi(() => this.api.login({ userEmail })); }
};