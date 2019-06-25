import React, { Component } from "react";
import DriverDetailCard from "./driverDetail.component/DriverDetail.card";
import GMapFlag from "../../components/shared/GMapFlag";
import { VehicleCard, TripCard, ListView } from "../../components/shared";
import WageListItem from "./driverDetail.component/WageList.item";
import SalaryListItem from "./driverDetail.component/SalaryList.item";

class DriverDetail extends Component {
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
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Wage List</h3>
          </div>
          <div>
            <ListView
              totalCount={30}
              title="Wage List"
              fieldNames={["Created On", "Amount", "Type", "Note"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <WageListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
            </ListView>
          </div>
        </section>

        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Salary List</h3>
          </div>
          <div>
            <ListView
              totalCount={30}
              title="Salary List"
              fieldNames={["Created On", "Amount", "Note"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <SalaryListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
            </ListView>
          </div>
        </section>
      </main>
    );
  }
}
export default DriverDetail;
