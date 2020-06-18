import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { browserHistory, Router } from "react-router";
import routes from "./routes";
import store from "./store";
import style from "./style.scss";

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("root")
);
