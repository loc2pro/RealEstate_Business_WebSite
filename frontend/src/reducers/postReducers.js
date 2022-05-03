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

export const postListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case POST_HISTORY_REQUEST:
      return { loading: true };
    case POST_HISTORY_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case POST_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postUpdateReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case POST_HISTORY_UPDATE_REQUEST:
      return { loading: true };
    case POST_HISTORY_UPDATE_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case POST_HISTORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case POST_HISTORY_DELETE_REQUEST:
      return { loading: true };
    case POST_HISTORY_DELETE_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case POST_HISTORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postListGroundReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
  switch (action.type) {
    case POSTGROUND_HISTORY_REQUEST:
      return { loading: true };
    case POSTGROUND_HISTORY_SUCCESS:
      return { loading: false, success: true, grounds: action.payload };
    case POSTGROUND_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postUpdateGroundReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
  switch (action.type) {
    case POSTGROUND_HISTORY_UPDATE_REQUEST:
      return { loading: true };
    case POSTGROUND_HISTORY_UPDATE_SUCCESS:
      return { loading: false, success: true, grounds: action.payload };
    case POSTGROUND_HISTORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteGroundReducer = (state = { grounds: [] }, action) => {
  switch (action.type) {
    case POSTGROUND_HISTORY_DELETE_REQUEST:
      return { loading: true };
    case POSTGROUND_HISTORY_DELETE_SUCCESS:
      return { loading: false, success: true, grounds: action.payload };
    case POSTGROUND_HISTORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
