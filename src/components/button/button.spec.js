import React from "react";
import { Danger, Default, Primary, Warning } from "./index";
import { shallow } from "enzyme";
import { SIZES } from "../../consts";

const clickFn = jest.fn();

describe("Default", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Default onClick={clickFn} text="text" />).dive();
    wrapper
      .find("button")
      .first()
      .simulate("click");

    expect(wrapper.exists()).toBe(true);
    expect(clickFn).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the component", () => {
    const wrapper = shallow(
      <Default onClick={() => "clicked"} text="text" disabled={true} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("renders the component with SMALL styling", () => {
    const wrapper = shallow(
      <Default onClick={() => "clicked"} text="text" buttonSize={SIZES.SMALL} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("renders the component with MEDIUM styling", () => {
    const wrapper = shallow(
      <Default
        onClick={() => "clicked"}
        text="text"
        buttonSize={SIZES.MEDIUM}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("renders the component with LARGE styling", () => {
    const wrapper = shallow(
      <Default onClick={() => "clicked"} text="text" buttonSize={SIZES.LARGE} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe("Primary", () => {
  const wrapper = shallow(<Primary onClick={() => "clicked"} text="text" />);

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Warning", () => {
  const wrapper = shallow(<Warning onClick={() => "clicked"} text="text" />);

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Danger", () => {
  const wrapper = shallow(<Danger onClick={() => "clicked"} text="text" />);

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
