export default class UserViewModel {
  constructor(model) {
    this.model = model;
  }

  getData(uid) { return this.model.getData(uid); }
  getMyData() { return this.model.getMyData(); }

  signup(body) {
    return this.model.signup(body);
  }
  login(email) {
    return this.model.login(email);
  }
  async checkAccount(email, goSignup, goMain) {
    const { success, ...result } = await this.login(email);

    if (!success) {
      switch (result.msg) {
        case "해당 계정이 존재하지 않거나 잘못된 계정입니다.":
          goSignup();
          break;
        case "옳지 않은 이메일입니다. 이메일 형식을 확인해주세요":
          console.log(result.msg);
          break;
        default:
          console.log(result.msg);
          break;
      }
      return;
    }
    goMain(result.data);
  }
}