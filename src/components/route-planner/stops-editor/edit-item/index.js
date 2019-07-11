import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import TextInput from "../../../text-input";
import Wrapper from "../../../wrapper";
import { Error, Alert } from "../../../alert-handler";
import { Danger as CancelButton, Primary as EditButton } from "../../../button";
import { initUpdateStop, updateStop } from "../../../../ducks/actions";
import isEqual from "lodash.isequal";
import { TYPES } from "../../../../consts";

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
  console.log("im in this shit", stop);
  const { form, onChange } = useForm({
    formName: stop.name,
    formAddress: stop.address
  });

  const { formName, formAddress } = form;

  const dispatch = useDispatch();

  const _onSubmitForm = () => {
    const stopWithForm = { ...stop, name: formName, address: formAddress };
    console.log("Hey, I'm stop with form", stopWithForm);
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
      const stopWithRecommendedAddress = {
        ...stop,
        verified: true,
        address: stop.recommendedAddress
      };
      dispatch(
        updateStop({
          stop: stopWithRecommendedAddress,
          stopAlert: null,
          stopError: null
        })
      );
    } else if (type === TYPES.DANGER) {
      dispatch(initUpdateStop(stop));
    }
  });

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
              label="Stop Name"
              type="text"
              name="formName"
              value={formName}
              onChange={onChange}
            />
          </Wrapper>
          <Wrapper styling={{ flexGrow: "2" }}>
            <TextInput
              id="stop-address-input"
              label="Stop Address"
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
