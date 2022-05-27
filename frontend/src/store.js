import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  groundCategoryListReducer,
  groundDetailsReducer,
  groundListReducer,
  ListBrowseGroundReducer,
  ListGroundReducer,
  ListGroundSellerReducer,
  ListgroundSoldSellerReducer,
  postGroundsReducer,
} from "./reducers/groundReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import {
  postListGroundReducer,
  postListReducer,
} from "./reducers/postReducers";
import {
  ListAdminReducer,
  ListBrowseReducer,
  ListProductSellerReducer,
  ListProductSoldSellerReducer,
  ListReducer,
  postProductsReducer,
  productCategoryListReducer,
  productDetailsReducer,
  productListReducer,
  userProductsReducer,
} from "./reducers/productReducers";
import {
  listSellerReducer,
  listUserReducer,
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  salarySellerReducer,
  sellerUpdateReducer,
  sellerDetailsReducer,
  paymentSalarySellerReducer,
  forgotPasswordReducer,
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
  listAdmin: ListAdminReducer,
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
  sellerDetails: sellerDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  postProducts: postProductsReducer,
  postGrounds: postGroundsReducer,
  groundList: groundListReducer,
  groundDetails: groundDetailsReducer,
  groundCategoryList: groundCategoryListReducer,
  listGround: ListGroundReducer,
  listPosts: postListReducer,
  listPostGround: postListGroundReducer,
  browseList: ListBrowseReducer,
  browseGroundList: ListBrowseGroundReducer,
  listProductSeller: ListProductSellerReducer,
  listProductSoldSeller: ListProductSoldSellerReducer,
  listGroundSeller: ListGroundSellerReducer,
  listGroundSoldSeller: ListgroundSoldSellerReducer,
  listSeller: listSellerReducer,
  listUser: listUserReducer,
  salarySeller: salarySellerReducer,
  paymentSalarySeller: paymentSalarySellerReducer,
  updateSeller: sellerUpdateReducer,
  passForgot: forgotPasswordReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
