import React, { Component } from "react";
import TripOngoingCard from "./tripOngoing.component/TripOngoingCard.component";
import Pagination from "../../components/shared/Pagination";
class TripOngoing extends Component {
  handlePageChange = start => {
    console.log(start);
  };
  render() {
    return (
      <main>
        <section>
          <div className="mb-4">
            <h3 className="font-weight-bold">Trip - Ongoing</h3>
          </div>
          <div className="row">
            <TripOngoingCard
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
        <Pagination onPageChange={this.handlePageChange} />
      </main>
    );
  }
}
export default TripOngoing;
