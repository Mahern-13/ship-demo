import React from "react";
import Checkbox from "./index";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore();
const store = mockStore();

describe("Checkbox", () => {
  it("renders the component as checked", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Checkbox
          label="text"
          stop={{
            address: "address",
            completed: true,
            id: "ef457741-fb6d-4650-83c3-b786b099fed8",
            name: "name",
            recommendedAddress: "111 address",
            verified: true
          }}
        />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
