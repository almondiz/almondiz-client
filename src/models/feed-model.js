export default class FeedModel {
  getDummyData() {
    return {
      createdAt: 1660993200000,
      profile: {
        name: "닭발 피스타치오",
        thumb: "https://picsum.photos/200",
        link: "<PROFILE LINK>",
        isFollower: false,
      },
      shop: {
        name: "팔달수제맥주",
        thumb: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200512_270%2F1589240248177WIr4l_JPEG%2FKakaoTalk_Photo_2019-11-15-21-09-35.jpeg",
        location: {
          address: "수원 영통구 원천동",
          lat: 37.275004,
          lng: 127.045749,
        },
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
      reaction: {
        comments: [
          {
            createdAt: 1660993260000,
            profile: {
              name: "후루룩챱챱",
              thumb: "https://picsum.photos/200",
              link: "<PROFILE LINK>",
              isFollower: true,
            },
            content: `나만의 작은 가게였는데 글 내려주세요.`,
            likeCount: 2,
            reply: [
              {
                createdAt: 1660993320000,
                profile: {
                  name: "닭발 피스타치오",
                  thumb: "https://picsum.photos/200",
                  link: "<PROFILE LINK>",
                  isFollower: false,
                },
                content: `유감입니다`,
                likeCount: 0,
              },
            ],
          },
          {
            createdAt: 1662700320000,
            profile: {
              name: "마라탕 아몬드",
              thumb: "https://picsum.photos/200",
              link: "<PROFILE LINK>",
              isFollower: false,
            },
            content: `굿`,
            likeCount: 0,
            reply: [],
          }
        ],
        commentCount: 3,
        scrapCount: 7,
      },
    }
  }
  getAllFeedData() {
    return [
      this.getDummyData(),
      this.getDummyData(),
      this.getDummyData(),
    ]
  }
}