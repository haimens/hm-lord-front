import React, { Component } from "react";
import DriverDetailCard from "./driverDetail.component/DriverDetail.card";
import GMapFlag from "../../components/shared/GMapFlag";
import TripCard from "../../components/shared/TripCard.component";
import VehicleCard from "../../components/shared/VehicleCard.component";
export default class DriverDetail extends Component {
  render() {
    return (
      <main>
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Driver Detail</h3>
          </div>
          <div>
            <DriverDetailCard />
          </div>
        </section>
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Last Location Map</h3>
          </div>
          <div style={{ height: "248px" }}>
            <GMapFlag />
          </div>
        </section>
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Trip List</h3>
          </div>
          <div>
            <TripCard
              parentProps={{
                tripId: 100015,
                tripDriver: "Kobe",
                tripCustomer: "Lebron",
                tripPickUp: "16/26 23",
                tripFrom: "321 s",
                tripTo: "123 s"
              }}
            />
          </div>
        </section>
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Vehicle List</h3>
          </div>
          <div>
            <VehicleCard
              parentProps={{
                vehicleId: "1000016",
                vehicleName: "Lebron James",
                vehicleImage: "unnamed.jpg",
                vehiclePhone: "6266266266"
              }}
              deleteButton={true}
            />
          </div>
        </section>
      </main>
    );
  }
}
