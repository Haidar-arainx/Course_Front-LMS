import axios from "axios";
import { base_url, COURSE_URL } from './base_url';
import { TOKEN } from "./defaultValues";

export const postRequestFunc = async (uri, data) => {
  return axios.post(`${base_url}/${uri}`, data);
};

export const getRequestFunc = async (uri) => {
  return axios.get(`${base_url}/${uri}`);
};
export const GetRequestApi = async (uri) => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'x-api-key':
        'TAsYqfMUcZx0figDl5U4FQ6SIPLlljlmkPE6tk5LAvROzxj4ZNLQDEqAhat4wlrE',
    },
  };
  return axios.get(`${COURSE_URL}/${uri}` ,config);
};
export const PostRequestApi = async (uri, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'x-api-key':
        'TAsYqfMUcZx0figDl5U4FQ6SIPLlljlmkPE6tk5LAvROzxj4ZNLQDEqAhat4wlrE',
    },
  };

  return axios.post(`${COURSE_URL}/${uri}`, data, config);
};
export const GetRequestApiWithouttoken = async (uri) => {
  return axios.get(`${COURSE_URL}/${uri}`);
};