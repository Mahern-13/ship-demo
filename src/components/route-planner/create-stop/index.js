import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initCreateStop, setDidAddRoute } from "../../../ducks/actions";
import { Default as ClearButton, Primary as SubmitButton } from "../../button";
import { Primary as PrimaryCard } from "../../card";
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
  const [nameError, setNameError] = useState(false);
  const { form, onChange, resetForm } = useForm({
    name: "",
    address: ""
  });
  const { isAlertError, isCreatingStop, didAddRoute } = useSelector(state => {
    return {
      isAlertError: state.error || state.alert,
      isCreatingStop: state.isCreatingStop,
      didAddRoute: state.didAddRoute
    };
  }, shallowEqual);
  const dispatch = useDispatch();

  const { name, address } = form;

  const _isFormValid = (name, address) => {
    let valid = true;
    if (address.length < 3) {
      setAddressError(true);
      valid = false;
    } else {
      setAddressError(false);
    }

    if (name.length === 0) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    return valid;
  };

  const _onSubmitForm = () => {
    if (isCreatingStop) return;
    const isFormValid = _isFormValid(name, address);
    if (!isFormValid) return;
    dispatch(initCreateStop(name, address));
  };

  useEffect(() => {
    if (didAddRoute) {
      resetForm();
      dispatch(setDidAddRoute(false));
    }
  }, [didAddRoute]);

  const isFormDisabled = isAlertError || isCreatingStop;

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
      <Wrapper>
        <TextInput
          id="name-input"
          label="Name"
          type="text"
          name="name"
          disabled={isFormDisabled}
          value={name}
          onChange={onChange}
        />
        {nameError && <p>Name is required</p>}
      </Wrapper>
      <Wrapper>
        <TextInput
          id="address-input"
          label="Address"
          type="text"
          name="address"
          disabled={isFormDisabled}
          value={address}
          onChange={onChange}
        />
        {addressError && <p>Address must have at least 3 characters</p>}
      </Wrapper>
      <Wrapper styling={{ flexDirection: "row", justifyContent: "flex-end" }}>
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
