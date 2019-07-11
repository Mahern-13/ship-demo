// import { shallow } from "enzyme";
// import React from "react";
// import { Default, Primary, Warning, Danger } from "./index";

import React from "react";
import { Primary } from "./index";
import { render, fireEvent } from "@testing-library/react";

describe("Primary", () => {
  it("handles a click", () => {
    const { getByText } = render(
      <Primary header="header" children="children" />
    );

    const header = getByText("header");
    expect(header).toBeInTheDocument();

    const children = getByText("children");
    expect(children).toBeInTheDocument();
  });
});
