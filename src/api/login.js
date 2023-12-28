import { APP_CONFIG } from "@/config";
import axios from "axios";

export const loginApi = {
  login: function (payload, login) {
    axios
      .post(APP_CONFIG.API_URL + "auth/login", payload)
      .then((response) => {
        console.log(response);
        if (response.data) {
          // Setting cookie for later
          login.$cookies.set("jwt-token", response.data.access_token);

          // Set global authorization
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.access_token;

          // Redirect
          login.$router.push({ path: "schedule-list" });
        } else {
          login.$notify({
            message: response.data.message,
            icon: "add_alert",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        login.$notify({
          message: error.response.data.message,
          icon: "add_alert",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger",
        });
      });
  },
  me: async function (component) {
    await axios.get(APP_CONFIG.API_URL + "user/me").then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => {
        component.$notify({
          message: "Sessão Expirou",
          icon: "add_alert",
          verticalAlign: "right",
          horizontalAlign: "top",
          type: "info",
        });

        component.$router.push({ path: "/" });
      });
  },
};
