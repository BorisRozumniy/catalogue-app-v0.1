import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import productsReducer from "./reducers/productsReduce";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootReducer = combineReducers({
    productsReducer,
});

function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		composeEnhancers(
			applyMiddleware(thunk)
		)
	);
}
const store = configureStore(window.REDUX_INITIAL_DATA);

export default store;
