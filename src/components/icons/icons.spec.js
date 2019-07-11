import React from "react";
import { TrashIcon, PencilIcon } from "./index";
import { render, fireEvent } from "@testing-library/react";

describe("TrashIcon", () => {
  it("handles a click", () => {
    const clickFn = jest.fn();

    const { getByTestId } = render(<TrashIcon size={20} onClick={clickFn} />);

    const trashIcon = getByTestId("trash-icon-id");
    fireEvent.click(trashIcon);

    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  //   it("handles a secondary click", () => {
  //     const primaryHandler = jest.fn();
  //     const secondaryHandler = jest.fn();

  //     const { getByText } = render(
  //       <Alert
  //         onSecondaryClick={secondaryHandler}
  //         onPrimaryClick={primaryHandler}
  //         message="message"
  //       />
  //     );

  //     const editButton = getByText("Edit");
  //     fireEvent.click(editButton);

  //     expect(secondaryHandler).toHaveBeenCalledWith("warning");
  //   });
});

// describe("Error", () => {
//   it("handles a primary click", () => {
//     const primaryHandler = jest.fn();
//     const secondaryHandler = jest.fn();

//     const { getByText } = render(
//       <Error
//         onSecondaryClick={secondaryHandler}
//         onPrimaryClick={primaryHandler}
//         message="message"
//       />
//     );

//     const retryButton = getByText("Retry");
//     fireEvent.click(retryButton);

//     expect(primaryHandler).toHaveBeenCalledWith("danger");
//   });

//   it("handles a secondary click", () => {
//     const primaryHandler = jest.fn();
//     const secondaryHandler = jest.fn();

//     const { getByText } = render(
//       <Error
//         onSecondaryClick={secondaryHandler}
//         onPrimaryClick={primaryHandler}
//         message="message"
//       />
//     );

//     const cancelButton = getByText("Cancel");
//     fireEvent.click(cancelButton);

//     expect(secondaryHandler).toHaveBeenCalledWith("danger");
//   });
// });
