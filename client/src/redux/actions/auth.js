import axiosPlus from "../../helpers/axiosPlus";
import parseError from "../../helpers/parseError";
import backendApiUrls from "../../routes/backendUrls";
import * as types from "../constants";
const storageName = 'userData'

export const actionPostRegistration = (data) => dispatch => {
    dispatch(postRegistrationStart());
    const config = {
        method: "POST",
        url: backendApiUrls.register,
        data,
    };

    axiosPlus(config)
        .then(response => {
            const { data } = response;
            dispatch(postRegistrationSuccess(data));
        })

        .catch((error) => {
            dispatch(postRegistrationError(parseError(error)));
        });
};

const postRegistrationStart = payload => ({
    type: types.POST_REQUEST_REGISTRATION_START,
    payload,
});

const postRegistrationSuccess = payload => ({
    type: types.POST_REQUEST_REGISTRATION_SUCCESS,
    payload,
});

const postRegistrationError = payload => ({
    type: types.POST_REQUEST_REGISTRATION_ERROR,
    payload,
});


export const actionPostLogin = (data) => dispatch => {
    dispatch(postLoginStart());
    const { email } = data;
    const config = {
        method: "POST",
        url: backendApiUrls.login,
        data,
    };

    axiosPlus(config)
        .then(response => {
            const { userId, token } = response.data;
            dispatch(postLoginSuccess({ email }));
            localStorage.setItem(storageName, JSON.stringify({
                userId, token, email,
            }))
        })

        .catch((error) => {
            dispatch(postLoginError(parseError(error)));
        });
};

const postLoginStart = payload => ({
    type: types.POST_REQUEST_LOGIN_START,
    payload,
});

const postLoginSuccess = payload => ({
    type: types.POST_REQUEST_LOGIN_SUCCESS,
    payload,
});

const postLoginError = payload => ({
    type: types.POST_REQUEST_LOGIN_ERROR,
    payload,
});


export const actionLogout = () => {
    localStorage.removeItem(storageName);

    return {
        type: types.ACTION_LOGOUT,
    };
}
