import React, { Component } from "react";
import Wrapper from "../wrapper";

import { isSame, arrayify, getActiveItem } from "./utils";

export default class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: getActiveItem(props.children)
    };
  }

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

  renderItems() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    const { activeItem } = this.state;

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
  }

  render() {
    const { className } = this.props;

    return (
      <Wrapper
        className={className}
        styling={{ padding: "0", flexDirection: "column" }}
      >
        {this.renderItems()}
      </Wrapper>
    );
  }
}

Accordion.defaultProps = {
  activeItem: []
};
