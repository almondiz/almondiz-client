import { SearchModel } from "../models";
import { filterText } from "../util";


export default class SearchViewModel {
  model;
  constructor(model=(new SearchModel())) { this.model = model; }


  /** 7. TAG API */
  // POST /api/tag
  async createTag(tagName) {
    if ((tagName = filterText(tagName)) === "")   return false;

    const body = { tagName, };
    const res = await this.model.createTag(body);
    console.log("[SearchViewModel.createTag]", res);
    const { data } = res;
    return data;
  }
  // GET /api/tag/like/{tagName}
  async searchTag(tagName) {
    if ((tagName = filterText(tagName)) === "")   return false;

    const res = await this.model.searchTag(tagName);
    console.log("[SearchViewModel.searchTag]", res);
    const { dataList } = res;
    return dataList;
  }
};