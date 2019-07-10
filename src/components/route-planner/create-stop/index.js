import React, { memo, useState } from "react";
import TextInput from "../../text-input";
import { Primary as PrimaryCard } from "../../card";
import Wrapper from "../../wrapper";
import { Primary as SubmitButton } from "../../button";
import { Default as ClearButton } from "../../button";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import "./style.scss";
import { initCreateStop } from "../../../ducks/actions";

const useForm = (fields = {}) => {
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

const CreateStop = () => {
  const [addressError, setAddressError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const { form, onChange } = useForm({
    name: "",
    address: "",
    clearForm: shouldClearForm
  });
  const { isFormDisabled, isCreatingStop } = useSelector(state => {
    return {
      isFormDisabled: state.error || state.alert,
      isCreatingStop: state.isCreatingStop
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  let shouldClearForm = false;

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
    clearForm();
  };

  // useEffect(() => {
  //   if (isEqual(prevInput.current, fields)) {
  //     return;
  //   }
  //   setFormState(fields);
  // });
  // const prevInput = useRef();
  // useEffect(() => {
  //   prevInput.current = fields;
  // });

  const clearForm = () => console.log("clear");

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
            text="Clear"
            onClick={() => clearForm()}
            buttonSize="LARGE"
          />
        </Wrapper>
        <Wrapper>
          <SubmitButton
            disabled={isFormDisabled || isCreatingStop}
            text="Submit"
            onClick={_onSubmitForm}
            buttonSize="LARGE"
          />
        </Wrapper>
      </Wrapper>
    </PrimaryCard>
  );
};

export default memo(CreateStop);
