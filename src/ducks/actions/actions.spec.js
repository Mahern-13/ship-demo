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

  xit("dispatches deleteStop and the correct payload", () => {
    store.dispatch(Actions.deleteStop(1));
    expect(store.getActions()).toMatchSnapshot();
  });

  xit("dispatches createStop and the correct payload", () => {
    store.dispatch(Actions.createStop(stop, null, null));
    expect(store.getActions()).toMatchSnapshot();
  });

  xit("dispatches initCreateStop and the correct payload", () => {
    store.dispatch(Actions.initCreateStop("test", "test123"));
    expect(store.getActions()).toMatchSnapshot();
  });

  xit("dispatches updateStop and the correct payload", () => {
    store.dispatch(Actions.updateStop(stop, null, null));
    expect(store.getActions()).toMatchSnapshot();
  });

  xit("dispatches initUpdateStop and the correct payload", () => {
    store.dispatch(Actions.initUpdateStop(stop));
    expect(store.getActions()).toMatchSnapshot();
  });

  xit("dispatches setEditingStep and the correct payload", () => {
    store.dispatch(Actions.setEditingStep(1));
    expect(store.getActions()).toMatchSnapshot();
  });

  xit("dispatches setCompletionOfStop and the correct payload", () => {
    store.dispatch(Actions.setCompletionOfStop(stop));
    expect(store.getActions()).toMatchSnapshot();
  });

  xit("dispatches setCreatingStopState and the correct payload", () => {
    store.dispatch(Actions.setCreatingStopState(true));
    expect(store.getActions()).toMatchSnapshot();
  });

  xit("dispatches setDidAddRoute and the correct payload", () => {
    store.dispatch(Actions.setDidAddRoute(true));
    expect(store.getActions()).toMatchSnapshot();
  });
});
