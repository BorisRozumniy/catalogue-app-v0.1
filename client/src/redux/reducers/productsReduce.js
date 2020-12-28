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


	[types.POST_REQUEST_CREATE_PRODUCT_START]: state => ({
		...state,
		productsRequestError: {},
		productsRequestLoading: true,
	}),
	[types.POST_REQUEST_CREATE_PRODUCT_SUCCESS]: (state, { payload: { product } }) => {
		const oldProducts = state.productsData;
		oldProducts.push(product);
		return ({
			...state,
			productsData: oldProducts,
			productsRequestLoading: false,
		});
	},
	[types.POST_REQUEST_CREATE_PRODUCT_ERROR]: (state, { payload }) => ({
		...state,
		productsRequestError: payload,
		productsRequestLoading: false,
	}),


	[types.DELETE_REQUEST_REMOVE_PRODUCT_START]: state => ({
		...state,
		productsRequestError: {},
		productsRequestLoading: true,
	}),
	[types.DELETE_REQUEST_REMOVE_PRODUCT_SUCCESS]: (state, { payload: { deletedProduct } }) => {
		const products = state.productsData;
		let removedProductIndex; 
		products.find(({_id}, index) => {
			removedProductIndex = index;
			return deletedProduct._id === _id
		});
		products.splice(removedProductIndex, 1);
		return ({
			...state,
			productsData: products,
			productsRequestLoading: false,
		});
	},
	[types.DELETE_REQUEST_REMOVE_PRODUCT_ERROR]: (state, { payload }) => ({
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
