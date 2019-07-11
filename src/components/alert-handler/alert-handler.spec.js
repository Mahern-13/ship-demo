import React from "react";
import { Alert, Error } from "./index";
import { render, fireEvent } from "@testing-library/react";

describe("Alert", () => {
  it("handles a primary click", () => {
    const primaryHandler = jest.fn();
    const secondaryHandler = jest.fn();

    const { getByText } = render(
      <Alert
        onSecondaryClick={secondaryHandler}
        onPrimaryClick={primaryHandler}
        message="message"
      />
    );

    const updateButton = getByText("Confirm");
    fireEvent.click(updateButton);

    expect(primaryHandler).toHaveBeenCalledWith("warning");
  });

  it("handles a secondary click", () => {
    const primaryHandler = jest.fn();
    const secondaryHandler = jest.fn();

    const { getByText } = render(
      <Alert
        onSecondaryClick={secondaryHandler}
        onPrimaryClick={primaryHandler}
        message="message"
      />
    );

    const editButton = getByText("Edit");
    fireEvent.click(editButton);

    expect(secondaryHandler).toHaveBeenCalledWith("warning");
  });
});

describe("Error", () => {
  it("handles a primary click", () => {
    const primaryHandler = jest.fn();
    const secondaryHandler = jest.fn();

    const { getByText } = render(
      <Error
        onSecondaryClick={secondaryHandler}
        onPrimaryClick={primaryHandler}
        message="message"
      />
    );

    const retryButton = getByText("Retry");
    fireEvent.click(retryButton);

    expect(primaryHandler).toHaveBeenCalledWith("danger");
  });

  it("handles a secondary click", () => {
    const primaryHandler = jest.fn();
    const secondaryHandler = jest.fn();

    const { getByText } = render(
      <Error
        onSecondaryClick={secondaryHandler}
        onPrimaryClick={primaryHandler}
        message="message"
      />
    );

    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(secondaryHandler).toHaveBeenCalledWith("danger");
  });
});
