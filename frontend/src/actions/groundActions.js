import Axios from "axios";
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
} from "../constants/groundConstants";

export const listGroundss =
  ({ pageNumber = "", name = "", type = "", order = "", min = 0, max = 0 }) =>
  async (dispatch) => {
    dispatch({
      type: GROUND_LIST_REQUEST_TEST,
    });
    try {
      const { data } = await Axios.get(
        `${api}/api/grounds/ground?pageNumber=${pageNumber}&name=${name}&type=${type}&min=${min}&max=${max}&order=${order}`
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

export const detailsGround = (GROUNDId) => async (dispatch) => {
  dispatch({ type: GROUND_DETAILS_REQUEST, payload: GROUNDId });

  try {
    const { data } = await Axios.get(`${api}/api/grounds/${GROUNDId}`);
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
export const postGround = (newGround) => async (dispatch) => {
  dispatch({ type: POST_GROUND_REQUEST });

  try {
    const { data } = await Axios.post(
      `${api}/api/grounds/createGrounds`,
      newGround
    );

    if (data.success) {
      dispatch({ type: POST_GROUND_SUCCESS, payload: data });
    } else {
      dispatch({ type: POST_GROUND_FAIL });
      return { success: false, message: "Đăng sản phẩm thất bại" };
    }
    return data;
  } catch (error) {
    dispatch({
      type: POST_GROUND_FAIL,
    });
    return { success: false, message: error.message };
  }
};
