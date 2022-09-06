export default class FeedViewModel {
  constructor(model) {
    this.model = model;
  }

  getAllFeedList() {
    console.log(this.model)
    return this.model.getAllFeedData();
  }
}