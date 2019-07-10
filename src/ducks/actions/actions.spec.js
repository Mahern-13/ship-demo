import configureStore from "redux-mock-store";

import * as Actions from "./index.js";

const mockStore = configureStore();
const store = mockStore();

const stop = {
  id: 1,
  name: "test",
  address: "test123",
  completed: false,
  verified: true
};

describe("redux actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("dispatches deleteStop and the correct payload", () => {
    store.dispatch(Actions.deleteStop(1));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches createStop and the correct payload", () => {
    store.dispatch(Actions.createStop(stop, null, null));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches initCreateStop and the correct payload", () => {
    store.dispatch(Actions.initCreateStop("test", "test123"));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches updateStop and the correct payload", () => {
    store.dispatch(Actions.updateStop(stop, null, null));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches initUpdateStop and the correct payload", () => {
    store.dispatch(Actions.initUpdateStop(stop));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches setEditingStep and the correct payload", () => {
    store.dispatch(Actions.setEditingStep(1));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches setCompletionOfStop and the correct payload", () => {
    store.dispatch(Actions.setCompletionOfStop(stop));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches setCreatingStopState and the correct payload", () => {
    store.dispatch(Actions.setCreatingStopState(true));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches setDidAddRoute and the correct payload", () => {
    store.dispatch(Actions.setDidAddRoute(true));
    expect(store.getActions()).toMatchSnapshot();
  });
});
