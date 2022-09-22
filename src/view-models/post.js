export default class PostViewModel {
  constructor(model) { this.model = model; }

  getData(id) { return this.model.getData(id); }
  
  getDummyData(...params) { return this.model.getDummyData(...params); }

  getCommentCount(...params) { return this.model.getCommentCount(...params); }
};