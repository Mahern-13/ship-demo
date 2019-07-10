import React from "react";
import TextInput from "./index";
import { shallow } from "enzyme";

const changeFn = jest.fn();

describe("TextInput", () => {
  it("renders the component", () => {
    const wrapper = shallow(
      <TextInput
        id={1}
        label="label"
        value="value"
        onChange={changeFn}
        name="name"
      />
    );

    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "otherValue" } });

    expect(wrapper.exists()).toBe(true);
    expect(changeFn).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
