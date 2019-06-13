import React, { Component } from 'react'

/**
 * SubNavItem
 * @is_target
 * @name
 */
export default class SubNavItem extends Component {

  handleClick = () => {
    if (this.props.onClick) this.props.onClick()
  }
  render() {
    const targetSubNavClassName = this.props.is_target
      ? "btn w-100 mr-bg-deepblue  text-white text-left pl-5 py-3 "
      : "btn w-100 mr-bg-lessdeepblue text-white text-left pl-5 py-3 "
    return (
      <button
        className={targetSubNavClassName}
        onClick={() => this.handleClick()}>
        {this.props.name}
      </button>
    )
  }
}
