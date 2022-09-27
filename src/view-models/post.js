export default class PostViewModel {
  constructor(model) { this.model = model; }

  getData(id) { return this.model.getData(id); }
  
  getDummyData(...params) { return this.model.getDummyData(...params); }

  getCommentCount(...params) { return this.model.getCommentCount(...params); }

  async getAllPosts() {
    const { dataList } = await this.model.getAllPosts();

    dataList.map(data => {
      data.shop = data.store;
      data.shop.shopName = data.store.storeName;
      data.shop.link = "null";
      data.shop.thumb = "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200512_270%2F1589240248177WIr4l_JPEG%2FKakaoTalk_Photo_2019-11-15-21-09-35.jpeg";
      data.scrappedCount = 3;
      data.commentCount = 0;
      data.user.background = "#ffcc80";
      data.user.emoji = "🙈";
      if (data.bestComment) {
        data.bestComment.user.background = "#ffcc80";
        data.bestComment.user.emoji = "🙈";
        data.commentCount = 3;
      }
    });

    return dataList;
  }
};