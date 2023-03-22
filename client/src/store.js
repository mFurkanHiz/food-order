import { applyMiddleware, combineReducers, createStore } from "redux";
import { getAllBurgersReducer } from "./reducers/burgerReducers";
import { addToCartReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const finalReducer = combineReducers({
  getAllBurgersReducer: getAllBurgersReducer,
  addToCartReducer: addToCartReducer,
});
// bu kısım sadece local storage için
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("catItems"))
  : [];

const initialState = {
  addToCartReducer: {
    cartItems: cartItems,
  },
};
// buraya kadar

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
