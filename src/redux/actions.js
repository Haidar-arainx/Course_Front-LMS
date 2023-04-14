import {
  ADD_TO_CART,
  EMPTY_CART,
  LOGUT,
  REMOVE_FROM_CART,
  GET_PAYMENT,
  GET_PAYMENT_SUCCESS,
  GET_COURSES,
  GET_COURSES_SUCCESS,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_GENERAL_SETTINGS,
  GET_GENERAL_SETTINGS_SUCCESS,
  GET_CART,
  GET_CART_SUCCESSS,
  GET_HOMEPAGE_CONTENT,
  GET_HOMEPAGE_CONTENT_SUCCESSS,
} from "./constants";

export const AddAction = (data) => {
  return {
    type: ADD_TO_CART,
    payload: data,
  };
};
export const GetCart = () => {
  return {
    type: GET_CART,
  };
};
export const GetCartSuccess = (data) => {
  return {
    type: GET_CART_SUCCESSS,
    payload: data,
  };
};
export const RemoveAction = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};
export const CartEmpty = () => {
  return {
    type: EMPTY_CART,
  };
};
export const LogoutAction = () => {
  return {
    type: LOGUT,
  };
};
export const GetPaymentAction = (id) => {
  return {
    type: GET_PAYMENT,
    payload: id,
  };
};
export const getPaymentSuccess = (data) => {
  return {
    type: GET_PAYMENT_SUCCESS,
    payload: data,
  };
};
export const GetCoursesAction = (id) => {
  return {
    type: GET_COURSES,
    payload: id,
  };
};
export const getCoursesSuccess = (data) => {
  return {
    type: GET_COURSES_SUCCESS,
    payload: data,
  };
};
export const GetAllCoursesAction = () => {
  return {
    type: GET_ALL_COURSES,
  };
};
export const getAllCoursesSuccess = (data) => {
  return {
    type: GET_ALL_COURSES_SUCCESS,
    payload: data,
  };
};
export const GetCategoriesAction = () => {
  return {
    type: GET_CATEGORIES,
  };
};
export const GetCategoriesSuccess = (data) => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: data,
  };
};
export const GetGeneralAction = () => {
  return {
    type: GET_GENERAL_SETTINGS,
  };
};
export const GetGeneralSuccess = (data) => {
  return {
    type: GET_GENERAL_SETTINGS_SUCCESS,
    payload: data,
  };
};
export const GetContent = () => {
  return {
    type: GET_HOMEPAGE_CONTENT,
  };
};
export const GetContentSuccess = (data) => {
  return {
    type: GET_HOMEPAGE_CONTENT_SUCCESSS,
    payload: data,
  };
};