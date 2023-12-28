import { APP_CONFIG } from "@/config";
import axios from "axios";

export const brokerApi = {
  getAll: function () {
    return axios.get(APP_CONFIG.API_URL + "broker");
  },
};
