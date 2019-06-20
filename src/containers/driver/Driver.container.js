import React, { Component } from "react";
import DriverCard from "./driver.component/DriverCard.component";

class Driver extends Component {
  render() {
    return (
      <main>
        <section>
          <div className="mb-4">
            <h3>Driver</h3>
          </div>
          <div className="row">
            <DriverCard
              parentProps={{
                driverId: "1000016",
                driverName: "Lebron James",
                driverImage: "unnamed.jpg",
                driverPhone: "6266266266",
                driverEmail: "lebronjames@gmail.com",
                driverUsername: "lebronjames123"
              }}
            />
          </div>
        </section>
      </main>
    );
  }
}
export default Driver;
