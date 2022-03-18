import Axios from "axios";
import api from "../api";
import {
  POST_PRODUCT_FAIL,
  POST_PRODUCT_REQUEST,
  POST_PRODUCT_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_FAIL_TEST,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_TEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_SUCCESS_TEST,
  USER_PRODUCT_DETAILS_FAIL,
  USER_PRODUCT_DETAILS_REQUEST,
  USER_PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";

export const listProductss =
  ({ pageNumber = "", name = "", type = "", order = "", min = 0, max = 0 }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST_TEST,
    });
    try {
      const { data } = await Axios.get(
        `${api}/api/products/product?pageNumber=${pageNumber}&name=${name}&type=${type}&min=${min}&max=${max}&order=${order}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS_TEST, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL_TEST, payload: error.message });
    }
  };
export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`${api}/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

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
  dispatch({ type: POST_PRODUCT_REQUEST });

  try {
    const { data } = await Axios.post(
      `${api}/api/products/createProducts`,
      newProduct
    );

    if (data.success) {
      dispatch({ type: POST_PRODUCT_SUCCESS, payload: data });
    } else {
      dispatch({ type: POST_PRODUCT_FAIL });
      return { success: false, message: "Vui lòng kiểm tra thông tin" };
    }
    return data;
  } catch (error) {
    dispatch({
      type: POST_PRODUCT_FAIL,
    });
    return { success: false, message: error.message };
  }
};
