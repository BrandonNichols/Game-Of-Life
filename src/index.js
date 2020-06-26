import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import lifeReducer from "./reducers/lifeReducer";

const store = createStore(lifeReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
