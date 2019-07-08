import React from "react";
import { shallow } from "enzyme";
import Accordion from "./index";
import AccordionItem from "./accordian-item";

describe("Accordion", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Accordion />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render with one item", () => {
    const wrapper = shallow(
      <Accordion>
        <AccordionItem key={1} />
      </Accordion>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render with multiple items", () => {
    const wrapper = shallow(
      <Accordion>
        <AccordionItem key={1} />
        <AccordionItem key={2} />
      </Accordion>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render when an item is expanded", () => {
    const wrapper = shallow(
      <Accordion>
        <AccordionItem key={1} />
        <AccordionItem key={2} expanded />
      </Accordion>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
