import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import reducer from "./ducks/reducers";
import rootSaga from "./ducks/sagas";

export default function(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer(initialState),
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
