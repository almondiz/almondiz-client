import { api, path } from "./config";

const createPost = body => api.post(path.post.default, body);
const getAllPost = () => api.get(path.post.all);

export { createPost, getAllPost };