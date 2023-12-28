import { APP_CONFIG } from "@/config";
import axios from "axios";

export const roomApi = {
  getAll: function () {
    return axios.get(APP_CONFIG.API_URL + "room");
  },
  create: function (payload) {
    return axios.post(APP_CONFIG.API_URL + "room", payload);
  },
  delete: function (id) {
    return axios.delete(APP_CONFIG.API_URL + "room/" + id);
  },
  getOne: function (id) {
    return axios.get(APP_CONFIG.API_URL + "room/" + id);
  },
  update: function (id, payload) {
    return axios.patch(APP_CONFIG.API_URL + "room/" + id, payload);
  },
};
