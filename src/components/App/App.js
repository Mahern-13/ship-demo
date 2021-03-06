import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RoutePlanner from "../route-planner";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={RoutePlanner} />
      </Switch>
    </BrowserRouter>
  );
}
