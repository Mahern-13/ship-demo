import Reducers from "./index.js";
import * as Types from "../types/index.js";

const initialState = {
  stops: [{ id: 1, name: "test", address: "test123", complete: false }]
};

describe("redux reducers", () => {
  it("returns initial state when action type is unrecognized", () => {
    const action = { type: "DUMMY_ACTION" };

    expect(Reducers(initialState, action)).toMatchSnapshot();
  });

  it("returns the correct state when DELETE_STOP is reduced", () => {
    const action = { type: Types.deleteStop, stop: { id: 1 } };

    expect(Reducers(initialState, action)).toMatchSnapshot();
  });

  it("returns the correct state when CREATE_STOP is reduced", () => {
    const action = {
      type: Types.createStop,
      stop: { id: 2, name: "test", address: "test123" }
    };

    expect(Reducers(initialState, action)).toMatchSnapshot();
  });

  it("returns the correct state when UPDATE_STOP is reduced", () => {
    const action = {
      type: Types.updateStop,
      stop: { id: 1, name: "something new", address: "testabc" }
    };

    expect(Reducers(initialState, action)).toMatchSnapshot();
  });

  it("returns the correct state when EDIT_STOP_COMPLETION is reduced", () => {
    const action = {
      type: Types.editStopCompletion,
      stop: { id: 1, complete: true }
    };

    expect(Reducers(initialState, action)).toMatchSnapshot();
  });

  it("returns the correct state when SELECT_ITEM is reduced", () => {
    const action = {
      type: Types.selectItem,
      activeItem: { id: 1 },
      stops: [{ id: 1 }, { id: 1 }]
    };

    expect(Reducers(initialState, action)).toMatchSnapshot();
  });
});
