import React from "react";
import { shallow } from "enzyme";
import Checkbox from "./index";

describe("Checkbox", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Checkbox />);
    expect(wrapper).toMatchSnapshot();
  });
});
