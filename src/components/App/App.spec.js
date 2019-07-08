import React from "react";
import { shallow } from "enzyme";
import App from "./index";

describe("App", () => {
  const wrapper = shallow(<App />);

  it("renders the app", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
