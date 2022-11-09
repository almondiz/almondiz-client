import { api, path } from "./config";


/** 0. SEARCH API */
// POST /api/tag
export const createFoodTag = body => {
  return api.post(path.tag.default, body);
};
// GET /api/tag/like/{tagName}
export const searchFoodTag = tagName => {
  return api.get(path.tag.search(tagName));
};