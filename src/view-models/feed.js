export default class FeedViewModel {
  constructor(model) {
    this.model = model;
  }

  getAllFeedList() {
    return this.model.getAllFeedData();
  }
}