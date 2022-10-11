import DefaultModel from "./default-model";


export default class PostModel extends DefaultModel {
  data = {
    1: {
      id: 1,
      createdAt: 1660993200000,
      userId: 2,
      shop: {
        name: "팔달수제맥주",
        thumb: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200512_270%2F1589240248177WIr4l_JPEG%2FKakaoTalk_Photo_2019-11-15-21-09-35.jpeg",
        location: { address: "수원 영통구 원천동", lati: 37.275004, longi: 127.045749, },
        link: "https://map.naver.com/v5/search/%ED%8C%94%EB%8B%AC%EC%88%98%EC%A0%9C%EB%A7%A5%EC%A3%BC/place/36786112?c=14136086.2802149,4478566.8609065,12,0,0,0,dh&placePath=%3Fentry%253Dbmp",
      },
      tags: [ "맥주", "호프" ],
      content: {
        text: `아주대 근처에 있는 팔달수제맥주.
테이블 3~4개 있는 조그만 가게. 주방이랑 손님석 구분이 없어서 신기.
다음에 또 와야겠다.`,
        images: [
          "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200512_270%2F1589240248177WIr4l_JPEG%2FKakaoTalk_Photo_2019-11-15-21-09-35.jpeg",
          "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20160222_124%2F1456108689766cGsT8_JPEG%2F176172516828220_1.jpeg",
          "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20160222_65%2F1456108689887hMVWw_JPEG%2F176172516828220_2.jpeg",
          "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMjA4MDVfMTg1%2FMDAxNjU5NjU1NjY2MDY0.9OVwKR1z4PPRPc261Bm6s7uijG0StPCpIjmpGNTN7gog.k3_zLr9zb9AO4HIUhxSAEAMHwMn-fDUtJWv6ggqm_i4g.JPEG%2Fupload_7a34a53d254c06cf9240f8ac12b01655.jpeg",
          "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_50%2F1640014951911xYfbU_JPEG%2Fupload_72846c3e27e83636fc5315a45bb4ee53.jpeg",
          "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_238%2F164001495200947VEL_JPEG%2Fupload_438a1fb5d2e2bdf650c5ccc9ae140291.jpeg",
          "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_245%2F1640014952265p4T4U_JPEG%2Fupload_74f2d577c28ecb075f4f90f026ffd1f1.jpeg",
        ],
      },

      comments: [
        {
          id: 1,
          createdAt: 1660993260000,
          userId: 3,
          content: `나만의 작은 가게였는데 글 내려주세요.나만의 작은 가게였는데 글 내려주세요.나만의 작은 가게였는데 글 내려주세요.내려`,
          liked: [],        // 이 댓글을 좋아하는 사용자들 (userId)
          reply: [
            {
              id: 2,
              createdAt: 1660993320000,
              userId: 2,
              content: `유감이네용유감이네용유감이네용유감이네용유감이네용유감이네용유감이네용유감이네용유감이네용`,
              liked: [1, 4,],
            },
            {
              id: 3,
              createdAt: 1660993330000,
              userId: 2,
              content: `ㅋ`,
              liked: [],
            },
            {
              id: 4,
              createdAt: 1661993350000,
              userId: 3,
              content: `미친놈인가...🤔`,
              liked: [4],
            },
          ],
        },
        {
          id: 5,
          createdAt: 1662700320000,
          userId: 1,
          content: `이 글 보고 걸렀습니다`,
          liked: [],
          reply: [],
        }
      ],
      bestCommentIndex: 0,
      scrapped: [1, 4],             // 이 글을 스크랩하는 사용자들 (userId)
    },
  };

  getData(id) { return this.data[id]; }
  
  getDummyData() { return [ this.data[1], this.data[1], ]; }
  getAllPost() { return this.callApi(() => this.api.getAllPost()); }

  getCommentCount(id) {
    let count = 0;
    this.data[id].comments.map(comment => count += 1 + comment.reply.length);
    return count;
  }

  createPost(body) {
    return this.callApi(() => this.api.createPost(body));
  }
};