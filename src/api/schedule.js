import { APP_CONFIG } from "@/config";
import axios from "axios";

export const scheduleApi = {
  create: function (payload) {
    return axios.post(APP_CONFIG.API_URL + "schedule", payload);
  },
  listSchedule: function () {
    return axios.get(APP_CONFIG.API_URL + "schedule");
  },
  delete: function (id) {
    return axios.delete(APP_CONFIG.API_URL + "schedule/" + id);
  },
  getOne: function (id) {
    return axios.get(APP_CONFIG.API_URL + "schedule/" + id);
  },
  update: function (id, payload) {
    return axios.patch(APP_CONFIG.API_URL + "schedule/" + id, payload);
  },
};
