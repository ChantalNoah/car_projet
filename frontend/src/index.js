import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
//import { BrowserRouter, Route, Switch, Redirect } from "react-middleware-router";

// core components
import Admin from "layouts/Admin.jsx";
import Auth from "layouts/Auth.jsx";
import RTL from "layouts/RTL.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";
const auth = require('./middleware/Auth.middleware');
const hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/auth/login-page" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
