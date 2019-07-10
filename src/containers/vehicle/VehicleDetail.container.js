import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DriverCard, Header, ListHeader, ListView } from "../../components/shared";
import VehicleDetailCard from "./vehicleDetail.component/VehicleDetail.card";
import AddingDriverModal from "./vehicleDetail.component/AddingDriver.modal";
import { findCarDetailInLord, findDriverListForACar, createCarToADriverInLord } from "../../actions/vehicle.action";
import { findDriverListInLord } from "../../actions/driver.action";
class VehicleDetail extends Component {
  state = {
    showAddingDriverModal: false
  };
  handleShowAddingDriverModal = () => {
    this.setState(state => ({ showAddingDriverModal: !state.showAddingDriverModal }));
  };
  componentDidMount() {
    const { match, findCarDetailInLord, findDriverListForACar, findDriverListInLord } = this.props;
    const { car_token } = match.params;
    Promise.all([findCarDetailInLord(car_token), findDriverListForACar(car_token), findDriverListInLord()]);
  }
  render() {
    const { showAddingDriverModal } = this.state;
    const {
      history,
      vehicle_detail_in_lord,
      match: {
        params: { car_token }
      },
      createCarToADriverInLord,
      driver_list_in_lord
    } = this.props;
    return (
      <main className="container-fluid">
        {showAddingDriverModal && (
          <AddingDriverModal
            car_token={car_token}
            createCarToADriverInLord={createCarToADriverInLord}
            driver_list_in_lord={driver_list_in_lord}
            onClose={this.handleShowAddingDriverModal}
          />
        )}
        <section className="mb-4">
          <div className="mb-4">
            <Header
              title="Vehicle"
              subTitle="Vehicle Detail"
              toLocation={"/vehicle"}
              tabicon={"tabicon_dashboard.svg"}
              history={history}
              buttonWidth={"88px"}
            />
          </div>
          <div>
            <VehicleDetailCard vehicle_detail_in_lord={vehicle_detail_in_lord} />
          </div>
        </section>
        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Related Driver List",
              clickFunction: this.handleShowAddingDriverModal,
              clickTitle: "Driver"
            }}
            hideShadow={true}
            buttonWidth={"88px"}
          />
          <div className="row p-3">
            <DriverCard
              parentProps={{
                driverName: 123,
                driverImage: 123,
                driverPhone: 123,
                driverUsername: 123,
                driver_token: 123,
                isActive: 1
              }}
              history={history}
            />
          </div>
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Log History",
              clickFunction: this.handleShowAddingVehicleModal,
              clickTitle: "Vehicle"
            }}
            hideButton={true}
            buttonWidth={"88px"}
          />
          <ListView
            totalCount={30}
            title="Log History"
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
const mapStateToProps = state => {
  return {
    vehicle_detail_in_lord: state.vehicleReducer.vehicle_detail_in_lord,
    driver_list_in_lord: state.driverReducer.driver_list_in_lord
  };
};
const mapDispatchToProps = {
  findCarDetailInLord,
  findDriverListForACar,
  findDriverListInLord,
  createCarToADriverInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VehicleDetail));
