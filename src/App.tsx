import React, { FunctionComponent, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Text } from "./components/Text";
import Home from "./pages/Home";

const Admin = lazy(() => import("./pages/Admin"));

export const App: FunctionComponent = () => (
  <Suspense fallback={<Text>Lade...</Text>}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </Suspense>
);
