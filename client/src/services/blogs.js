import api from "./api";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = api.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = (newObject) => {
  const req = api.post(baseUrl, newObject);
  return req.then((res) => res.data);
};

const updateBlog = (id, newObject) => {
  const req = api.put(`${baseUrl}/${id}`, newObject);
  return req.then((res) => res.data);
};

const deleteBlog = (id) => {
  const req = api.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

const addComment = (id, comment) => {
  const req = api.post(`${baseUrl}/${id}/comments`, { comment });
  return req.then((res) => res.data);
};

export default { getAll, createBlog, updateBlog, deleteBlog, addComment };
