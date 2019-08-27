import {
  fireEvent,
  render,
  waitForElement,
  waitForElementToBeRemoved
} from "@testing-library/react";
import axios from "axios";
import React from "react";
import { Provider } from "react-redux";
import store from "../../store";
import RoutePlanner from "./index";

jest.mock("axios");

window.scrollTo = jest.fn();

const addresses = {
  jackson: {
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
  },
  main: {
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
};

const errors = {
  validation: {
    response: {
      data: {
        error: "ValidationError",
        error_description: "Invalid input.",
        non_field_errors: ['"gmail" is not a valid address']
      }
    },
    status: 400,
    statusText: ""
  }
};

function getVerificationResponse(
  address = {},
  provided = "1 Jackson Blvd",
  warnings = ["A different address was found than what was provided."]
) {
  return {
    provided_formatted_address: provided,
    warnings,
    geocoded_address: {
      ...addresses.jackson,
      ...address
    }
  };
}

function getErrorResponse() {
  return { ...errors.validation };
}

describe("RoutePlanner", () => {
  it("Can create a stop with a general address that provides a suggestion", async () => {
    const mockStore = store();
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        statusText: "OK",
        data: getVerificationResponse()
      })
    );

    const { getAllByTestId, getByLabelText, getByText } = render(
      <Provider store={mockStore}>
        <RoutePlanner />
      </Provider>
    );

    const nameInput = getByLabelText("Name");

    fireEvent.change(nameInput, { target: { value: "test" } });

    const addressInput = getByLabelText("Address");
    fireEvent.focus(addressInput);

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
    const mockStore = store({
      stops: {
        "52c7ec40-4595-4c50-a20f-4f78cca8857c": {
          name: "test",
          address: "1 Jackson Blvd",
          verified: false,
          recommendedAddress: "1 Jackson Blvd, Chicago, IL 60604, US",
          completed: false,
          id: "52c7ec40-4595-4c50-a20f-4f78cca8857c"
        }
      },
      routes: ["52c7ec40-4595-4c50-a20f-4f78cca8857c"],
      alert: true,
      error: null,
      editingStepId: "52c7ec40-4595-4c50-a20f-4f78cca8857c",
      isCreatingStop: false,
      didAddRoute: false
    });
    const { getByText } = render(
      <Provider store={mockStore}>
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
    const mockStore = store({
      stops: {
        "52c7ec40-4595-4c50-a20f-4f78cca8857c": {
          name: "test",
          address: "1 Jackson Blvd, Chicago, IL 60604, US",
          verified: true,
          recommendedAddress: "1 Jackson Blvd, Chicago, IL 60604, US",
          completed: false,
          id: "52c7ec40-4595-4c50-a20f-4f78cca8857c"
        }
      },
      routes: ["52c7ec40-4595-4c50-a20f-4f78cca8857c"],
      alert: null,
      error: null,
      editingStepId: null,
      isCreatingStop: false,
      didAddRoute: false
    });
    const { getByLabelText, getByText } = render(
      <Provider store={mockStore}>
        <RoutePlanner />
      </Provider>
    );

    const checkbox = getByLabelText("0");
    fireEvent.click(checkbox);

    const stopName = await getByText("test");

    expect(stopName).toHaveStyle("text-decoration: line-through");
  });

  it("Can cancel an edit of a verified stop", async () => {
    const mockStore = store({
      stops: {
        "52c7ec40-4595-4c50-a20f-4f78cca8857c": {
          name: "test",
          address: "1 Jackson Blvd, Chicago, IL 60604, US",
          verified: true,
          recommendedAddress: "1 Jackson Blvd, Chicago, IL 60604, US",
          completed: true,
          id: "52c7ec40-4595-4c50-a20f-4f78cca8857c"
        }
      },
      routes: ["52c7ec40-4595-4c50-a20f-4f78cca8857c"],
      alert: null,
      error: null,
      editingStepId: null,
      isCreatingStop: false,
      didAddRoute: false
    });
    const { getByLabelText, getByText, getByTestId } = render(
      <Provider store={mockStore}>
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

    await waitForElement(() =>
      getByText("1 Jackson Blvd, Chicago, IL 60604, US")
    );
  });

  it("Can edit a stop from icons", async () => {
    const mockStore = store({
      stops: {
        "52c7ec40-4595-4c50-a20f-4f78cca8857c": {
          name: "test",
          address: "1 Jackson Blvd, Chicago, IL 60604, US",
          verified: true,
          recommendedAddress: "1 Jackson Blvd, Chicago, IL 60604, US",
          completed: false,
          id: "52c7ec40-4595-4c50-a20f-4f78cca8857c"
        }
      },
      routes: ["52c7ec40-4595-4c50-a20f-4f78cca8857c"],
      alert: null,
      error: null,
      editingStepId: null,
      isCreatingStop: false,
      didAddRoute: false
    });
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        statusText: "OK",
        data: getVerificationResponse(addresses.main, "1 Main St")
      })
    );

    const { getByLabelText, getByText, getByTestId } = render(
      <Provider store={mockStore}>
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
    const mockStore = store({
      stops: {
        "52c7ec40-4595-4c50-a20f-4f78cca8857c": {
          name: "newTest",
          address: "1 Main St",
          verified: false,
          recommendedAddress: "1 Main St, Brooklyn, NY 11201, US",
          completed: false,
          id: "52c7ec40-4595-4c50-a20f-4f78cca8857c"
        }
      },
      routes: ["52c7ec40-4595-4c50-a20f-4f78cca8857c"],
      alert: true,
      error: null,
      editingStepId: "52c7ec40-4595-4c50-a20f-4f78cca8857c",
      isCreatingStop: false,
      didAddRoute: false
    });
    axios.post.mockImplementationOnce(() => Promise.reject(getErrorResponse()));

    const { getByLabelText, getByText, getByTestId } = render(
      <Provider store={mockStore}>
        <RoutePlanner />
      </Provider>
    );

    const pencilIcon = getByTestId("pencil-icon-id");
    fireEvent.click(pencilIcon);

    await waitForElement(() => getByLabelText("Stop Address"));
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
    const mockStore = store();
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        statusText: "OK",
        data: getVerificationResponse()
      })
    );

    const { getByLabelText, getByText } = render(
      <Provider store={mockStore}>
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
    const mockStore = store();
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        statusText: "OK",
        data: getVerificationResponse(
          addresses.jackson,
          "1 Jackson Blvd, Chicago, IL 60604, US",
          []
        )
      })
    );

    const { getByLabelText, getByText } = render(
      <Provider store={mockStore}>
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

    await waitForElementToBeRemoved(() => getByText("Please add routes"));
    expect(
      getByText("1 Jackson Blvd, Chicago, IL 60604, US", {
        exact: false
      })
    ).toBeInTheDocument();
  });

  it("Can create a stop which results in an error and clear", async () => {
    const mockStore = store();
    axios.post.mockImplementationOnce(() => Promise.reject(getErrorResponse()));

    const { getByLabelText, getByText } = render(
      <Provider store={mockStore}>
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
