import DefaultModel from "./default-model";


export default class NoticeModel extends DefaultModel {
  data = {
    1: {
      id: 1,

      createdAt: 1638802800000,
      isRead: {       // key는 이 알림이 전송된 사용자, value는 읽음 여부
        1: true,
      },
      message: `회원님이 "소고" 음식점을 리뷰한 글의 스크랩 수가 100개를 달성했습니다.`,
    },
    2: {
      id: 2,
      
      createdAt: 1663155700000,
      isRead: {
        1: false,
      },
      message: `닭발 피스타치오님이 대댓글을 달았습니다.\n"고마워요 :)"`,
    },
  };

  getData(id) { return this.data[id]; }
};