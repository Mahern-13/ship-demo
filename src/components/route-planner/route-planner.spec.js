import React from "react";
import store from "../../store";
import {
  render,
  prettyDOM,
  fireEvent,
  waitForElement,
  wait
} from "@testing-library/react";
import { Provider } from "react-redux";
import RoutePlanner from "./index";
import axios from "axios";

jest.mock("axios");

window.scrollTo = jest.fn();

describe("RoutePlanner", () => {
  const store1 = store();
  const store2 = store();
  const store3 = store();
  it("Can create a stop with a general address that provides a suggestion", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        statusText: "OK",
        data: {
          provided_formatted_address: "1 Jackson Blvd",
          warnings: ["A different address was found than what was provided."],
          geocoded_address: {
            address_1: "1 Jackson Blvd",
            address_2: null,
            city: "Chicago",
            state_province: "IL",
            postal_code: "60604",
            country: "US",
            phone_number: null,
            latitude: 41.8780428,
            longitude: -87.62767,
            timezone: "America/Chicago",
            formatted_address: "1 Jackson Blvd, Chicago, IL 60604, US"
          }
        }
      })
    );

    const { getByLabelText, getByText } = render(
      <Provider store={store1}>
        <RoutePlanner />
      </Provider>
    );

    const nameInput = getByLabelText("Name");
    fireEvent.click(nameInput);
    fireEvent.change(nameInput, { target: { value: "test" } });

    const addressInput = getByLabelText("Address");
    fireEvent.click(addressInput);
    fireEvent.change(addressInput, { target: { value: "1 Jackson Blvd" } });

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    await waitForElement(() =>
      getByText("Did you mean 1 Jackson Blvd, Chicago, IL 60604, US", {
        exact: false
      })
    );
  });

  it("Can confirm a suggested address", async () => {
    const { getByText } = render(
      <Provider store={store1}>
        <RoutePlanner />
      </Provider>
    );
    const confirmButton = getByText("Confirm");
    fireEvent.click(confirmButton);

    await waitForElement(() =>
      getByText("1 Jackson Blvd, Chicago, IL 60604, US")
    );
  });

  it("Can complete a verified stop", async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store1}>
        <RoutePlanner />
      </Provider>
    );

    const checkbox = getByLabelText("0");
    fireEvent.click(checkbox);

    const stopName = await getByText("test");

    expect(stopName).toHaveStyle("text-decoration: line-through");
  });

  it("Can cancel an edit of a verified stop", async () => {
    const { getByLabelText, getByText, getByTestId, debug } = render(
      <Provider store={store1}>
        <RoutePlanner />
      </Provider>
    );

    const checkbox = getByLabelText("0");
    fireEvent.click(checkbox);

    const stopName = getByText("test");

    expect(stopName).toHaveStyle("text-decoration: none");

    const pencilIcon = getByTestId("pencil-icon-id");
    fireEvent.click(pencilIcon);

    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    debug();

    await waitForElement(() =>
      getByText("1 Jackson Blvd, Chicago, IL 60604, US")
    );
  });

  it("Can edit a stop from icons", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        provided_formatted_address: "1 Main St",
        warnings: ["A different address was found than what was provided."],
        geocoded_address: {
          address_1: "1 Main St",
          address_2: null,
          city: "Brooklyn",
          state_province: "NY",
          postal_code: "11201",
          country: "US",
          phone_number: null,
          latitude: 40.70362919999999,
          longitude: -73.9904097,
          timezone: "America/New_York",
          formatted_address: "1 Main St, Brooklyn, NY 11201, US"
        }
      })
    );

    const { getByLabelText, getByText, getByTestId, debug } = render(
      <Provider store={store1}>
        <RoutePlanner />
      </Provider>
    );

    const pencilIcon = getByTestId("pencil-icon-id");
    fireEvent.click(pencilIcon);

    const stopNameInput = getByLabelText("Stop Name");
    fireEvent.change(stopNameInput, { target: { value: "newTest" } });

    const stopAddressInput = getByLabelText("Stop Address");
    fireEvent.change(stopAddressInput, {
      target: { value: "1 Main St" }
    });

    const updateButton = getByText("Update");
    fireEvent.click(updateButton);

    await waitForElement(() =>
      getByText("Did you mean 1 Main St, Brooklyn, NY 11201, US", {
        exact: false
      })
    );
  });

  it("Can throw an error when editing a stop", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            error: "ValidationError",
            error_description: "Invalid input.",
            non_field_errors: ['"gmail" is not a valid address']
          }
        },
        status: 400,
        statusText: ""
      })
    );

    const { getByLabelText, getByText, getByTestId } = render(
      <Provider store={store1}>
        <RoutePlanner />
      </Provider>
    );

    const pencilIcon = getByTestId("pencil-icon-id");
    fireEvent.click(pencilIcon);

    const stopAddressInput = getByLabelText("Stop Address");
    fireEvent.change(stopAddressInput, {
      target: { value: "gmail" }
    });

    const updateButton = getByText("Update");
    fireEvent.click(updateButton);

    await waitForElement(() =>
      getByText('"gmail" is not a valid address', {
        exact: false
      })
    );
  });

  it("Can edit a stop from alert and delete when not verifiedC", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        statusText: "OK",
        data: {
          provided_formatted_address: "1 Jackson Blvd",
          warnings: ["A different address was found than what was provided."],
          geocoded_address: {
            address_1: "1 Jackson Blvd",
            address_2: null,
            city: "Chicago",
            state_province: "IL",
            postal_code: "60604",
            country: "US",
            phone_number: null,
            latitude: 41.8780428,
            longitude: -87.62767,
            timezone: "America/Chicago",
            formatted_address: "1 Jackson Blvd, Chicago, IL 60604, US"
          }
        }
      })
    );

    const { getByLabelText, getByText } = render(
      <Provider store={store2}>
        <RoutePlanner />
      </Provider>
    );

    const nameInput = getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "test" } });

    const addressInput = getByLabelText("Address");
    fireEvent.change(addressInput, { target: { value: "1 Jackson Blvd" } });

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    await waitForElement(() =>
      getByText("Did you mean 1 Jackson Blvd, Chicago, IL 60604, US", {
        exact: false
      })
    );

    const editButton = getByText("Edit");
    fireEvent.click(editButton);

    const elAddressInput = getByLabelText("Stop Address");

    expect(elAddressInput).toBeInTheDocument();

    const stopNameInput = getByLabelText("Stop Name");
    fireEvent.change(stopNameInput, { target: { value: "newTest" } });

    const stopAddressInput = getByLabelText("Stop Address");
    fireEvent.change(stopAddressInput, {
      target: { value: "1 Jackson Blvd, Chicago, IL 60604, US" }
    });

    const DeleteButton = getByText("Delete");
    fireEvent.click(DeleteButton);

    await waitForElement(() => getByText("Please add routes"));
  });

  it("Can create a stop with an exact address that does not provide a suggestion", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        statusText: "OK",
        data: {
          provided_formatted_address: "1 Jackson Blvd, Chicago, IL 60604, US",
          warnings: [],
          geocoded_address: {
            address_1: "1 Jackson Blvd",
            address_2: null,
            city: "Chicago",
            state_province: "IL",
            postal_code: "60604",
            country: "US",
            phone_number: null,
            latitude: 41.8780428,
            longitude: -87.62767,
            timezone: "America/Chicago",
            formatted_address: "1 Jackson Blvd, Chicago, IL 60604, US"
          }
        }
      })
    );

    const { getByLabelText, getByText } = render(
      <Provider store={store3}>
        <RoutePlanner />
      </Provider>
    );

    const nameInput = getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "test" } });

    const addressInput = getByLabelText("Address");
    fireEvent.change(addressInput, {
      target: { value: "1 Jackson Blvd, Chicago, IL 60604, US" }
    });

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    await waitForElement(() =>
      getByText("1 Jackson Blvd, Chicago, IL 60604, US", {
        exact: false
      })
    );
  });

  it("Can create a stop which results in an error and clear", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            error: "ValidationError",
            error_description: "Invalid input.",
            non_field_errors: ['"gmail" is not a valid address']
          }
        },
        status: 400,
        statusText: ""
      })
    );

    const { getByLabelText, getByText } = render(
      <Provider store={store()}>
        <RoutePlanner />
      </Provider>
    );

    const nameInput = getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "test" } });

    const addressInput = getByLabelText("Address");
    fireEvent.change(addressInput, { target: { value: "gmail" } });

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    await waitForElement(() =>
      getByText('"gmail" is not a valid address', {
        exact: false
      })
    );

    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    await waitForElement(() => getByText("Please add routes"));
  });
});
