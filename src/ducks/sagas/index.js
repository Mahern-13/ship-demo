import { put, call, all, takeEvery } from "redux-saga/effects";
import { verifyAddress } from "../../api/stop-api";
import * as Types from "../types";
import { createStop, updateStop, setCreatingStopState } from "../actions";

const withAsync = async fn => {
  try {
    const response = await fn();
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

function* initCreateStop({ name, address }) {
  let stop = {
    name,
    address,
    verified: false,
    recommendedAddress: "",
    completed: false
  };
  let stopError = null;
  let stopAlert = null;
  try {
    yield put(setCreatingStopState(true));
    const [response, error] = yield call(withAsync, () =>
      verifyAddress(address)
    );
    // Error
    if (error) {
      stopError = error;
    } else {
      // Success or warning
      if (response.warnings && response.warnings.length) {
        const { formatted_address } = response.geocoded_address;
        stopAlert = true;
        stop.recommendedAddress = formatted_address;
      } else {
        stop.verified = true;
      }
    }

    yield put(
      createStop({
        stop,
        stopAlert,
        stopError
      })
    );
  } catch (err) {
    console.error(err);
  } finally {
    yield put(setCreatingStopState(false));
  }
}

function* initUpdateStop({ stop }) {
  let stopError = null;
  let stopAlert = null;

  try {
    const [response, error] = yield call(withAsync, () =>
      verifyAddress(stop.address)
    );

    console.log("initUpdate", response, error);
    // Error
    if (error) {
      stopError = error;
      stop.verified = false;
      stop.recommendedAddress = "";
    } else {
      // Success or warning
      if (response.warnings && response.warnings.length) {
        stopAlert = true;
        stop.recommendedAddress = response.geocoded_address.formatted_address;
        stop.verified = false;
      } else {
        stop.verified = true;
      }
    }
    yield put(
      updateStop({
        stop,
        stopAlert,
        stopError
      })
    );
  } catch (err) {
    console.error(err);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(Types.initCreateStop, initCreateStop),
    takeEvery(Types.initUpdateStop, initUpdateStop)
  ]);
}
