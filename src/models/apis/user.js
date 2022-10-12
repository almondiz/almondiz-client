import { api, path } from "./config";

export const signup = body => api.post(path.user.default, body);
export const login = body => api.post(path.user.login, body);