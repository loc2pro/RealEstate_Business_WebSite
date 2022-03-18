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

export const ListReducer = (state = { loading: true, grounds: [] }, action) => {
  switch (action.type) {
    case GROUND_LIST_REQUEST_TEST:
      return { loading: true };
    case GROUND_LIST_SUCCESS_TEST:
      return {
        loading: false,
        grounds: action.payload.grounds,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case GROUND_LIST_FAIL_TEST:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const groundCategoryListReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
  switch (action.type) {
    case GROUND_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case GROUND_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case GROUND_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const groundListReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
  switch (action.type) {
    case GROUND_LIST_REQUEST:
      return { loading: true };
    case GROUND_LIST_SUCCESS:
      return { loading: false, grounds: action.payload };
    case GROUND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const GROUNDDetailsReducer = (
  state = { ground: {}, loading: true },
  action
) => {
  switch (action.type) {
    case GROUND_DETAILS_REQUEST:
      return { loading: true };
    case GROUND_DETAILS_SUCCESS:
      return { loading: false, ground: action.payload };
    case GROUND_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userGroundsReducer = (
  state = { userGround: {}, loading: true },
  action
) => {
  switch (action.type) {
    case USER_GROUND_DETAILS_REQUEST:
      return { loading: true };
    case USER_GROUND_DETAILS_SUCCESS:
      return { loading: false, userGround: action.payload };
    case USER_GROUND_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postGroundsReducer = (
  state = { postGround: {}, loading: true },
  action
) => {
  switch (action.type) {
    case POST_GROUND_REQUEST:
      return { loading: true };
    case POST_GROUND_SUCCESS:
      return { loading: false, postGround: action.payload };
    case POST_GROUND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
