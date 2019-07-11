import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initCreateStop, setDidAddRoute } from "../../../ducks/actions";
import { Default as ClearButton, Primary as SubmitButton } from "../../button";
import { Primary as PrimaryCard, Default as DefaultCard } from "../../card";
import TextInput from "../../text-input";
import Wrapper from "../../wrapper";

const useForm = (fields = {}) => {
  const [formState, setFormState] = useState(fields);
  const onChange = e => {
    const formData = {
      ...formState,
      [e.target.name]: e.target.value
    };

    setFormState(formData);
  };

  const resetForm = () => {
    setFormState(fields);
  };
  return {
    form: formState,
    onChange,
    resetForm
  };
};

const CreateStop = () => {
  const [addressError, setAddressError] = useState(false);
  const { form, onChange, resetForm } = useForm({
    name: "",
    address: ""
  });
  const {
    isAlertError,
    isCreatingStop,
    didAddRoute,
    editingStepId
  } = useSelector(state => {
    return {
      isAlertError: state.error || state.alert,
      isCreatingStop: state.isCreatingStop,
      didAddRoute: state.didAddRoute,
      editingStepId: state.editingStepId
    };
  }, shallowEqual);
  const dispatch = useDispatch();

  const { name, address } = form;

  const _isFormValid = address => {
    let valid = true;
    if (address.trim().length < 3) {
      setAddressError(true);
      valid = false;
    } else {
      setAddressError(false);
    }

    return valid;
  };

  const _onSubmitForm = () => {
    if (isCreatingStop) return;
    const isFormValid = _isFormValid(address);
    if (!isFormValid) return;
    dispatch(initCreateStop(name, address));
  };

  useEffect(() => {
    if (didAddRoute) {
      resetForm();
      dispatch(setDidAddRoute(false));
    }
  }, [didAddRoute]);

  const isFormDisabled = isAlertError || isCreatingStop || editingStepId;

  return (
    <PrimaryCard
      className="create-stop"
      header={
        <Wrapper styling={{ justifyContent: "flex-start" }}>
          Book a Stop
        </Wrapper>
      }
      cardType="primary"
    >
      <Wrapper styling={{ flexDirection: "column" }}>
        <TextInput
          id="name-input"
          label="Name"
          type="text"
          name="name"
          disabled={isFormDisabled}
          value={name}
          onChange={onChange}
        />
      </Wrapper>
      <Wrapper styling={{ flexDirection: "column" }}>
        <TextInput
          id="address-input"
          label="Address"
          type="text"
          name="address"
          disabled={isFormDisabled}
          value={address}
          onChange={onChange}
        />
      </Wrapper>
      <Wrapper
        styling={{
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
      >
        {addressError && (
          <DefaultCard header={false}>
            &#8226; Address must have at least 3 characters
          </DefaultCard>
        )}
        <Wrapper>
          <ClearButton
            disabled={isFormDisabled}
            text="Clear"
            onClick={resetForm}
            buttonSize="LARGE"
          />
        </Wrapper>
        <Wrapper>
          <SubmitButton
            disabled={isFormDisabled}
            text={isCreatingStop ? "Submitting..." : "Submit"}
            onClick={_onSubmitForm}
            buttonSize="LARGE"
          />
        </Wrapper>
      </Wrapper>
    </PrimaryCard>
  );
};

export default memo(CreateStop);
