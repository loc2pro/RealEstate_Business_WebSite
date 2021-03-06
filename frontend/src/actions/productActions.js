import { message } from "antd";
import Axios from "axios";
import api from "../api";
import {
  ASSIGNMENT_FAIL,
  ASSIGNMENT_REQUEST,
  ASSIGNMENT_SUCCEESS,
  BROWSE_LIST_FAIL,
  BROWSE_LIST_REQUEST,
  BROWSE_LIST_SUCCESS,
  BROWSE_UPDATE_FAIL,
  BROWSE_UPDATE_REQUEST,
  BROWSE_UPDATE_SUCCESS,
  INSTOCK_UPDATE_FAIL,
  INSTOCK_UPDATE_REQUEST,
  INSTOCK_UPDATE_SUCCESS,
  POST_PRODUCT_FAIL,
  POST_PRODUCT_REQUEST,
  POST_PRODUCT_SUCCESS,
  PRODUCT_ADMIN_LIST_FAIL,
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_ADMIN_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_FAIL_TEST,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_TEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_SUCCESS_TEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  SELLER_PRODUCT_LIST_FAIL,
  SELLER_PRODUCT_LIST_REQUEST,
  SELLER_PRODUCT_LIST_SOLD_FAIL,
  SELLER_PRODUCT_LIST_SOLD_REQUEST,
  SELLER_PRODUCT_LIST_SOLD_SUCCESS,
  SELLER_PRODUCT_LIST_SUCCESS,
  USER_PRODUCT_DETAILS_FAIL,
  USER_PRODUCT_DETAILS_REQUEST,
  USER_PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";

export const listProductss =
  ({
    status = "",
    direction = "",
    city = "",
    district = "",
    ward = "",
    pageNumber = "",
    name = "",
    type = "",
    order = "",
    min = 0,
    max = 0,
  }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST_TEST,
    });
    try {
      const { data } = await Axios.get(
        `${api}/api/products/product?pageNumber=${pageNumber}&name=${name}&type=${type}&status=${status}&direction=${direction}&ward=${ward}&district=${district}&city=${city}&min=${min}&max=${max}&order=${order}`
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

export const listProductsAdmin = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_ADMIN_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`${api}/api/products/productAdmin`);
    dispatch({ type: PRODUCT_ADMIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_ADMIN_LIST_FAIL, payload: error.message });
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
// ????ng b??i c???a user
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
      return { success: false, message: data.message };
    }
    return data;
  } catch (error) {
    dispatch({
      type: POST_PRODUCT_FAIL,
    });
    const { response } = error;
    return { success: false, message: response.data.message };
  }
};
//X??a b??i c???a admin
export const deleteProduct = (postHistoryId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: postHistoryId });
  try {
    const { data } = await Axios.delete(
      `${api}/api/products/admin/${postHistoryId}`
    );
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};

//S???a b??i c???a Admin
export const updateProduct =
  (productId, newProduct) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: productId });
    try {
      const { data } = await Axios.put(
        `${api}/api/products/admin/update/${productId}`,
        { newProduct }
      );
      if (data.success) {
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
      } else {
        dispatch({ type: PRODUCT_UPDATE_FAIL });
        return { success: false, message: "Update s???n ph???m th???t b???i" };
      }
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_UPDATE_FAIL, payload: message });
    }
  };

// B??i ch??a duy???t
export const listBrowseProducts = () => async (dispatch) => {
  dispatch({
    type: BROWSE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`${api}/api/products/browse`);
    dispatch({ type: BROWSE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BROWSE_LIST_FAIL, payload: error.message });
  }
};

export const updateBrowse = (productId) => async (dispatch, getState) => {
  dispatch({ type: BROWSE_UPDATE_REQUEST });
  try {
    const { data } = await Axios.put(`${api}/api/products/browse/${productId}`);
    if (data.success) {
      dispatch({ type: BROWSE_UPDATE_SUCCESS, payload: data });
    } else {
      dispatch({ type: BROWSE_UPDATE_FAIL, payload: message });
      return { success: false, message: message };
    }
    return data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BROWSE_UPDATE_FAIL, payload: message });
  }
};

// S???n ph???m nh??n vi??n ch??a b??n

export const listProductsSeller = (sellerId) => async (dispatch) => {
  dispatch({
    type: SELLER_PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${api}/api/products/seller/notsold/${sellerId}`
    );
    dispatch({ type: SELLER_PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SELLER_PRODUCT_LIST_FAIL, payload: error.message });
  }
};

// S???n ph???m nh??n vi??n ???? b??n b??n

export const listProductsSoldSeller = (sellerId) => async (dispatch) => {
  dispatch({
    type: SELLER_PRODUCT_LIST_SOLD_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${api}/api/products/seller/sold/${sellerId}`
    );
    dispatch({ type: SELLER_PRODUCT_LIST_SOLD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SELLER_PRODUCT_LIST_SOLD_FAIL, payload: error.message });
  }
};
// x??c nh???n ???? b??n s???n ph???m ??i
export const updateInstock = (productId) => async (dispatch, getState) => {
  dispatch({ type: INSTOCK_UPDATE_REQUEST });
  try {
    const { data } = await Axios.put(
      `${api}/api/products/seller/update/${productId}`
    );
    if (data.success) {
      dispatch({ type: INSTOCK_UPDATE_SUCCESS, payload: data });
    } else {
      dispatch({ type: INSTOCK_UPDATE_FAIL, payload: message });
      return { success: false, message: message };
    }
    return data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: INSTOCK_UPDATE_FAIL, payload: message });
  }
};

// Ph??n C??ng
export const assignment =
  (productId, selectedRowKeysSeller) => async (dispatch, getState) => {
    dispatch({ type: ASSIGNMENT_REQUEST });
    try {
      const { data } = await Axios.put(`${api}/api/products/admin/assignment`, {
        productId,
        selectedRowKeysSeller,
      });
      if (data.success) {
        dispatch({ type: ASSIGNMENT_SUCCEESS, payload: data });
      } else {
        dispatch({ type: ASSIGNMENT_FAIL });
        return { success: false, message: "Ch??a ch???n nh??n vi??n ????? ph??n c??ng" };
      }
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: INSTOCK_UPDATE_FAIL, payload: message });
    }
  };
