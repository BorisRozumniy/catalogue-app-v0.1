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
	[types.PATCH_REQUEST_UPDATE_PRODUCT_START]: state => ({
		...state,
		productsRequestError: {},
		productsRequestLoading: true,
	}),
	[types.PATCH_REQUEST_UPDATE_PRODUCT_SUCCESS]: (state, { payload: { editedProduct } }) => {
		const newProducts = state.productsData.map(product => {
			if(product._id === editedProduct._id)
				return editedProduct;
			return product;
		});

		return ({
			...state,
			productsData: newProducts,
			productsRequestLoading: false,
		});
	},
	[types.PATCH_REQUEST_UPDATE_PRODUCT_ERROR]: (state, { payload }) => ({
		...state,
		productsRequestError: payload,
		productsRequestLoading: false,
	}),
	[types.SET_EDITING_PRODUCT]: (state, { payload }) => ({
		...state,
		editingProduct: payload,
	}),
	[types.CLEAR_PRODUCTS]: (state) => ({
		...state,
		productsData: [],
	}),
});

export default productsReducer;
