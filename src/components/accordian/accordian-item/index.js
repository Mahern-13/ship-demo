import React, { memo, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import usePrevious from "../../../hooks/usePrevious";
import Wrapper from "../../wrapper";
import AccordionItemTitle from "./acccordion-item-title";
import AccordionItemBody from "./accordion-item-body";

const AccordionItem = props => {
  const [maxHeight, setMaxHeight] = useState(props.expanded ? "none" : 0);
  const [overflow, setOverflow] = useState(
    props.expanded ? "visible" : "hidden"
  );
  const accordionBodyRef = useRef();
  const timeoutRef = useRef();
  const previousExpanded = usePrevious(props.expanded);
  const previousChildren = usePrevious(props.children);
  const { children, title, id, className, disabled, expanded } = props;

  const getClassName = {
    className: `item ${className} ${disabled ? "item-disabled" : ""}
      ${expanded ? "item-expanded" : ""}`
  };

  const updateMaxHeight = collapse => {
    clearTimeout(timeoutRef.current);

    const bodyNode = ReactDOM.findDOMNode(accordionBodyRef.current);

    setMaxHeight(expanded || collapse ? bodyNode.scrollHeight + "px" : 0);
    setOverflow("hidden");

    if (expanded) {
      timeoutRef.current = setTimeout(() => {
        setMaxHeight("none");
        setOverflow("visible");
      }, 300);
    } else {
      timeoutRef.current = setTimeout(() => {
        setMaxHeight(0);
      }, 0);
    }
  };

  useEffect(() => {
    // Component mounted
    updateMaxHeight(false);
    // componentWillUnmount
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (previousExpanded !== expanded) {
      if (disabled) return;

      if (expanded) {
        updateMaxHeight(false);
      } else {
        updateMaxHeight(true);
      }
    } else if (previousChildren !== children) {
      updateMaxHeight(false);
    }
  }, [expanded, children]);

  return (
    <Wrapper
      {...getClassName}
      styling={{ flexDirection: "column", padding: "0" }}
    >
      <AccordionItemTitle
        className="stop-details"
        expanded={expanded}
        title={title}
        id={id}
      />
      <AccordionItemBody
        className="stop-editing-panel"
        expanded={expanded}
        maxHeight={maxHeight}
        overflow={overflow}
        ref={accordionBodyRef}
        id={id}
      >
        {children}
      </AccordionItemBody>
    </Wrapper>
  );
};

export default memo(AccordionItem);
