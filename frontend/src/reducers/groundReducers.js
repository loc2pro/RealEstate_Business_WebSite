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

export const ListGroundReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
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

export const groundDetailsReducer = (
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

//Xóa Sản phẩm của admin
export const groundDeleteReducer = (state = { grounds: [] }, action) => {
  switch (action.type) {
    case GROUND_DELETE_REQUEST:
      return { loading: true };
    case GROUND_DELETE_SUCCESS:
      return { loading: false, success: true, grounds: action.payload };
    case GROUND_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Cập nhật sản phẩm của admin
export const groundUpdateReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
  switch (action.type) {
    case GROUND_UPDATE_REQUEST:
      return { loading: true };
    case GROUND_UPDATE_SUCCESS:
      return { loading: false, success: true, grounds: action.payload };
    case GROUND_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// List bài chưa duyệt

export const ListBrowseGroundReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
  switch (action.type) {
    case BROWSE_GROUND_LIST_REQUEST:
      return { loading: true };
    case BROWSE_GROUND_LIST_SUCCESS:
      return {
        loading: false,
        grounds: action.payload,
      };
    case BROWSE_GROUND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// Cập nhật bài chưa duyệt
export const browsetUpdateGroundReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
  switch (action.type) {
    case BROWSE_GROUND_UPDATE_REQUEST:
      return { loading: true };
    case BROWSE_GROUND_UPDATE_SUCCESS:
      return { loading: false, success: true, grounds: action.payload };
    case BROWSE_GROUND_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// bài chưa bán của nhân viên

export const ListGroundSellerReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
  switch (action.type) {
    case SELLER_GROUND_LIST_REQUEST:
      return { loading: true };
    case SELLER_GROUND_LIST_SUCCESS:
      return {
        loading: false,
        grounds: action.payload,
      };
    case SELLER_GROUND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// bài đã bán của nhân viên
export const ListgroundSoldSellerReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
  switch (action.type) {
    case SELLER_GROUND_LIST_SOLD_REQUEST:
      return { loading: true };
    case SELLER_GROUND_LIST_SOLD_SUCCESS:
      return {
        loading: false,
        grounds: action.payload,
      };
    case SELLER_GROUND_LIST_SOLD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//xác nhận đã bán sản phẩm
export const groundSellerUpdateReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
  switch (action.type) {
    case INSTOCKGROUND_UPDATE_REQUEST:
      return { loading: true };
    case INSTOCKGROUND_UPDATE_SUCCESS:
      return { loading: false, success: true, grounds: action.payload };
    case INSTOCKGROUND_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// Phân công
export const assignmentGroundReducer = (
  state = { loading: true, grounds: [] },
  action
) => {
  switch (action.type) {
    case ASSIGNMENT_GROUND_REQUEST:
      return { loading: true };
    case ASSIGNMENT_GROUND_SUCCEESS:
      return { loading: false, success: true, grounds: action.payload };
    case ASSIGNMENT_GROUND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
