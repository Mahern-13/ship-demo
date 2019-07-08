import React from "react";
import { shallow } from "enzyme";
import { Default, Primary, Warning, Danger } from "./index";

describe("Default Card", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Default header="Test">Testing</Default>);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the component without a header", () => {
    const wrapper = shallow(<Default>Testing</Default>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Primary Card", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Primary header="Test">Testing</Primary>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Warning Card", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Warning header="Test">Testing</Warning>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Danger Card", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Danger header="Test">Testing</Danger>);
    expect(wrapper).toMatchSnapshot();
  });
});
