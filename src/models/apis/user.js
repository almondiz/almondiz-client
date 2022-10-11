import { api, path } from "./config";

const signup = body => api.post(path.user.default, body);
const login = body => api.post(path.user.login, body);

export { signup, login };