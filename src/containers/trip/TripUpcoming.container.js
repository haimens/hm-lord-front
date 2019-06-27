import React, { Component } from "react";
import TripCard from "../../components/shared/TripCard.component";

class TripUpcoming extends Component {
  render() {
    return (
      <main>
        <section>
          <div className="mb-4">
            <h3 className="font-weight-bold">Trip - Upcoming</h3>
          </div>
          <div className="row">
            <TripCard
              parentProps={{
                tripId: "1000016",
                tripDriver: "Lebron James",
                tripCustomer: "Kevin Love",
                tripPickUp: "06/16 16:30 PM",
                tripFrom: "Pasadena",
                tripTo: "Arcadia"
              }}
            />
          </div>
        </section>
      </main>
    );
  }
}
export default TripUpcoming;
