import { api, path } from "./config";


/** 7. TAG API */
// POST /api/tag
export const createTag = body => {
  return api.post(path.tag.default, body);
};
// GET /api/tag/like/{tagName}
export const searchTag = tagName => {
  return api.get(path.tag.search(tagName));
};