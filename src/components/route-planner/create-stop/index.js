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
  let shouldClearForm = false;

  const { form, onChange } = useForm({
    name: "",
    address: "",
    clearForm: shouldClearForm
  });
  const isFormDisabled = useSelector(state => {
    return state.error || state.alert;
  }, shallowEqual);
  const dispatch = useDispatch();

  const { name, address } = form;

  const _onSubmitForm = () => {
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

  const clearForm = () => (shouldClearForm = true);

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
            disabled={isFormDisabled}
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
