import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DriverCard, Header, ListHeader, ListView } from "../../components/shared";
import VehicleDetailCard from "./vehicleDetail.component/VehicleDetail.card";
import AddingDriverModal from "./vehicleDetail.component/AddingDriver.modal";

class VehicleDetail extends Component {
  state = {
    showAddingDriverModal: false
  };
  handleShowAddingVehicleModal = () => {
    this.setState(state => ({ showAddingDriverModal: !state.showAddingDriverModal }));
  };
  render() {
    const { showAddingDriverModal } = this.state;
    const { history } = this.props;
    return (
      <main>
        {showAddingDriverModal && <AddingDriverModal onClose={this.handleShowAddingDriverModal} />}
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
            <VehicleDetailCard />
          </div>
        </section>
        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Related Driver List",
              clickFunction: this.handleShowAddingVehicleModal,
              clickTitle: "Vehicle"
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
  return {};
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VehicleDetail));
