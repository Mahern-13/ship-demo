import Reducers from "./index.js";
import * as Types from "../types/index.js";

const initialState = {
  stops: [
    {
      id: 1,
      name: "test",
      address: "test123",
      completed: false,
      verified: true
    }
  ],
  routes: [1],
  alert: null,
  error: null,
  editingStepId: null,
  isCreatingStop: false,
  didAddRoute: false
};

describe("redux reducers", () => {
  xit("returns initial state when action type is unrecognized", () => {
    const action = { type: "DUMMY_ACTION" };

    expect(Reducers(initialState, action)).toMatchSnapshot();
  });

  xit("returns the correct state when DELETE_STOP is reduced", () => {
    const action = { type: Types.deleteStop, stop: { id: 1 } };

    expect(Reducers(initialState, action)).toMatchSnapshot();
  });

  xit("returns the correct state when CREATE_STOP is reduced", () => {
    const action = {
      type: Types.createStop,
      stop: {
        id: 2,
        name: "test",
        address: "test123",
        comleted: false,
        verified: false
      },
      alert: null,
      error: null
    };

    const result = Reducers(initialState, action);

    expect(result.routes.length).toBeGreaterThan(1);
  });

  xit("returns the correct state when UPDATE_STOP is reduced", () => {
    const action = {
      type: Types.updateStop,
      stop: {
        id: 1,
        name: "something new",
        address: "testabc",
        completed: false,
        verified: false
      },
      alert: false,
      error: false
    };

    expect(Reducers(initialState, action)).toMatchSnapshot();
  });

  xit("returns the correct state when COMPLETION_OF_STOP is reduced", () => {
    const action = {
      type: Types.completionOfStop,
      stop: {
        id: 1,
        name: "test",
        address: "test123",
        completed: false,
        verified: false
      }
    };

    expect(Reducers(initialState, action)).toMatchSnapshot();
  });
});
