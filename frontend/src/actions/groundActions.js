import Axios from "axios";
import { message } from "antd";
import api from "../api";
import {
  POST_GROUND_FAIL,
  POST_GROUND_REQUEST,
  POST_GROUND_SUCCESS,
  GROUND_CATEGORY_LIST_FAIL,
  GROUND_CATEGORY_LIST_REQUEST,
  GROUND_CATEGORY_LIST_SUCCESS,
  GROUND_DETAILS_FAIL,
  GROUND_DETAILS_REQUEST,
  GROUND_DETAILS_SUCCESS,
  GROUND_LIST_FAIL,
  GROUND_LIST_FAIL_TEST,
  GROUND_LIST_REQUEST,
  GROUND_LIST_REQUEST_TEST,
  GROUND_LIST_SUCCESS,
  GROUND_LIST_SUCCESS_TEST,
  USER_GROUND_DETAILS_FAIL,
  USER_GROUND_DETAILS_REQUEST,
  USER_GROUND_DETAILS_SUCCESS,
  GROUND_DELETE_REQUEST,
  GROUND_DELETE_SUCCESS,
  GROUND_DELETE_FAIL,
  GROUND_UPDATE_REQUEST,
  GROUND_UPDATE_SUCCESS,
  GROUND_UPDATE_FAIL,
  BROWSE_GROUND_LIST_REQUEST,
  BROWSE_GROUND_LIST_SUCCESS,
  BROWSE_GROUND_LIST_FAIL,
  BROWSE_GROUND_UPDATE_REQUEST,
  BROWSE_GROUND_UPDATE_SUCCESS,
  BROWSE_GROUND_UPDATE_FAIL,
  SELLER_GROUND_LIST_REQUEST,
  SELLER_GROUND_LIST_SUCCESS,
  SELLER_GROUND_LIST_FAIL,
  SELLER_GROUND_LIST_SOLD_REQUEST,
  SELLER_GROUND_LIST_SOLD_SUCCESS,
  SELLER_GROUND_LIST_SOLD_FAIL,
  INSTOCKGROUND_UPDATE_REQUEST,
  INSTOCKGROUND_UPDATE_SUCCESS,
  INSTOCKGROUND_UPDATE_FAIL,
  ASSIGNMENT_GROUND_REQUEST,
  ASSIGNMENT_GROUND_SUCCEESS,
  ASSIGNMENT_GROUND_FAIL,
} from "../constants/groundConstants";
import { PRODUCT_UPDATE_FAIL } from "../constants/productConstants";

export const listGroundss =
  ({
    status = "",
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
      type: GROUND_LIST_REQUEST_TEST,
    });
    try {
      const { data } = await Axios.get(
        `${api}/api/grounds/ground?pageNumber=${pageNumber}&name=${name}&type=${type}&status=${status}&ward=${ward}&district=${district}&city=${city}&min=${min}&max=${max}&order=${order}`
      );
      dispatch({ type: GROUND_LIST_SUCCESS_TEST, payload: data });
    } catch (error) {
      dispatch({ type: GROUND_LIST_FAIL_TEST, payload: error.message });
    }
  };
