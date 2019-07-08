import React from "react";
import Wrapper from "../wrapper";
import { Warning, Danger } from "../card";
import {
  Default as CancelButton,
  Primary as PrimaryButton,
  Danger as RedButton
} from "../button";

import "./style.scss";

export const SIZES = {
  SMALL: "xs",
  MEDIUM: "sm",
  LARGE: "lg"
};

export const TYPES = {
  WARNING: "warning",
  DANGER: "danger"
};

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
    message: message =>
      `(${message}) We're sorry, there was an error processing your request.`
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
  onOverwriteClick,
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
        <Wrapper styling={{ padding: "0px 5px" }}>
          <PrimaryButton
            text={CONFIG[alertType].primaryBtnText}
            onClick={() => onPrimaryClick(alertType)}
            disabled={JSON.stringify(message).indexOf("ValidationError") > -1}
          />
        </Wrapper>
        {alertType === "warning" && (
          <Wrapper styling={{ padding: "0px 5px" }}>
            <RedButton text="Overwrite" onClick={onOverwriteClick} />
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
