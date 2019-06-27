import React, { Component } from "react";
import { DriverCard, VehicleCard, ListView, SearchBar } from "../../components/shared";

import TripRecentUpcomingDetailCard from "./tripShare.component/TripDetail.card";
import AlertInformation from "./tripShare.component/AlertInformation.component";
import LogListItem from "./tripShare.component/LogList.item";
class TripRecentUpcomingDetail extends Component {
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
          <TripRecentUpcomingDetailCard />
        </section>

        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Driver Information</h3>
          </div>
          <div className="bg-white p-3 shadow-sm">
            <SearchBar className={"form-control"} />
            <div className="row mt-3">
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
            <div className="d-flex justify-content-end">
              <button className="btn hm-bg-green text-white text-end" onClick={this.handleShowAddingCouponModal}>
                Save
              </button>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Vehicle Information</h3>
          </div>
          <div className="bg-white p-3 shadow-sm">
            <SearchBar className={"form-control"} />

            <div className="row mt-3">
              <VehicleCard
                parentProps={{
                  vehicleId: "1000016",
                  vehicleName: "Lebron James",
                  vehicleImage: "unnamed.jpg",
                  vehiclePhone: "6266266266"
                }}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn hm-bg-green text-white text-end" onClick={this.handleShowAddingCouponModal}>
                Save
              </button>
            </div>
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
export default TripRecentUpcomingDetail;
