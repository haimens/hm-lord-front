import React, { Component } from "react";
import VehicleCard from "./vehicle.component/VehicleCard.component";
import Pagination from "../../components/shared/Pagination";
class Vehicle extends Component {
  handlePageChange = start => {
    console.log(start);
  };
  render() {
    return (
      <main>
        <section>
          <div className="mb-4">
            <h3>Vehicle</h3>
          </div>
          <div className="row">
            <VehicleCard
              parentProps={{
                vehicleId: "1000016",
                vehicleName: "Lebron James",
                vehicleImage: "unnamed.jpg",
                vehiclePhone: "6266266266"
              }}
            />
          </div>
        </section>
        <Pagination onPageChange={this.handlePageChange} />
      </main>
    );
  }
}
export default Vehicle;
