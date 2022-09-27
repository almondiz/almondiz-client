import { api, path } from "./config";


const getAllPosts = () => api.get(path.post.all);
const getOnePost = (id) => api.get(path.post.one(id));

export { getAllPosts, getOnePost };