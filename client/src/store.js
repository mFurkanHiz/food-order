import { applyMiddleware, combineReducers, createStore } from "redux";
import { getAllBurgersReducer } from "./reducers/burgerReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const finalReducer = combineReducers({
  getAllBurgersReducer: getAllBurgersReducer,
});

const initialState = {};

/*
extension: error lens 
*/

const compose = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  compose(applyMiddleware(thunk))
);

export default store;
