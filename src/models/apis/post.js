import { api, path } from "./config";

const writePost = (body) => {
  return api.post(path.post.default, body);
}

const getPostList = () => {
  return api.get(path.post.list);
}

export {
  writePost,
  getPostList,
}