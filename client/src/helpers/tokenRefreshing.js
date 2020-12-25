import axios from "axios";
import store from "../redux/store";
import backendApiUrls from "../routes/backendUrls";
import { actionLogout } from "../redux/actions/auth";

export default function refreshToken() {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("refreshToken")) {
      const data = {
        method: "POST",
        url: backendApiUrls.refresh,
        data: { refresh: localStorage.getItem("refreshToken") },
      };
      axios(data)
        .then((response) => {
          const { data: { access } = {} } = response;
          access && localStorage.setItem("accessToken", access);
          axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
          resolve(access);
        })
        .catch((error) => {
          store.dispatch(actionLogout());
          reject(error);
        });
    }
  });
}
