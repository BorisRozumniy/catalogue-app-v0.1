import axios from "axios";
import backendApiUrls from "../../routes/backendUrls";
import * as types from "../constants";
const storageName = 'userData'

const getProductsStart = payload => ({
    type: types.GET_REQUEST_PRODUCTS_START,
    payload,
});

const getProductsSuccess = payload => ({
    type: types.GET_REQUEST_PRODUCTS_SUCCESS,
    payload,
});

const getProductsError = payload => ({
    type: types.GET_REQUEST_PRODUCTS_ERROR,
    payload,
});

const deleteProductStart = payload => ({
    type: types.DELETE_REQUEST_PRODUCTS_START,
    payload,
});

const deleteProductSuccess = payload => ({
    type: types.DELETE_REQUEST_PRODUCTS_SUCCESS,
    payload,
});

const deleteProductError = payload => ({
    type: types.DELETE_REQUEST_PRODUCTS_ERROR,
    payload,
});

const patchProductStart = payload => ({
    type: types.PATCH_REQUEST_PRODUCTS_START,
    payload,
});

const patchProductSuccess = payload => ({
    type: types.PATCH_REQUEST_PRODUCTS_SUCCESS,
    payload,
});

const patchProductError = payload => ({
    type: types.PATCH_REQUEST_PRODUCTS_ERROR,
    payload,
});

export const actionSetEditingProduct = payload => ({
    type: types.SET_EDITING_PRODUCT,
    payload,
});

export const actionClearProducts = () => ({
    type: types.CLEAR_PRODUCTS,
});

export const actionGetProducts = () => dispatch => {
    dispatch(getProductsStart());
    const userData = JSON.parse(localStorage.getItem(storageName))
    const config = {
        headers: {Authorization: `Bearer ${userData.token}`},
        method: "GET",
        url: backendApiUrls.products,
    };

    axios(config)
        .then(response => {
            const { data } = response;
            dispatch(getProductsSuccess(data));
        })

        .catch((error) => {
            dispatch(getProductsError(error));
        });
};

export const actionDeleteProduct = (id, headers) => dispatch => {
    dispatch(deleteProductStart());
    const config = {
        headers,
        method: "DELETE",
        url: `${backendApiUrls.products}${id}`,
    };

    axios(config)
        .then(response => {
            const { data } = response;
            dispatch(deleteProductSuccess(data));
        })

        .catch((error) => {
            dispatch(deleteProductError(error));
        });
};

export const actionPatchProduct = (data, headers) => dispatch => {
    dispatch(patchProductStart());
    const config = {
        headers,
        method: "PATCH",
        url: `${backendApiUrls.products}${data._id}`,
        data,
    };

    axios(config)
        .then(response => {
            const { data } = response;
            dispatch(patchProductSuccess(data));
        })

        .catch((error) => {
            dispatch(patchProductError(error));
        });
};