import * as Types from "../types";

export const deleteStop = id => ({
  id,
  type: Types.deleteStop
});

export const createStop = ({ stop, stopAlert, stopError, edgeCase }) => ({
  stop,
  edgeCase,
  alert: stopAlert,
  error: stopError,
  type: Types.createStop
});

export const initCreateStop = (name, address) => ({
  name,
  address,
  type: Types.initCreateStop
});

export const updateStop = ({ stop, stopAlert, stopError }) => ({
  stop,
  alert: stopAlert,
  error: stopError,
  type: Types.updateStop
});

export const initUpdateStop = stop => ({
  stop,
  type: Types.initUpdateStop
});

export const setEditingStep = id => ({
  id,
  type: Types.editingStep
});

export const setCompletionOfStop = stop => ({
  stop,
  type: Types.completionOfStop
});

export const setCreatingStopState = bool => ({
  bool,
  type: Types.creatingStopState
});

export const setDidAddRoute = bool => ({
  bool,
  type: Types.setDidAddRoute
});
