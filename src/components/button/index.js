import React from "react";
import "./style.scss";
import { SIZES, TYPES } from "../../consts";

const BaseButton = ({ text, onClick, disabled, buttonType, buttonSize }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`button-${buttonType} button button-${[
      SIZES[buttonSize] || SIZES.MEDIUM
    ]}`}
  >
    {text}
  </button>
);

export const Default = props => (
  <BaseButton {...props} buttonType={TYPES.DEFAULT} />
);

export const Primary = props => (
  <BaseButton {...props} buttonType={TYPES.PRIMARY} />
);
export const Warning = props => (
  <BaseButton {...props} buttonType={TYPES.WARNING} />
);
export const Danger = props => (
  <BaseButton {...props} buttonType={TYPES.DANGER} />
);
