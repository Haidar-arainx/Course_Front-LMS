import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GetRequestApi,
  getRequestFunc,
  PostRequestApi,
  postRequestFunc,
} from "../services/ApiRequests";
import { user } from "../services/defaultValues";
import {
  getAllCoursesSuccess,
  GetCartSuccess,
  GetCategoriesSuccess,
  getCommentsSuccess,
  GetContentSuccess,
  getCoursesSuccess,
  GetGeneralSuccess,
  getPaymentSuccess,
} from "./actions";
import {
  GET_ALL_COURSES,
  GET_CATEGORIES,
  GET_COURSES,
  GET_PAYMENT,
  GET_GENERAL_SETTINGS,
  GET_GENERAL_SETTINGS_SUCCESS,
  GET_CART,
  GET_HOMEPAGE_CONTENT,
} from "./constants";

export function* watchCart() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(GET_CART, getCart);
}
export function* watchPayment() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(GET_PAYMENT, getPayment);
}
export function* watchCourse() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(GET_COURSES, getCourse);
}
export function* watchAllCourse() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(GET_ALL_COURSES, getallCourse);
}
export function* watchComents() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(GET_CATEGORIES, GetCategories);
}
export function* watchGeneral() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(GET_GENERAL_SETTINGS, getSettings);
}
export function* watchContent() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(GET_HOMEPAGE_CONTENT, getContent);
}
const getPaymentAsync = (id) =>
  // eslint-disable-next-line no-return-await
  PostRequestApi("get_user_payments ", { user_id: id })
    .then((res) => res.data)
    .catch((error) => error);

function* getPayment({ payload }) {
  try {
    const loginUser = yield call(getPaymentAsync, payload);
    console.log(loginUser);
    if (loginUser.status === "true") {
      yield put(getPaymentSuccess(loginUser.data));
    }
  } catch (error) {
    console.log(error);
    // yield put(loginUserError(error));
  }
}
//course list
const getCourseAsync = (id) =>
  GetRequestApi("my-courses ")
    .then((res) => res.data)
    .catch((error) => error);

function* getCourse({ payload }) {
  try {
    const myCourse = yield call(getCourseAsync, payload);

    if (myCourse.success === true) {
      yield put(getCoursesSuccess(myCourse.data));
    }
  } catch (error) {
    console.log(error);
  }
}
//all course list
const getallCourseAsync = () =>
  GetRequestApi("get-all-courses")
    .then((res) => res.data)
    .catch((error) => error);

function* getallCourse() {
  try {
    const allCourses = yield call(getallCourseAsync);

    if (allCourses.success === true) {
      yield put(getAllCoursesSuccess(allCourses.data));
    }
  } catch (error) {
    console.log(error);
  }
}
//getComments list
const GetCategoriesAsync = () =>
  GetRequestApi("categories")
    .then((res) => res.data)
    .catch((error) => error);

function* GetCategories() {
  try {
    const response = yield call(GetCategoriesAsync);

    if (response.success == true) {
      yield put(GetCategoriesSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

//getSettings list
const getSettingsAsync = () =>
  GetRequestApi("settings ")
    .then((res) => res.data)
    .catch((error) => error);

function* getSettings() {
  try {
    const settings = yield call(getSettingsAsync);

    if (settings.success === true) {
      yield put(GetGeneralSuccess(settings?.data));
    }
  } catch (error) {
    console.log(error);
  }
}
//getCart list
const getCartAsync = () =>
  GetRequestApi("cart-list")
    .then((res) => res.data)
    .catch((error) => error);

function* getCart() {
  try {
    const cart = yield call(getCartAsync);

    if (cart.success === true) {
      yield put(GetCartSuccess(cart.data));
    } else if (cart?.success == false) {
      yield put(GetCartSuccess([]));
    }
  } catch (error) {
    console.log(error);
  }
}
// content home page

const getContentAsync = () =>
  GetRequestApi("homepage_content")
    .then((res) => res.data)
    .catch((error) => error);

function* getContent() {
  try {
    const response = yield call(getContentAsync);

    if (response) {
      yield put(GetContentSuccess(response));
    }
  } catch (error) {
    console.log(error);
  }
}
export default function* rootSaga() {
  yield all([
    fork(watchPayment),
    fork(watchCart),
    fork(watchCourse),
    fork(watchAllCourse),
    fork(watchComents),
    fork(watchGeneral),
    fork(watchContent),
  ]);
}
