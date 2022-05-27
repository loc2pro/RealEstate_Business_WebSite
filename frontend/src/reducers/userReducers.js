import {
  SELLER_LIST_FAIL,
  SELLER_LIST_REQUEST,
  SELLER_LIST_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  SELLER_SALARY_REQUEST,
  SELLER_SALARY_SUCCESS,
  SELLER_SALARY_FAIL,
  SELLER_UPDATE_REQUEST,
  SELLER_UPDATE_FAIL,
  SELLER_UPDATE_SUCCESS,
  SELLER_DETAILS_REQUEST,
  SELLER_DETAILS_SUCCESS,
  SELLER_DETAILS_FAIL,
  SELLER_PAYMENT_SALARY_REQUEST,
  SELLER_PAYMENT_SALARY_SUCCESS,
  SELLER_PAYMENT_SALARY_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { payload: true };
    case USER_REGISTER_SUCCESS:
      return { payload: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { payload: false, error: action.payload };
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { payload: true };
    case USER_SIGNIN_SUCCESS:
      return { payload: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { payload: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
//list user
export const listUserReducer = (
  state = { users: [], loading: true },
  action
) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { payload: true };
    case USER_LIST_SUCCESS:
      return { payload: false, users: action.payload };
    case USER_LIST_FAIL:
      return { payload: false, error: action.payload };
    default:
      return state;
  }
};
//Thêm user
export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { payload: true };
    case USER_CREATE_SUCCESS:
      return { payload: false, userInfo: action.payload };
    case USER_CREATE_FAIL:
      return { payload: false, error: action.payload };
    default:
      return state;
  }
};
// Update user
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}; // Delete user
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// Seller Detail
export const sellerDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SELLER_DETAILS_REQUEST:
      return { loading: true };
    case SELLER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case SELLER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//List seller
export const listSellerReducer = (
  state = { sellers: [], loading: true },
  action
) => {
  switch (action.type) {
    case SELLER_LIST_REQUEST:
      return { payload: true };
    case SELLER_LIST_SUCCESS:
      return { payload: false, sellers: action.payload };
    case SELLER_LIST_FAIL:
      return { payload: false, error: action.payload };
    default:
      return state;
  }
};
// Update seller
export const sellerUpdateReducer = (state = { seller: {} }, action) => {
  switch (action.type) {
    case SELLER_UPDATE_REQUEST:
      return { loading: true };
    case SELLER_UPDATE_SUCCESS:
      return { loading: false, success: true, seller: action.payload };
    case SELLER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//Salary seller
export const salarySellerReducer = (
  state = { seller: {}, loading: true },
  action
) => {
  switch (action.type) {
    case SELLER_SALARY_REQUEST:
      return { payload: true };
    case SELLER_SALARY_SUCCESS:
      return { payload: false, seller: action.payload };
    case SELLER_SALARY_FAIL:
      return { payload: false, error: action.payload };
    default:
      return state;
  }
};

//Salary seller payment
export const paymentSalarySellerReducer = (
  state = { seller: {}, loading: true },
  action
) => {
  switch (action.type) {
    case SELLER_PAYMENT_SALARY_REQUEST:
      return { payload: true };
    case SELLER_PAYMENT_SALARY_SUCCESS:
      return { payload: false, seller: action.payload };
    case SELLER_PAYMENT_SALARY_FAIL:
      return { payload: false, error: action.payload };
    default:
      return state;
  }
};

//Forgot
export const forgotPasswordReducer = (
  state = { forgot: {}, loading: true },
  action
) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false, forgot: action.payload, success: true };
    case FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
