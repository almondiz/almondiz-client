export default class FeedViewModel {
  constructor(model) {
    this.model = model;
  }

  getAllFeedList() {
    return this.model.getAllFeedData();
  }

  getPost(index) {
    const allFeedData = this.model.getAllFeedData();
    index = Math.max(index, 0);
    index = Math.min(index, allFeedData.length - 1);
    return allFeedData[index];
  }
}