import * as api from "./apis";


export default class defaultModel {
  constructor() { this.api = api; }

  async callApi(api) {
    try {
      const res = await api();
      console.log("[callApi]", res);
      const { data } = res;
      return data;
    } catch (e) {
      console.error("[callApi]", e);
      return e.response.data;
    }
  }
};