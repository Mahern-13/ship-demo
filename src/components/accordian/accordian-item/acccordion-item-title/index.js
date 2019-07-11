import React, { memo } from "react";
import Wrapper from "../../../wrapper";

const AccordionItemTitle = ({ className, expanded, title, id }) => {
  const style = {
    cursor: "pointer",
    margin: 0
  };

  if (typeof title === "object") {
    return React.cloneElement(title, {
      id: `item-title-${id}`,
      "aria-controls": `item-body-${id}`
    });
  }

  return (
    <Wrapper
      aria-controls={`item-body-${id}`}
      aria-expanded={expanded}
      className={`item-title-${className}`}
      id={`item-title-${id}`}
      style={style}
    >
      {title}
    </Wrapper>
  );
};

export default memo(AccordionItemTitle);
