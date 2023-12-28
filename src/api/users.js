import { APP_CONFIG } from "@/config";
import axios from "axios";

export const userApi = {
  getAll: function () {
    return axios.get(APP_CONFIG.API_URL + "user");
  },
  create: function (payload) {
    return axios.post(APP_CONFIG.API_URL + "user", payload);
  },
  delete: function (id) {
    return axios.delete(APP_CONFIG.API_URL + "user/" + id);
  },
  getOne: function (id) {
    return axios.get(APP_CONFIG.API_URL + "user/" + id);
  },
  update: function (id, payload) {
    return axios.patch(APP_CONFIG.API_URL + "user/" + id, payload);
  },
};
