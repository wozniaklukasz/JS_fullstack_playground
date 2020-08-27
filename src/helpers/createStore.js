import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import rootReducer from "../client/rootReducer";

export default (req) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000", // api calls during prepare ssr missing origin
  });

  const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  return store;
};
