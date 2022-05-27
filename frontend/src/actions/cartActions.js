import Axios from "axios";
import api from "../api";
import {
  CART_SAVE_SHIPPING_ADDRESS,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (productId) => async (dispatch, getState) => {
  const { data } = await Axios.get(`${api}/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.product.name,
      image: data.product.image,
      price: data.product.price,
      countInStock: data.product.countInStock,
      product: data.product._id,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const addGroundToCart = (groundId) => async (dispatch, getState) => {
  const { data } = await Axios.get(`${api}/api/grounds/${groundId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.ground.name,
      image: data.ground.image,
      price: data.ground.price,
      product: data.ground._id,
      type: data.ground.type,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
