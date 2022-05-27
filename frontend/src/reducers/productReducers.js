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
  BROWSE_LIST_REQUEST,
  BROWSE_LIST_SUCCESS,
  BROWSE_LIST_FAIL,
  BROWSE_UPDATE_REQUEST,
  BROWSE_UPDATE_SUCCESS,
  BROWSE_UPDATE_FAIL,
  SELLER_PRODUCT_LIST_REQUEST,
  SELLER_PRODUCT_LIST_SUCCESS,
  SELLER_PRODUCT_LIST_FAIL,
  INSTOCK_UPDATE_REQUEST,
  INSTOCK_UPDATE_SUCCESS,
  INSTOCK_UPDATE_FAIL,
  SELLER_PRODUCT_LIST_SOLD_REQUEST,
  SELLER_PRODUCT_LIST_SOLD_SUCCESS,
  SELLER_PRODUCT_LIST_SOLD_FAIL,
  ASSIGNMENT_REQUEST,
  ASSIGNMENT_SUCCEESS,
  ASSIGNMENT_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_ADMIN_LIST_SUCCESS,
  PRODUCT_ADMIN_LIST_FAIL,
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
//Xóa Sản phẩm của admin
export const productDeleteReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Cập nhật sản phẩm của admin
export const productUpdateReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// List bài chưa duyệt

export const ListBrowseReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case BROWSE_LIST_REQUEST:
      return { loading: true };
    case BROWSE_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case BROWSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// Cập nhật bài chưa duyệt
export const browsetUpdateReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case BROWSE_UPDATE_REQUEST:
      return { loading: true };
    case BROWSE_UPDATE_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case BROWSE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// bài chưa bán của nhân viên

export const ListProductSellerReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case SELLER_PRODUCT_LIST_REQUEST:
      return { loading: true };
    case SELLER_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case SELLER_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// bài đã bán của nhân viên
export const ListProductSoldSellerReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case SELLER_PRODUCT_LIST_SOLD_REQUEST:
      return { loading: true };
    case SELLER_PRODUCT_LIST_SOLD_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case SELLER_PRODUCT_LIST_SOLD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//xác nhận đã bán sản phẩm
export const productSellerUpdateReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case INSTOCK_UPDATE_REQUEST:
      return { loading: true };
    case INSTOCK_UPDATE_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case INSTOCK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// Phân công
export const assignmentReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case ASSIGNMENT_REQUEST:
      return { loading: true };
    case ASSIGNMENT_SUCCEESS:
      return { loading: false, success: true, products: action.payload };
    case ASSIGNMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//product admin
export const ListAdminReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_ADMIN_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
