import * as types from "../constants";

import createReducer from "../createReducer";

const initialState = {
	productsData: [],
	productsRequestError: {},
	productsRequestLoading: false,
	editingProduct: {},
};

const productsReducer = createReducer(initialState)({
	[types.GET_REQUEST_PRODUCTS_START]: state => ({
		...state,
		productsRequestError: {},
		productsRequestLoading: true,
	}),
	[types.GET_REQUEST_PRODUCTS_SUCCESS]: (state, { payload }) => ({
		...state,
		productsData: payload,
		productsRequestLoading: false,
	}),
	[types.GET_REQUEST_PRODUCTS_ERROR]: (state, { payload }) => ({
		...state,
		productsRequestError: payload,
		productsRequestLoading: false,
	}),
	[types.SET_EDITING_PRODUCT]: (state, { payload }) => ({
		...state,
		editingProduct: payload,
	}),
});

export default productsReducer;
