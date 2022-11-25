import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3020/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    withCredentials: true,
    mode: "no-cors",
  },
});

export const get = async (url, option = {}) => {
  const response = await request.get(url, option);

  return response.data;
};

export const post = async (url, data = {}, token, isFormFile = true) => {
  let option = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": isFormFile
            ? "multipart/form-data; boundary=MyBoundary"
            : "application/json",
        },
      }
    : {};
  const response = await request.post(url, data, option);

  return response.data;
};

export const del = async (url, token) => {
  let option = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data; boundary=MyBoundary",
        },
      }
    : {};
  const response = await request.delete(url, option);

  return response.data;
};

export const put = async (url, data, token, isFormFile = true) => {
  let option = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": isFormFile
            ? "multipart/form-data; boundary=MyBoundary"
            : "application/json",
        },
      }
    : {};
  const response = await request.put(url, data, option);

  return response.data;
};

export default request;
