import React, { Component } from "react";
import DriverMapItem from "./driverMap.component/DriverMap.item";

class DriversMap extends Component {
  render() {
    return (
      <div className="row">
        <DriverMapItem driverName={"Jeremy"} driverPhone={"6266077322"} driverImage={"/img/unnamed.jpg"} />
      </div>
    );
  }
}
export default DriversMap;
