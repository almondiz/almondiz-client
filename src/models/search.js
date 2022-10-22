import DefaultModel from "./default-model";


export default class SearchModel extends DefaultModel {
  /** 0. SEARCH API */
  // POST /api/tag
  createFoodTag(body) {
    return this.callApi(() => this.api.createFoodTag(body));
  }
  // GET /api/tag/like/{tagName}
  async searchFoodTag(tagName) {
    return this.callApi(() => this.api.searchFoodTag(tagName));
  }
};