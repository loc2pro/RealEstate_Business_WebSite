import Axios from "axios";
import api from "../api";
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  SELLER_CREATE_FAIL,
  SELLER_CREATE_REQUEST,
  SELLER_CREATE_SUCCESS,
  SELLER_DELETE_FAIL,
  SELLER_DELETE_REQUEST,
  SELLER_DELETE_SUCCESS,
  SELLER_DETAILS_FAIL,
  SELLER_DETAILS_REQUEST,
  SELLER_DETAILS_SUCCESS,
  SELLER_LIST_FAIL,
  SELLER_LIST_REQUEST,
  SELLER_LIST_SUCCESS,
  SELLER_PAYMENT_SALARY_FAIL,
  SELLER_PAYMENT_SALARY_REQUEST,
  SELLER_PAYMENT_SALARY_SUCCESS,
  SELLER_UPDATE_FAIL,
  SELLER_UPDATE_REQUEST,
  SELLER_UPDATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
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
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const register =
  (name, email, phone, address, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post(`${api}/api/users/register`, {
        name,
        email,
        phone,
        address,
        password,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(`${api}/api/users/signin`, {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    return {success:true,data};
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return {success:false,error};
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_SIGNOUT });
};

//forgot

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST, payload: { email } });
  try {
    const { data } = await Axios.post(`${api}/api/users/forgot`, { email });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`${api}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};
export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`${api}/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};
//list user
export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`${api}/api/users/admin/user`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};
// Thêm user
export const createUserAdmin = (newUser) => async (dispatch) => {
  dispatch({ type: USER_CREATE_REQUEST });
  try {
    const { data } = await Axios.post(`${api}/api/users/admin/create`, {
      newUser,
    });
    if (data.success) {
      dispatch({ type: USER_CREATE_SUCCESS, payload: data });
    } else {
      dispatch({ type: USER_CREATE_FAIL });
      return { success: false, message: data.message };
    }
    return data;
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
    });
    const { response } = error;
    return { success: false, message: response.data.message };
  }
};
//Xóa user
export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  try {
    const { data } = await Axios.delete(`${api}/api/users/${userId}`);
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};
//update user
export const updateUser = (user) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: user });
  try {
    const { data } = await Axios.put(`${api}/api/users/admin/update`, user);
    if (data.success) {
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } else {
      dispatch({ type: USER_UPDATE_FAIL, message: data.message });
    }
    return data;
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL });
    const { response } = error;
    return { success: false, message: response.data.message };
  }
};
// Detail seller
export const detailSeller = (userId) => async (dispatch, getState) => {
  dispatch({ type: SELLER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`${api}/api/users/seller/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: SELLER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SELLER_DETAILS_FAIL, payload: message });
  }
};
//list seller
export const listSellers = () => async (dispatch, getState) => {
  dispatch({ type: SELLER_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`${api}/api/users/admin/seller`);
    dispatch({ type: SELLER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SELLER_LIST_FAIL, payload: message });
  }
};
// Thêm seller
export const createSellerAdmin = (newUser, img) => async (dispatch) => {
  dispatch({ type: SELLER_CREATE_REQUEST });
  try {
    const { data } = await Axios.post(`${api}/api/users/admin/createSeller`, {
      newUser,
      img,
    });
    if (data.success) {
      dispatch({ type: SELLER_CREATE_SUCCESS, payload: data });
    } else {
      dispatch({
        type: SELLER_CREATE_FAIL,
        message: data.message,
      });
    }
    return data;
  } catch (error) {
    dispatch({
      type: SELLER_CREATE_FAIL,
    });
    const { response } = error;
    return { success: false, message: response.data.message };
  }
};
//Xóa seller
export const deleteSellerAdmin = (userId) => async (dispatch, getState) => {
  dispatch({ type: SELLER_DELETE_REQUEST, payload: userId });
  try {
    const { data } = await Axios.delete(`${api}/api/users/seller/${userId}`);
    dispatch({ type: SELLER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SELLER_DELETE_FAIL, payload: message });
  }
};
//update seller
export const updateSellerAdmin = (user) => async (dispatch) => {
  dispatch({ type: SELLER_UPDATE_REQUEST, payload: user });
  try {
    const { data } = await Axios.put(
      `${api}/api/users/admin/updateSeller`,
      user
    );
    if (data.success) {
      dispatch({ type: SELLER_UPDATE_SUCCESS, payload: data });
    } else {
      dispatch({ type: SELLER_UPDATE_FAIL, message: data.message });
    }
    return data;
  } catch (error) {
    dispatch({ type: SELLER_UPDATE_FAIL });
    const { response } = error;
    return { success: false, message: response.data.message };
  }
};

// Thanh toán lương cho nhân viên
export const paymentSalarySellerAdmin =
  (userId) => async (dispatch, getState) => {
    dispatch({ type: SELLER_PAYMENT_SALARY_REQUEST, payload: userId });
    try {
      const { data } = await Axios.put(
        `${api}/api/users/admin/payment/${userId}`
      );
      if (data.success) {
        dispatch({ type: SELLER_PAYMENT_SALARY_SUCCESS, payload: data });
      } else {
        dispatch({
          type: SELLER_PAYMENT_SALARY_FAIL,
          message: data.message,
        });
      }
      return data;
    } catch (error) {
      const { response } = error;
      return { success: false, message: response.data.message };
      dispatch({ type: SELLER_PAYMENT_SALARY_FAIL });
    }
  };
