import * as api from "./apis";

export default class defaultModel {
  constructor() {
    this.api = api;
  }

  async callApi(api) {
    try {
      const { data } = await api();
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
}