export default class UserModel {
  static myUid = 1;

  data = {
    1: {
      profile: {
        uid: 1,
        email: "almondiz.ajou@gmail.com",
        name: "마제멘 호두",
        thumb: {
          emoji: "😀",
          background: "#e1bee7",
        },
      },
      counts: {
        follower: 0,
        scrap: 5,
        following: 3,
        post: 0,
      },
    },
    2: {
      profile: {
        uid: 2,
        name: "닭발 피스타치오",
        email: "canplane@gmail.com",
        thumb: {
          emoji: "🙈",
          background: "#ffcc80",
        },
        isFollowed: false,
      },
      counts: {
        follower: 1,
        scrap: 2,
        following: 0,
        post: 1,
      },
    },
    3: {
      profile: {
        uid: 3,
        email: "gattenmaster@gmail.com",
        name: "달고나 마카다미아",
        thumb: {
          emoji: "👾",
          background: "#b2dfdb",
        },
        isFollowed: true,
        alias: "후루룩챱챱",
      },
      counts: {
        follower: 7,
        scrap: 21,
        following: 4,
        post: 3,
      },
    },
    4: {
      profile: {
        uid: 4,
        email: "95eksldpf@gmail.com",
        name: "마라탕 캐슈넛",
        thumb: {
          emoji: "😀",
          background: "#cfd8dc",
        },
        isFollowed: false,
      },
      counts: {
        follower: 0,
        scrap: 0,
        following: 1,
        post: 0,
      },
    },
    5: {
      profile: {
        uid: 1,
        email: "bellflower9904@gmail.com",
        name: "소바 아몬드",
        thumb: {
          emoji: "🙈",
          background: "#cfd8dc",
        },
        isFollowed: false,
      },
      counts: {
        follower: 0,
        scrap: 0,
        following: 0,
        post: 0,
      },
    },
  };

  getData(uid) { return this.data[uid]; }
  getMyData() { return this.data[UserModel.myUid]; }
}