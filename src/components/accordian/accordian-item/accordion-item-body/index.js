import React, { memo } from "react";
import Wrapper from "../../../wrapper";

export const AccordionItemBody = React.forwardRef(
  ({ children, className, expanded, maxHeight, overflow, id }, ref) => {
    const style = {
      maxHeight,
      overflow,
      transition: "max-height 300ms ease",
      padding: 0
    };

    return (
      <div ref={ref}>
        <Wrapper
          aria-hidden={!expanded}
          aria-labelledby={`item-title-${id}`}
          className={`item-body-${className}`}
          id={`item-body-${id}`}
          styling={style}
        >
          <div style={{ width: "100%" }} className="item-body-wrapper">
            {children}
          </div>
        </Wrapper>
      </div>
    );
  }
);

export default memo(AccordionItemBody);
