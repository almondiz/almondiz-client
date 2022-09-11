export default class UserViewModel {
  constructor(model) {
    this.model = model;
  }

  getData(uid) { return this.model.getData(uid); }
  getMyData() { return this.model.getMyData(); }
}