import {
  ADD_TO_CART,
  EMPTY_CART,
  GET_PAYMENT_SUCCESS,
  LOGUT,
  REMOVE_FROM_CART,
  GET_COURSES_SUCCESS,
  GET_ALL_COURSES_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  GET_GENERAL_SETTINGS_SUCCESS,
  GET_GENERAL_SETTINGS,
  GET_CART_SUCCESSS,
  GET_HOMEPAGE_CONTENT_SUCCESSS,
} from "./constants";

const INIT_STATE = {
  cart: [],
  paymentList: [],
  courseList: [],
  allCoursesList: [],
  catList: [],
  settinglist: {},
  content:[]
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CART_SUCCESSS:
      return { ...state, cart: action.payload };
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case REMOVE_FROM_CART:
      const filter = state.cart.filter((x) => x.id !== action.payload);
      return { ...state, cart: filter };
    case EMPTY_CART:
      return { ...state, cart: [] };
    case LOGUT:
      localStorage.removeItem("gogo_current_user");
      return { ...state, cart: [] };
    case GET_PAYMENT_SUCCESS:
      return { ...state, paymentList: action.payload };
    case GET_COURSES_SUCCESS:
      return { ...state, courseList: action.payload };
    case GET_ALL_COURSES_SUCCESS:
      return { ...state, allCoursesList: action.payload };
    case GET_CATEGORIES_SUCCESS:
      return { ...state, catList: action.payload };

    case GET_GENERAL_SETTINGS_SUCCESS:
      return { ...state, settinglist: action.payload };
      case GET_HOMEPAGE_CONTENT_SUCCESSS:
        return { ...state, content: action.payload };
    default:
      return { ...state };
  }
};
