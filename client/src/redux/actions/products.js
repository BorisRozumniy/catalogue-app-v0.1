import axios from "axios";
import backendApiUrls from "../../routes/backendUrls";
import * as types from "../constants";

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

export const actionGetProducts = (headers) => dispatch => {
    dispatch(getProductsStart());
    const config = {
        headers,
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
        // params: id,
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