export const listGroundCategories = () => async (dispatch) => {
  dispatch({
    type: GROUND_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`${api}/api/grounds/categories`);
    dispatch({ type: GROUND_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GROUND_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const listGrounds = () => async (dispatch) => {
  dispatch({
    type: GROUND_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`${api}/api/grounds`);
    dispatch({ type: GROUND_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GROUND_LIST_FAIL, payload: error.message });
  }
};

export const detailsGround = (groundId) => async (dispatch) => {
  dispatch({ type: GROUND_DETAILS_REQUEST, payload: groundId });

  try {
    const { data } = await Axios.get(`${api}/api/grounds/${groundId}`);
    dispatch({ type: GROUND_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GROUND_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const postGround =
  (
    newGround,
    type,
    status,
    legalDocuments,
    address,
    district,
    ward,
    city,
    lat,
    lng,
    listImages
  ) =>
  async (dispatch) => {
    dispatch({ type: POST_GROUND_REQUEST });

    try {
      const { data } = await Axios.post(`${api}/api/grounds/createGrounds`, {
        newGround,
        address,
        district,
        ward,
        city,
        lat,
        lng,
        type,
        status,
        legalDocuments,
        listImages,
      });

      if (data.success) {
        dispatch({ type: POST_GROUND_SUCCESS, payload: data });
      } else {
        dispatch({ type: POST_GROUND_FAIL });
        return { success: false, message: data.message };
      }
      return data;
    } catch (error) {
      dispatch({
        type: POST_GROUND_FAIL,
      });
      const { response } = error;
      return { success: false, message: response.data.message };
    }
  };

//X??a b??i c???a admin
export const deleteGround = (postHistoryId) => async (dispatch, getState) => {
  dispatch({ type: GROUND_DELETE_REQUEST, payload: postHistoryId });
  try {
    const { data } = await Axios.delete(
      `${api}/api/grounds/adminGround/${postHistoryId}`
    );
    dispatch({ type: GROUND_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GROUND_DELETE_FAIL, payload: message });
  }
};

//S???a b??i c???a Admin
export const updateGround =
  (productId, newGround) => async (dispatch, getState) => {
    dispatch({ type: GROUND_UPDATE_REQUEST, payload: productId });
    try {
      const { data } = await Axios.put(
        `${api}/api/grounds/admin/updateGround/${productId}`,
        { newGround }
      );
      if (data.success) {
        dispatch({ type: GROUND_UPDATE_SUCCESS, payload: data });
      } else {
        dispatch({ type: GROUND_UPDATE_FAIL });
        return { success: false, message: "Update s???n ph???m th???t b???i" };
      }
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: GROUND_UPDATE_FAIL, payload: message });
    }
  };

// B??i ch??a duy???t
export const listBrowseGrounds = () => async (dispatch) => {
  dispatch({
    type: BROWSE_GROUND_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`${api}/api/grounds/browse`);
    dispatch({ type: BROWSE_GROUND_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BROWSE_GROUND_LIST_FAIL, payload: error.message });
  }
};

export const updateBrowseGround = (productId) => async (dispatch, getState) => {
  dispatch({ type: BROWSE_GROUND_UPDATE_REQUEST });
  try {
    const { data } = await Axios.put(
      `${api}/api/grounds/browseGround/${productId}`
    );
    if (data.success) {
      dispatch({ type: BROWSE_GROUND_UPDATE_SUCCESS, payload: data });
    } else {
      dispatch({ type: BROWSE_GROUND_UPDATE_FAIL, payload: message });
      return { success: false, message: message };
    }
    return data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BROWSE_GROUND_UPDATE_FAIL, payload: message });
  }
};

// S???n ph???m nh??n vi??n ch??a b??n

export const listGroundsSeller = (sellerId) => async (dispatch) => {
  dispatch({
    type: SELLER_GROUND_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${api}/api/grounds/seller/notsoldGround/${sellerId}`
    );
    dispatch({ type: SELLER_GROUND_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SELLER_GROUND_LIST_FAIL, payload: error.message });
  }
};

// S???n ph???m nh??n vi??n ???? b??n b??n

export const listGroundsSoldSeller = (sellerId) => async (dispatch) => {
  dispatch({
    type: SELLER_GROUND_LIST_SOLD_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${api}/api/grounds/seller/soldGround/${sellerId}`
    );
    dispatch({ type: SELLER_GROUND_LIST_SOLD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SELLER_GROUND_LIST_SOLD_FAIL, payload: error.message });
  }
};
// x??c nh???n ???? b??n s???n ph???m ??i
export const updateInstockGrounds =
  (productId) => async (dispatch, getState) => {
    dispatch({ type: INSTOCKGROUND_UPDATE_REQUEST });
    try {
      const { data } = await Axios.put(
        `${api}/api/grounds/seller/updateGround/${productId}`
      );
      if (data.success) {
        dispatch({ type: INSTOCKGROUND_UPDATE_SUCCESS, payload: data });
      } else {
        dispatch({ type: INSTOCKGROUND_UPDATE_FAIL, payload: message });
        return { success: false, message: message };
      }
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: INSTOCKGROUND_UPDATE_FAIL, payload: message });
    }
  };

// Ph??n C??ng
export const assignmentGround =
  (groundId, selectedRowKeysSeller) => async (dispatch, getState) => {
    dispatch({ type: ASSIGNMENT_GROUND_REQUEST });
    try {
      const { data } = await Axios.put(
        `${api}/api/grounds/admin/assignmentGround`,
        {
          groundId,
          selectedRowKeysSeller,
        }
      );
      if (data.success) {
        dispatch({ type: ASSIGNMENT_GROUND_SUCCEESS, payload: data });
      } else {
        dispatch({ type: ASSIGNMENT_GROUND_FAIL });
        return { success: false, message: "Ch??a ch???n nh??n vi??n ????? ph??n c??ng" };
      }
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ASSIGNMENT_GROUND_FAIL, payload: message });
    }
  };
