import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import App from "./index";

describe("App", () => {
  it("renders the app without crashing", () => {
    render(
      <Provider store={store()}>
        <App />
      </Provider>
    );
  });
});
