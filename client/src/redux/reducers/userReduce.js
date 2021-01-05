import * as types from "../constants";

import createReducer from "../createReducer";

const initialState = {
	email: '',
	userRequestError: {},
	userRequestLoading: false,
};

const userReduce = createReducer(initialState)({
	[types.POST_REQUEST_REGISTRATION_START]: state => ({
		...state,
		userRequestError: {},
		userRequestLoading: true,
	}),
	[types.POST_REQUEST_REGISTRATION_SUCCESS]: (state, { payload }) => ({
		...state,
		userRegistration: payload,
		userRequestLoading: false,
	}),
	[types.POST_REQUEST_REGISTRATION_ERROR]: (state, { payload }) => ({
		...state,
		userRequestError: payload,
		userRequestLoading: false,
	}),

	[types.POST_REQUEST_LOGIN_START]: state => ({
		...state,
		userRequestError: {},
		userRequestLoading: true,
	}),
	[types.POST_REQUEST_LOGIN_SUCCESS]: (state, { payload }) => ({
		...state,
		email: payload.email,
		userRequestLoading: false,
	}),
	[types.POST_REQUEST_LOGIN_ERROR]: (state, { payload }) => ({
		...state,
		userRequestError: payload,
		userRequestLoading: false,
	}),
	[types.ACTION_LOGOUT]: (state) => ({
		...state,
		email: '',
	}),
});

export default userReduce;
