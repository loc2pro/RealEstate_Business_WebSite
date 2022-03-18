import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  GROUNDDetailsReducer,
  groundListReducer,
  postGroundsReducer,
} from "./reducers/groundReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import {
  ListReducer,
  postProductsReducer,
  productCategoryListReducer,
  productDetailsReducer,
  productListReducer,
  userProductsReducer,
} from "./reducers/productReducers";
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};
const reducer = combineReducers({
  list: ListReducer,
  productCategoryList: productCategoryListReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userProducts: userProductsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  postProducts: postProductsReducer,
  postGrounds: postGroundsReducer,
  groundList: groundListReducer,
  groundDetails: GROUNDDetailsReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
