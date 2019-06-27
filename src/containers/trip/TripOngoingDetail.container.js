import React, { Component } from "react";
import { DriverCard, VehicleCard, ListView } from "../../components/shared";

import Pagination from "../../components/shared/Pagination";
import TripOngoingDetailCard from "./tripOngoingDetail.component/TripOngoingrDetail.card";
import AlertInformation from "./tripOngoingDetail.component/AlertInformation.component";
import LogListItem from "./tripOngoingDetail.component/LogList.item";
class TripOngoingDetail extends Component {
  handlePageChange = start => {
    console.log(start);
  };
  render() {
    return (
      <main>
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Trip Detail</h3>
          </div>
          <TripOngoingDetailCard />
        </section>

        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Driver Information</h3>
          </div>
          <div className="row">
            <DriverCard
              parentProps={{
                driverId: "1000016",
                driverName: "Lebron James",
                driverImage: "unnamed.jpg",
                driverPhone: "6266266266",
                driverEmail: "lebronjames@gmail.com",
                driverUsername: "lebronjames123",
                isActive: true
              }}
            />
          </div>
        </section>

        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Vehicle Information</h3>
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

        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Alert Information</h3>
          </div>
          <AlertInformation />
        </section>

        <section className="mb-4">
          <div className="mb-4 d-flex">
            <h3 className="font-weight-bold mr-3">Log</h3>
          </div>
          <ListView
            totalCount={30}
            title="Wage List"
            fieldNames={["Date", "Admin", "Log Note"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <LogListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
          </ListView>
        </section>
      </main>
    );
  }
}
export default TripOngoingDetail;
