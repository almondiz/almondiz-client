import { PostModel } from "../models";
import { getMyLocation, getDistance, getTime } from "../util";


export default class PostViewModel {
  model;
  constructor(model=(new PostModel())) { this.model = model; }


  /** 4-0. POST API */
  // GET /api/post/{postId}
  async getPostByPostId(postId) {
    const res = await this.model.getPostByPostId(postId);
    console.log("[PostViewModel.getPostByPostId]", res);
    const { data } = res;

    const myLocation = getMyLocation();
    return this._makePostItemData(data, { myLocation });
  }
  // GET /api/posts
  async getAllPosts() {
    const res = await this.model.getAllPosts();
    console.log("[PostViewModel.getAllPosts]", res);
    const { dataList } = res;

    const myLocation = getMyLocation();
    return dataList.map((data) => this._makePostItemData(data, { myLocation }));
  }
  // GET /api/user/posts
  async getAllPostsByUserId(userId) {
    const res = await this.model.getAllPostsByUserId(userId);
    console.log("[PostViewModel.getAllPostsByUserId]", res);
    const { dataList } = res;

    const myLocation = getMyLocation();
    return dataList.map((data) => this._makePostItemData((data), { myLocation }));
  }
  _makePostItemData(data, { myLocation }) {
    const postId = data.postId;

    const postAuthor = data.user;
    const postAuthorId = postAuthor.userId;
  
    return {
      postId,

      shopThumbUrl: data.shop.thumb,
      shopName: data.shop.shopName,
      shopAddress: data.shop.location.address.split(" ").slice(0, 3).join(" "),     // ### HMM (지번만 필요함. 서버에서 도로명 주지 않도록 해야 할 듯)
      shopAddressDetail: data.shop.location.address,
      shopDistance: `${getDistance(myLocation, data.shop.location)}km`,
      goToShopPage: navigate => (window.location.href = data.shop.link),          // ### FUTURE WORKS

      postTags: data.tags,
      postText: data.text,
      postImages: data.postFileImgUrls.map((url) => ({ url })),
      goToPostPage: navigate => navigate(`/post/${postId}`),
  
      postAuthorId: postAuthorId,
      postAuthorEmoji: postAuthor.thumb.emoji,
      postAuthorName: (() => {
        switch (postAuthor.relation) {
          case "me":
            return "나";
          case "following":
            return postAuthor.alias;
          case "other":
          default:
            return postAuthor.nickName;
        }
      })(),
      postAuthorRelation: postAuthor.relation,
      goToPostAuthorPage: navigate => navigate(`/profile/${postAuthorId}`),

      postCreatedAt: data.createdAt,
      //postCreatedAt: getTime(data.createdAt),
      
      isScrapped: data.scrap,
      scrappedCount: data.scrappedCount,
  
      commentCount: data.commentCount,
      bestCommentText: data.bestComment?.text,
      bestCommentAuthorEmoji: data.bestComment?.user.thumb.emoji,


      scrap: async (b) => {
        const action = this.model[b ? "unscrap" : "scrap"].bind(this.model);
        const success = await action(postId);
        console.log("[postViewModel.scrap]", action, success);
        return success;
      },
    };
  }
};