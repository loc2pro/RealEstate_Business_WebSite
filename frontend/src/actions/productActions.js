import Axios from "axios";
import api from "../api";
import {
  POST_PRODUCT_FAIL,
  POST_PRODUCT_REQUEST,
  POST_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  USER_PRODUCT_DETAILS_FAIL,
  USER_PRODUCT_DETAILS_REQUEST,
  USER_PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`${api}/api/products`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

  try {
    const { data } = await Axios.get(`${api}/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const userProduct = (id) => async (dispatch) => {
  dispatch({ type: USER_PRODUCT_DETAILS_REQUEST, payload: id });

  try {
    const { data } = await Axios.post(`${api}/api/user/info`, { id });
    dispatch({ type: USER_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const postProduct = (newProduct) => async (dispatch) => {
  console.log("data", newProduct);
  dispatch({ type: POST_PRODUCT_REQUEST, payload: newProduct });

  try {
    const { data } = await Axios.post(
      `${api}/api/products/createProducts`,
      newProduct
    );
    dispatch({ type: POST_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
