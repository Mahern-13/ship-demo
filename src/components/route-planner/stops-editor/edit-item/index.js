import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import TextInput from "../../../text-input";
import Wrapper from "../../../wrapper";
import { Error, Alert } from "../../../alert-handler";
import { Danger as CancelButton, Primary as EditButton } from "../../../button";
import { initUpdateStop } from "../../../../ducks/actions";
import isEqual from "lodash.isequal";

const TYPES = {
  WARNING: "warning",
  DANGER: "danger"
};

const useForm = (fields = {}) => {
  useEffect(() => {
    if (isEqual(prevInput.current, fields)) {
      return;
    }
    setFormState(fields);
  });
  const prevInput = useRef();
  useEffect(() => {
    prevInput.current = fields;
  });

  const [formState, setFormState] = useState(fields);
  const onChange = e => {
    const formData = {
      ...formState,
      [e.target.name]: e.target.value
    };

    setFormState(formData);
  };
  return {
    form: formState,
    onChange
  };
};

const EditStop = ({
  stop,
  alert,
  error,
  onEdit,
  onDelete,
  onCancel,
  editingStepId
}) => {
  const { form, onChange } = useForm({
    formName: stop.name,
    formAddress: stop.address
  });
  // const isFormDisabled = useSelector(state => {
  //   return state.error || state.alert;
  // }, shallowEqual);

  const { formName, formAddress } = form;
  const stopWithForm = { ...stop, name: formName, address: formAddress };
  const stopWithRecommendedAddress = {
    ...stop,
    address: stop.recommendedAddress
  };

  const dispatch = useDispatch();

  const _onSubmitForm = () => {
    dispatch(initUpdateStop(stopWithForm));
  };

  const _onSecondaryClick = useCallback(type => {
    if (type === TYPES.WARNING) {
      return onEdit(stop.id);
    }

    return onDelete(stop.id);
  });

  const _onPrimaryClick = useCallback(type => {
    if (type === TYPES.WARNING) {
      dispatch(initUpdateStop(stopWithRecommendedAddress));
    } else if (type === TYPES.DANGER) {
      dispatch(initUpdateStop(stop));
    }
  });

  const _onAbort = () => {
    return onDelete(stop.id);
  };

  return (
    <Wrapper styling={{ flexDirection: "column", padding: "0" }}>
      {!(error || alert) && editingStepId && (
        <Wrapper
          styling={{
            justifyContent: "space-between",
            padding: "0",
            width: "100%"
          }}
        >
          <Wrapper>
            <TextInput
              id="stop-name-input"
              label="Name"
              type="text"
              name="formName"
              value={formName}
              onChange={onChange}
            />
          </Wrapper>
          <Wrapper styling={{ flexGrow: "2" }}>
            <TextInput
              id="stop-address-input"
              label="Address"
              type="text"
              name="formAddress"
              value={formAddress}
              onChange={onChange}
            />
          </Wrapper>
          <Wrapper>
            <Wrapper
              styling={{
                padding: "0px 5px",
                flexDirection: "column",
                flexShrink: "2"
              }}
            >
              <CancelButton
                text={stop.verified ? "Cancel" : "Delete"}
                onClick={() => (stop.verified ? onCancel() : onDelete(stop.id))}
              />
            </Wrapper>
            <Wrapper
              styling={{
                padding: "0px 5px",
                flexDirection: "column",
                flexShrink: "2"
              }}
            >
              <EditButton text="Update" onClick={_onSubmitForm} />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      )}
      <Wrapper>
        {error && (
          <Error
            className="api-error"
            message={error}
            onPrimaryClick={_onPrimaryClick}
            onSecondaryClick={_onSecondaryClick}
          />
        )}
        {alert && (
          <Alert
            onPrimaryClick={_onPrimaryClick}
            onSecondaryClick={_onSecondaryClick}
            onOverwriteClick={_onAbort}
            className="validation-alert"
            message={stop.recommendedAddress}
          />
        )}
      </Wrapper>
    </Wrapper>
  );
};

export default memo(EditStop, (prevProps, nextProps) =>
  isEqual(prevProps, nextProps)
);
