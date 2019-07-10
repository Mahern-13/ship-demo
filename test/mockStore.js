import createSagaMiddleware from "redux-saga";
import { applyMiddleware } from "redux";
import configureMockStore from "redux-mock-store";
import rootSaga from "../src/ducks/sagas";
import reducer from "../src/ducks/reducers";

const sagaMiddleware = createSagaMiddleware();

const store = configureMockStore(reducer, applyMiddleware(sagaMiddleware));

export default store;
