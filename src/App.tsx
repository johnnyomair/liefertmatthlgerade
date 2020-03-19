import React, { FunctionComponent } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Home } from "./pages/Home";

export const App: FunctionComponent = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);
