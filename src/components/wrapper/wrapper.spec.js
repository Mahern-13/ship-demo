import React from "react";
import Wrapper from "./index";
import { shallow } from "enzyme";

const clickFn = jest.fn();

describe("Wrapper", () => {
  it("renders the component", () => {
    const wrapper = shallow(
      <Wrapper assignClass="assignedClass" onClick={clickFn} children="" />
    );

    wrapper
      .find("div")
      .first()
      .simulate("click");

    expect(wrapper.exists()).toBe(true);
    expect(clickFn).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
