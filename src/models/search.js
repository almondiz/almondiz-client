import DefaultModel from "./default-model";


export default class SearchModel extends DefaultModel {
  /** 7. TAG API */
  // POST /api/tag
  createTag(body) {
    return this.callApi(() => this.api.createTag(body));
  }
  // GET /api/tag/like/{tagName}
  async searchTag(tagName) {
    return this.callApi(() => this.api.searchTag(tagName));
  }
};