import React, { Component } from "react";

class DriversMap extends Component {
  render() {
    return (
      <div className="bg-white shadow-sm h-100">
        <div>
          <img className="rounded-circle" src={`${process.env.PUBLIC_URL}/img/unnamed.jpg`} style={{ height: "48px", width: "48px" }} alt="face" />
        </div>
      </div>
    );
  }
}
export default DriversMap;
