import React, { Component } from "react";

/**
 * SubNavItem
 * @is_target
 * @name
 */
export default class SubNavItem extends Component {
  handleClick = () => {
    if (this.props.onClick) this.props.onClick();
  };
  render() {
    const targetSubNavClassName = this.props.is_target
      ? "btn w-100 st-bg-deepblue  text-white text-left pl-5 py-3 font-size-12"
      : "btn w-100 st-bg-lessdeepblue text-white text-left pl-5 py-3 font-size-12";
    return (
      <button className={targetSubNavClassName} onClick={() => this.handleClick()}>
        {this.props.name}
      </button>
    );
  }
}
