import React from "react";
import { shallow } from "enzyme";
import { Default, Primary, Warning, Danger } from "./index";

describe("Default Button", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Default text="test" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the component with disabled prop", () => {
    const wrapper = shallow(<Default text="test" disabled={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Primary Button", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Primary text="test" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Warning Button", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Warning text="test" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Danger Button", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Danger text="test" />);
    expect(wrapper).toMatchSnapshot();
  });
});
