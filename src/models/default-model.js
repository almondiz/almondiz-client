import * as api from "./apis";
import { StaticComponentRefs } from "../asset/common/controllers";


export default class defaultModel {
  constructor() { this.api = api; }

  async callApi(api) {
    try {
      const res = await api();
      const { data } = res;
      
      if (data?.success === true) {
        console.log("[DefaultModel.callApi]", api, res);
        return data;
      } else {
        console.error("[DefaultModel.callApi]", api, res);
        const errorMessage = "서버에서 오류가 발생했습니다.";
        StaticComponentRefs.toastRef?.current?.error(errorMessage);
        return {};
      }
    } catch (err) {
      console.error("[DefaultModel.callApi]", api, err);

      const errorMessage = (() => {
        switch (err.code) {
          case "ERR_NETWORK":         return "네트워크 연결이 원활하지 않습니다.";
          case "ERR_BAD_RESPONSE":    return "서버에서 오류가 발생했습니다.";
          case "ECONNABORTED":        return "서버가 응답하지 않습니다.";
          default:                    return err.message;
        }
      })();
      StaticComponentRefs.toastRef?.current?.error(errorMessage);
      return {};
      //return err.response.data;
    }
  }
};