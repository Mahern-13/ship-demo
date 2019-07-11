import React from "react";
import { Danger, Default, Primary, Warning } from "./index";
import { SIZES } from "../../consts";
import { render, fireEvent } from "@testing-library/react";

describe("Default", () => {
  it("handles a click", () => {
    const clickFn = jest.fn();

    const { getByText } = render(<Default onClick={clickFn} text="text" />);

    const defaultButton = getByText("text");
    fireEvent.click(defaultButton);

    expect(clickFn).toHaveBeenCalled();
  });

  it("handles a click on a size specific button", () => {
    const clickFn = jest.fn();

    const { getByText } = render(
      <Default onClick={clickFn} text="text" buttonSize={SIZES.LARGE} />
    );

    const largeButton = getByText("text");
    fireEvent.click(largeButton);

    expect(clickFn).toHaveBeenCalled();
  });

  it("rejects a click on a disabled button", () => {
    const clickFn = jest.fn();

    const { getByText } = render(
      <Default
        onClick={clickFn}
        text="text"
        buttonSize={SIZES.SMALL}
        disabled={true}
      />
    );

    const disabledButton = getByText("text");
    fireEvent.click(disabledButton);

    expect(clickFn).toHaveBeenCalledTimes(0);
  });
});

describe("Danger", () => {
  it("handles a click", () => {
    const clickFn = jest.fn();

    const { getByText } = render(<Danger onClick={clickFn} text="text" />);

    const dangerButton = getByText("text");
    fireEvent.click(dangerButton);

    expect(clickFn).toHaveBeenCalled();
  });
});

describe("Primary", () => {
  it("handles a click", () => {
    const clickFn = jest.fn();

    const { getByText } = render(<Primary onClick={clickFn} text="text" />);

    const primaryButton = getByText("text");
    fireEvent.click(primaryButton);

    expect(clickFn).toHaveBeenCalled();
  });
});

describe("Warning", () => {
  it("handles a click", () => {
    const clickFn = jest.fn();

    const { getByText } = render(<Warning onClick={clickFn} text="text" />);

    const warningButton = getByText("text");
    fireEvent.click(warningButton);

    expect(clickFn).toHaveBeenCalled();
  });
});
