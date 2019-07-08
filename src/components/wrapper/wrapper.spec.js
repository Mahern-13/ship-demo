import React from "react";
import { shallow } from "enzyme";
import Wrapper from "./index";

describe("Wrapper", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders after custom styling", () => {
    const wrapper = shallow(<Wrapper styling={{ padding: "0" }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
