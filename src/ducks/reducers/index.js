import * as Types from "../types";
const initialState = {
  stops: {},
  routes: [],
  alert: null,
  error: null,
  editingStepId: null
};

const updateObj = (oldState, updatedProperties) => ({
  ...oldState,
  ...updatedProperties
});

const _setEditingStep = (state, { id }) => {
  const newState = updateObj(state, {
    editingStepId: id,
    alert: null
  });
  return newState;
};

const _createStop = (state, { stop, alert, error }) => {
  const createdId = stop.name.slice(0, 5) + stop.address.slice(0, 5);
  const newState = updateObj(state, {
    stops: updateObj(state.stops, {
      [createdId]: updateObj(stop, { id: createdId })
    }),
    routes: [...state.routes, createdId],
    alert,
    error,
    editingStepId: createdId
  });
  return newState;
};

const _updateStop = (state, { stop, alert, error }) => {
  const updatedEditId = stop.verified ? null : state.editingStepId;

  const newState = updateObj(state, {
    stops: updateObj(state.stops, {
      [stop.id]: stop
    }),
    alert,
    error,
    editingStepId: updatedEditId
  });
  return newState;
};

const _deleteStop = (state, { id }) => {
  const { [id]: value, ...newStops } = state.stops;
  const updatedEditId = state.editingStepId === id ? null : state.editingStepId;

  const newState = updateObj(state, {
    stops: newStops,
    routes: state.routes.filter(route => route !== id),
    alert: null,
    error: null,
    editingStepId: updatedEditId
  });
  return newState;
};

const _completionOfStop = (state, { stop }) => {
  const newState = updateObj(state, {
    stops: updateObj(state.stops, {
      [stop.id]: updateObj(stop, { completed: !stop.completed })
    })
  });
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.editingStep:
      return _setEditingStep(state, action);
    case Types.completionOfStop:
      return _completionOfStop(state, action);
    case Types.createStop:
      return _createStop(state, action);
    case Types.updateStop:
      return _updateStop(state, action);
    case Types.deleteStop:
      return _deleteStop(state, action);
    default:
      return state;
  }
};

export default reducer;
