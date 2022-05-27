import { message } from "antd";
import Axios from "axios";
import api from "../api";
import {
  POSTGROUND_HISTORY_DELETE_FAIL,
  POSTGROUND_HISTORY_DELETE_REQUEST,
  POSTGROUND_HISTORY_DELETE_SUCCESS,
  POSTGROUND_HISTORY_FAIL,
  POSTGROUND_HISTORY_REQUEST,
  POSTGROUND_HISTORY_SUCCESS,
  POSTGROUND_HISTORY_UPDATE_FAIL,
  POSTGROUND_HISTORY_UPDATE_REQUEST,
  POSTGROUND_HISTORY_UPDATE_SUCCESS,
  POST_HISTORY_DELETE_FAIL,
  POST_HISTORY_DELETE_REQUEST,
  POST_HISTORY_DELETE_SUCCESS,
  POST_HISTORY_FAIL,
  POST_HISTORY_REQUEST,
  POST_HISTORY_SUCCESS,
  POST_HISTORY_UPDATE_FAIL,
  POST_HISTORY_UPDATE_REQUEST,
  POST_HISTORY_UPDATE_SUCCESS,
} from "../constants/PostContants";

export const listPost = (userId) => async (dispatch, getState) => {
  dispatch({ type: POST_HISTORY_REQUEST, payload: userId });
  try {
    const { data } = await Axios.post(`${api}/api/products/postHistory`, {
      userId,
    });
    dispatch({ type: POST_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_HISTORY_FAIL, payload: message });
  }
};

export const updatePost = (postId, newPost) => async (dispatch, getState) => {
  dispatch({ type: POST_HISTORY_UPDATE_REQUEST, payload: newPost });
  try {
    const { data } = await Axios.put(
      `${api}/api/products/postHistory/update/${postId}`,
      { newPost }
    );
    if (data.success) {
      dispatch({ type: POST_HISTORY_UPDATE_SUCCESS, payload: data });
    } else {
      dispatch({ type: POST_HISTORY_UPDATE_FAIL, payload: message });
      return { success: false, message: message };
    }
    return data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_HISTORY_UPDATE_FAIL, payload: message });
  }
};

export const deletePost = (postHistoryId) => async (dispatch, getState) => {
  dispatch({ type: POST_HISTORY_DELETE_REQUEST, payload: postHistoryId });
  try {
    const { data } = await Axios.delete(
      `${api}/api/products/postHistory/${postHistoryId}`
    );
    if (data.success) {
      dispatch({ type: POST_HISTORY_DELETE_SUCCESS, payload: data });
    } else {
      dispatch({ type: POST_HISTORY_DELETE_FAIL, payload: message });
      return { success: false, message: message };
    }
    return data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_HISTORY_DELETE_FAIL, payload: message });
  }
};

export const listPostGrounds = (userId) => async (dispatch, getState) => {
  dispatch({ type: POSTGROUND_HISTORY_REQUEST, payload: userId });
  try {
    const { data } = await Axios.post(`${api}/api/grounds/postGroundHistory`, {
      userId,
    });
    dispatch({ type: POSTGROUND_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POSTGROUND_HISTORY_FAIL, payload: message });
  }
};

export const updatePostGrounds =
  (postId, newPost) => async (dispatch, getState) => {
    dispatch({ type: POSTGROUND_HISTORY_UPDATE_REQUEST, payload: newPost });
    try {
      const { data } = await Axios.put(
        `${api}/api/grounds/postGroundHistory/update/${postId}`,
        { newPost }
      );
      if (data.success) {
        dispatch({ type: POSTGROUND_HISTORY_UPDATE_SUCCESS, payload: data });
      } else {
        dispatch({ type: POSTGROUND_HISTORY_UPDATE_FAIL, payload: message });
        return { success: false, message: message };
      }
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: POST_HISTORY_UPDATE_FAIL, payload: message });
    }
  };

export const deletePostGrounds =
  (postHistoryId) => async (dispatch, getState) => {
    dispatch({
      type: POSTGROUND_HISTORY_DELETE_REQUEST,
      payload: postHistoryId,
    });
    try {
      const { data } = await Axios.delete(
        `${api}/api/grounds/postGroundHistory/${postHistoryId}`
      );
      dispatch({ type: POSTGROUND_HISTORY_DELETE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: POSTGROUND_HISTORY_DELETE_FAIL, payload: message });
    }
  };
