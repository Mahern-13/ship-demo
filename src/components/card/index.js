import React from "react";
import Wrapper from "../wrapper";

import "./style.scss";
import { TYPES } from "../../consts";

const BaseCard = ({ header, children, cardType }) => (
  <div className={"card " + `card-${cardType || TYPES.default}`}>
    <div className="card-heading">{header}</div>
    <div className="card-heading-border" />
    <Wrapper styling={{ flexDirection: "column" }}>{children}</Wrapper>
  </div>
);

export const Default = props => (
  <BaseCard {...props} cardType={TYPES.DEFAULT} />
);

export const Primary = props => (
  <BaseCard {...props} cardType={TYPES.PRIMARY} />
);
export const Warning = props => (
  <BaseCard {...props} cardType={TYPES.WARNING} />
);
export const Danger = props => <BaseCard {...props} cardType={TYPES.DANGER} />;
