import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
});

const apis: any = {
  get: apiClient.get,
  post: apiClient.post,
  patch: apiClient.patch,
  delete: apiClient.delete
}

const API = (method = "get") => (url: string, body: any = {}, options: any = {}) => {
  //run some checks on method/url;
  return apis[method](url, body, options);
};

export const GET = API();
export const POST = API("post");
export const PATCH = API("patch");
export const DELETE = API("delete");

export const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(() => res, ms);
  });
