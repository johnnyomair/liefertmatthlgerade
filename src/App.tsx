import React, { FunctionComponent, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Text } from "./components/Text";
import Home from "./pages/Home";

const AdminComponent = lazy(() => import("./pages/Admin"));

const Admin: FunctionComponent = () => (
  <Suspense fallback={<Text>Lade...</Text>}>
    <AdminComponent />
  </Suspense>
);

export const App: FunctionComponent = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);
