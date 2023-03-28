import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
  addBurgersReducer,
  editBurgerReducer,
  getAllBurgersReducer,
  getBurgerByIdReducer,
} from "./reducers/burgerReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { addToCartReducer } from "./reducers/cartReducers";
import {
  getAllUsersReducer,
  loginUserReducer,
  registerUserReducer,
} from "./reducers/userReducers";
import {
  checkoutOrderReducer,
  deliverOrderReducer,
  getAllOrdersReducer,
  getUserOrdersReducer,
} from "./reducers/orderReducers";

const finalReducer = combineReducers({
  getAllBurgersReducer: getAllBurgersReducer,
  addToCartReducer: addToCartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  checkoutOrderReducer: checkoutOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
  getAllUsersReducer: getAllUsersReducer,
  addBurgersReducer: addBurgersReducer,
  getBurgerByIdReducer: getBurgerByIdReducer,
  editBurgerReducer: editBurgerReducer,
  getAllOrdersReducer: getAllOrdersReducer,
  deliverOrderReducer: deliverOrderReducer,
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
