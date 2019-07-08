import React from "react";
import { shallow } from "enzyme";
import AccordionItem from "./index";

describe("AccordionItem", () => {
  const wrapper = shallow(<AccordionItem />);

  it("renders the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
