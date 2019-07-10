import React, { Component, useState, useEffect, memo } from "react";
import Wrapper from "../wrapper";

import { isSame, arrayify, getActiveItem } from "./utils";

const Accordion = props => {
  const [activeItem, setActiveItem] = useState(getActiveItem(props.children));
  const { className, children } = props;

  const _renderItems = () => {
    if (!children) {
      return null;
    }

    return arrayify(children).reduce((acc, item, index) => {
      if (item) {
        const {
          props: { disabled }
        } = item;

        const isExpanded = !disabled && activeItem.indexOf(index) !== -1;

        const element = React.cloneElement(item, {
          expanded: isExpanded,
          key: index,
          index
        });
        acc.push(element);
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    const activeItemAfterUpdate = getActiveItem(children);
    if (!isSame(activeItemAfterUpdate, activeItem)) {
      setActiveItem(activeItemAfterUpdate);
    }
  }, [children]);

  return (
    <Wrapper
      className={className}
      styling={{ padding: "0", flexDirection: "column" }}
    >
      {_renderItems()}
    </Wrapper>
  );
};

Accordion.defaultProps = {
  activeItem: []
};

export default Accordion;

/*class Accordion2 extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return !isSame(getActiveItem(nextProps.children), prevState.activeItem)
      ? { update: true }
      : { update: null };
  }

  componentDidUpdate() {
    if (this.state.update === true) {
      this.setState({
        activeItem: getActiveItem(this.props.children)
      });
    }
  }
}*/
