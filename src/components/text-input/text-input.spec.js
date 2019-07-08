import React from "react";
import { shallow } from "enzyme";
import TextInput from "./index";

describe("Checkbox", () => {
  it("renders the component", () => {
    const wrapper = shallow(<TextInput id={1} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders with a preset value", () => {
    const wrapper = shallow(<TextInput id={1} value="test" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders with a preset label", () => {
    const wrapper = shallow(<TextInput id={1} active={true} label="Test" />);
    expect(wrapper).toMatchSnapshot();
  });
});
