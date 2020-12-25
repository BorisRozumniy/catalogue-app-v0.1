import axios from "axios";

// import frontendUrls from "routes/frontendUrls";

import { SWITCH_LOGIN_MODAL_OPEN_STATE } from "../redux/constants";

import store from "../redux/store";

// import history from "helpers/history";

import tokenRefreshing from "./tokenRefreshing";

// This is upgraded axios function for handle TOKEN issues with following functionality blocks:
// 1) Get user request in object with fields {method, url, data(optional)}
// method:string ("GET", "POST", "PUT")
// url:string
// data: any type of data that allow XMLHttpRequest
// 2) Attach to the request JWT token from localStorage and make standart axios request
// 2.1) If response is OK/200: return response and exit this function flow
// 2.2) If response has 400 code: trying to take REFRESH token from localStorage,
//   if it not exist, open login window (disscussional)
// 2.3) If REFRESH token exist: make POST request for update user ACCESS token
// 2.4) If server return ACCESS token: trying to make an initial request with a new token with standart flow
//      and record new token to localStorage
// 2.5) If server doesn't return token: reject initial request with error about this problem

const paramsBuilder = (url, params) => {
  if (!params || typeof params !== "object") {
    return url;
  }
  let newUrl = url;
  Object.keys(params).map((key, index) => {
    newUrl += `${index === 0 ? "?" : "&"}${key}=${params[key]}`;
  });
  return newUrl;
};

export default function axiosPlus(requestData) {
  const { method, url, data, params } = requestData;
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    console.log(userData.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
  const newUrl = paramsBuilder(url, params);

  return new Promise((resolve, reject) => {
    axios({ method, url: newUrl, data })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        const {
          response: {
            request: { responseURL },
            data: { code, detail } = {},
          } = {},
        } = error;
        // if (responseURL.includes("maintenance")) {
        //   history.push(frontendUrls.urlMaintenance);
        // }
        // if (detail === "User didn't confirmed their email.") {
        //   history.push(frontendUrls.urlConfirmEmail);
        // }
        //will check this while working on real protected endpoins
        if (code === "token_not_valid") {
          const refreshToken = localStorage.getItem("refreshToken");
          !refreshToken &&
            store.dispatch({
              type: SWITCH_LOGIN_MODAL_OPEN_STATE,
              payload: { forceOpen: true },
            });

          tokenRefreshing()
            .then(() => {
              axios({ method, url, data })
                .then((response) => resolve(response))
                .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
        } else {
          reject(error);
        }
      });
  });
}
