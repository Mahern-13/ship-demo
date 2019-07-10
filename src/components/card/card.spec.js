import { shallow } from "enzyme";
import React from "react";
import { Default, Primary, Warning, Danger } from "./index";

describe("Default", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Default header="header" children="children" />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Primary", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Primary header="header" children="children" />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Warning", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Warning header="header" children="children" />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Danger", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Danger header="header" children="children" />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
