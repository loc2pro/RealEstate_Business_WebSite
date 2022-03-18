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

export const ListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST_TEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS_TEST:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL_TEST:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productCategoryListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case PRODUCT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProductsReducer = (
  state = { userproduct: {}, loading: true },
  action
) => {
  switch (action.type) {
    case USER_PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case USER_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case USER_PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postProductsReducer = (
  state = { postproduct: {}, loading: true },
  action
) => {
  switch (action.type) {
    case POST_PRODUCT_REQUEST:
      return { loading: true };
    case POST_PRODUCT_SUCCESS:  
      return { loading: false, postproduct: action.payload };
    case POST_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
