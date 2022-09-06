export default class UserViewModel {
  constructor(model) {
    this.model = model;
  }

  getUserLocation() {
    return this.model.getUserLocation();
  }
}