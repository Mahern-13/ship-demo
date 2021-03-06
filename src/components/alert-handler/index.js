import React from "react";
import { TYPES } from "../../consts";
import { Default as CancelButton, Primary as PrimaryButton } from "../button";
import { Danger, Warning } from "../card";
import Wrapper from "../wrapper";

const CONFIG = {
  warning: {
    cancelBtnText: "Edit",
    primaryBtnText: "Confirm",
    message: message =>
      `The address entered was not an exact match. Did you mean ${message}?`
  },
  danger: {
    cancelBtnText: "Cancel",
    primaryBtnText: "Retry",
    message: message => message
  }
};

const _getComponent = alertType => {
  switch (alertType) {
    case "warning":
      return Warning;
    case "danger":
      return Danger;
    default:
      return Danger;
  }
};

const BaseAlert = ({
  alertType,
  onSecondaryClick,
  onPrimaryClick,
  message
}) => {
  return React.createElement(
    _getComponent(alertType),
    {},
    <Wrapper styling={{ justifyContent: "space-between" }}>
      <Wrapper
        styling={{
          padding: "0px 0px 0px 15px",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {CONFIG[alertType].message(message)}
      </Wrapper>
      <Wrapper styling={{ padding: "0" }}>
        <Wrapper styling={{ padding: "0px 5px" }}>
          <CancelButton
            text={CONFIG[alertType].cancelBtnText}
            onClick={() => onSecondaryClick(alertType)}
          />
        </Wrapper>
        {message.toString().slice(-22) !== "is not a valid address" && (
          <Wrapper styling={{ padding: "0px 5px" }}>
            <PrimaryButton
              text={CONFIG[alertType].primaryBtnText}
              onClick={() => onPrimaryClick(alertType)}
            />
          </Wrapper>
        )}
      </Wrapper>
    </Wrapper>
  );
};

export const Alert = props => (
  <BaseAlert {...props} alertType={TYPES.WARNING} />
);
export const Error = props => <BaseAlert {...props} alertType={TYPES.DANGER} />;
