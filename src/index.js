import React from "react";
import createSagaMiddleware from "redux-saga";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./ducks/reducers";
import App from "./components/App";
import rootSaga from "./ducks/sagas";
import { mount } from "enzyme";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);

export const mountWithProvider = children =>
  mount(<Provider store={store}>{children}</Provider>);
