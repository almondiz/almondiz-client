export default class UserModel {
  static myUid = 1;

  data = {
    1: {
      profile: {
        uid: 1,
        email: "almondiz.ajou@gmail.com",
        name: "마제멘 호두",
        thumb: "https://picsum.photos/id/10/200",
      },
      counts: {
        follower: 0,
        scrap: 5,
        following: 3,
      },
    },
    2: {
      profile: {
        uid: 2,
        thumb: "https://picsum.photos/id/20/200",
        name: "닭발 피스타치오",
        email: "canplane@gmail.com",
        isFollowed: false,
      },
      counts: {
        follower: 1,
        scrap: 2,
        following: 0,
      },
    },
    3: {
      profile: {
        uid: 3,
        email: "gattenmaster@gmail.com",
        name: "달고나 마카다미아",
        thumb: "https://picsum.photos/id/30/200",
        isFollowed: true,
        alias: "후루룩챱챱",
      },
      counts: {
        follower: 7,
        scrap: 21,
        following: 4,
      },
    },
    4: {
      profile: {
        uid: 4,
        email: "95eksldpf@gmail.com",
        name: "마라탕 캐슈넛",
        thumb: "https://picsum.photos/id/40/200",
        isFollowed: false,
      },
      counts: {
        follower: 0,
        scrap: 0,
        following: 1,
      },
    },
    5: {
      profile: {
        uid: 1,
        email: "bellflower9904@gmail.com",
        name: "소바 아몬드",
        thumb: "https://picsum.photos/id/50/200",
        isFollowed: false,
      },
      counts: {
        follower: 0,
        scrap: 0,
        following: 0,
      },
    },
  };

  getData(uid) { return this.data[uid]; }
  getMyData() { return this.data[UserModel.myUid]; }
}