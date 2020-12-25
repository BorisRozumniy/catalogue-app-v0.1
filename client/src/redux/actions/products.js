import axiosPlus from "../../helpers/axiosPlus";
import backendApiUrls from "../../routes/backendUrls";
import * as types from "../constants";

const getProductsStart = (payload) => ({
  type: types.GET_REQUEST_PRODUCTS_START,
  payload,
});

const getProductsSuccess = (payload) => ({
  type: types.GET_REQUEST_PRODUCTS_SUCCESS,
  payload,
});

const getProductsError = (payload) => ({
  type: types.GET_REQUEST_PRODUCTS_ERROR,
  payload,
});

const deleteProductStart = (payload) => ({
  type: types.DELETE_REQUEST_PRODUCTS_START,
  payload,
});

const deleteProductSuccess = (payload) => ({
  type: types.DELETE_REQUEST_PRODUCTS_SUCCESS,
  payload,
});

const deleteProductError = (payload) => ({
  type: types.DELETE_REQUEST_PRODUCTS_ERROR,
  payload,
});

const patchProductStart = (payload) => ({
  type: types.PATCH_REQUEST_PRODUCTS_START,
  payload,
});

const patchProductSuccess = (payload) => ({
  type: types.PATCH_REQUEST_PRODUCTS_SUCCESS,
  payload,
});

const patchProductError = (payload) => ({
  type: types.PATCH_REQUEST_PRODUCTS_ERROR,
  payload,
});

export const actionSetEditingProduct = (payload) => ({
  type: types.SET_EDITING_PRODUCT,
  payload,
});

export const actionClearProducts = () => ({
  type: types.CLEAR_PRODUCTS,
});

export const actionGetProducts = () => (dispatch) => {
  dispatch(getProductsStart());
  const config = {
    method: "GET",
    url: backendApiUrls.products,
  };

  axiosPlus(config)
    .then((response) => {
      const { data } = response;
      dispatch(getProductsSuccess(data));
    })

    .catch((error) => {
      dispatch(getProductsError(error));
    });
};

const postCreateProductStart = (payload) => ({
  type: types.POST_REQUEST_CREATE_PRODUCT_START,
  payload,
});

const postCreateProductSuccess = (payload) => ({
  type: types.POST_REQUEST_CREATE_PRODUCT_SUCCESS,
  payload,
});

const postCreateProductError = (payload) => ({
  type: types.POST_REQUEST_CREATE_PRODUCT_ERROR,
  payload,
});

export const actionPostCreateProduct = (data) => (dispatch) => {
  dispatch(postCreateProductStart());
  const config = {
    method: "POST",
    url: backendApiUrls.generate,
    data
  };

  axiosPlus(config)
    .then((response) => {
      const { data } = response;
      dispatch(postCreateProductSuccess(data));
    })

    .catch((error) => {
      dispatch(postCreateProductError(error));
    });
};

export const actionDeleteProduct = (id) => (dispatch) => {
  dispatch(deleteProductStart());
  const config = {
    method: "DELETE",
    url: `${backendApiUrls.products}${id}`,
  };

  axiosPlus(config)
    .then((response) => {
      const { data } = response;
      dispatch(deleteProductSuccess(data));
    })

    .catch((error) => {
      dispatch(deleteProductError(error));
    });
};

export const actionPatchProduct = (data) => (dispatch) => {
  dispatch(patchProductStart());
  const config = {
    method: "PATCH",
    url: `${backendApiUrls.products}${data._id}`,
    data,
  };

  axiosPlus(config)
    .then((response) => {
      const { data } = response;
      dispatch(patchProductSuccess(data));
    })

    .catch((error) => {
      dispatch(patchProductError(error));
    });
};
