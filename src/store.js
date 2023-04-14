import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./redux/reducer";
import saga from "./redux/saga";

const persistConfig = {
  key: "course_cart",
  storage,
};
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const persistedReducer = persistReducer(persistConfig, reducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
//   applyMiddleware(...middlewares),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
sagaMiddleware.run(saga);
const persistor = persistStore(store);

export default store;
export { persistor };

