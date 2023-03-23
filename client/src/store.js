import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { getAllBurgersReducer } from "./reducers/burgerReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { addToCartReducer } from "./reducers/cartReducers";
import { registerUserReducer, loginUserReducer } from "./reducers/userReducers";

const finalReducer = combineReducers({
  getAllBurgersReducer: getAllBurgersReducer,
  addToCartReducer: addToCartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  addToCartReducer: {
    cartItems: cartItems,
  },
  loginUserReducer: {
    currentUser: currentUser,
  },
};

const compose = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  compose(applyMiddleware(thunk))
);

export default store;
