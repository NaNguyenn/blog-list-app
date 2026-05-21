import api from "./api";
const baseUrl = "/api/users";

export const getAllUsers = () => {
  const request = api.get(baseUrl);
  return request.then((response) => response.data);
};
