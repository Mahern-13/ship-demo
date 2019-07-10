import React from "react";
import { Alert, Error } from "./index";
import { shallow } from "enzyme";

describe("Alert", () => {
  const wrapper = shallow(
    <Alert
      onSecondaryClick={alertType => alertType}
      onPrimaryClick={alertType => alertType}
      message="message"
    />
  );

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Error", () => {
  const wrapper = shallow(
    <Error
      onSecondaryClick={alertType => alertType}
      onPrimaryClick={alertType => alertType}
      message="message"
    />
  );

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
