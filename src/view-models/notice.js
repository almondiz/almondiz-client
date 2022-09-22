export default class NoticeViewModel {
  constructor(model) { this.model = model; }

  getData(id) { return this.model.getData(id); }

  getMyData(...params) { return this.model.getMyData(...params); }
};