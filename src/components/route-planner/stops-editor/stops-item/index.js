import React, { memo } from "react";
import Checkbox from "../../../checkbox";
import { PencilIcon, TrashIcon } from "../../../icons";
import Wrapper from "../../../wrapper";

const iconStyle = { padding: "0px 5px" };

const StopsItem = ({ index, stop, onEdit, onDelete, editingStepId }) => {
  const { name, address, completed } = stop;

  const elStyle = {
    ...iconStyle,
    flexDirection: "column",
    alignItems: "center",
    textDecoration: `${completed ? "line-through" : "none"}`
  };

  return (
    <Wrapper
      assignClass="stop-item"
      styling={{ justifyContent: "space-between" }}
    >
      <Wrapper styling={{ justifyContent: "flex-start" }}>
        <Wrapper styling={iconStyle}>
          <PencilIcon
            disabled={!!editingStepId}
            onClick={() => onEdit(stop.id)}
            size={20}
          />
        </Wrapper>
        <Wrapper styling={iconStyle}>
          <TrashIcon
            disabled={!!editingStepId}
            onClick={() => onDelete(stop.id)}
            size={20}
          />
        </Wrapper>
        <Wrapper styling={elStyle}>
          <Checkbox label={index} stop={stop} />
        </Wrapper>
        <Wrapper styling={{ padding: "0px 0px 0px 150px" }}>
          <Wrapper styling={elStyle}>{name}</Wrapper>
        </Wrapper>
      </Wrapper>

      <Wrapper
        styling={{ justifyContent: "flex-end" }}
        styling={{ padding: "0" }}
      >
        <Wrapper styling={elStyle}>{address}</Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default memo(StopsItem);
