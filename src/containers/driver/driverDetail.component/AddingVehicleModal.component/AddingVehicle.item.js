import React, { Component } from "react";

export default class AddingVehicleItem extends Component {
  handleAddingVehicleItemClicked = () => {
    this.props.handleAddingVehicleItemClicked(123);
  };
  render() {
    return (
      <ul className="list-group">
        <li
          className="list-group-item list-group-item-action  list-group-item-secondary hm-pointer-cursor"
          onClick={this.handleAddingVehicleItemClicked}
        >
          <div className="d-flex justify-content-between ">
            <div>asdf</div>
            <div>asdf</div>
          </div>
        </li>
      </ul>
    );
  }
}
