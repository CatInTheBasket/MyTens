import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose
} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const composeEnhancer = compose(
  applyMiddleware(thunk)
);

let store = createStore(rootReducer, composeEnhancer);

export default store;
