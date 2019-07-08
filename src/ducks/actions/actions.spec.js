import configureStore from "redux-mock-store";

import * as Actions from "./index.js";

const mockStore = configureStore();
const store = mockStore();

describe("redux actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("dispatches deleteStop and the correct payload", () => {
    store.dispatch(Actions.deleteStop(1));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches createStop and the correct payload", () => {
    store.dispatch(Actions.createStop("test", "test123"));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches updateStop and the correct payload", () => {
    store.dispatch(Actions.updateStop(2, "testing", "testing123"));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches editStopCompletion and the correct payload", () => {
    store.dispatch(Actions.editStopCompletion(1, false));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches verificationReceived and the correct payload", () => {
    store.dispatch(Actions.verificationReceived(true));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches verificationReceived and the correct payload", () => {
    store.dispatch(Actions.verificationFailed(true));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("dispatches selectItem and the correct payload", () => {
    store.dispatch(Actions.selectItem({ id: 1 }, [{ id: 1 }, { id: 2 }]));
    expect(store.getActions()).toMatchSnapshot();
  });
});
