import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, DriverCard, Pagination } from "../../components/shared";
import DriverAdding from "./driver.component/DriverAdding.modal";
import { findDriverListInLord, createADriverInLord } from "../../actions/driver.action";
class Driver extends Component {
  state = {
    showDriverCreationModal: false
  };
  handlePageChange = start => {
    console.log(start);
  };
  handleAddingDriver = () => {
    this.setState(state => ({ showDriverCreationModal: !state.showDriverCreationModal }));
  };
  componentDidMount() {
    const { findDriverListInLord } = this.props;
    findDriverListInLord();
  }
  render() {
    const { showDriverCreationModal } = this.state;
    const { history, driver_list_in_lord, createADriverInLord } = this.props;
    return (
      <main>
        {showDriverCreationModal && (
          <DriverAdding createADriverInLord={createADriverInLord} onClose={this.handleAddingDriver} />
        )}
        <section className="container-fluid">
          <div className="mb-4">
            <Header
              title="Driver"
              tabicon={"tabicon_dashboard.svg"}
              showButton={true}
              clickTitle={"Driver"}
              buttonWidth={"88px"}
              clickFunction={this.handleAddingDriver}
            />
          </div>
          <div className="row">
            {driver_list_in_lord.record_list.map((driver, index) => (
              <DriverCard
                parentProps={{
                  driverName: driver.name,
                  driverImage: driver.img_path,
                  driverPhone: driver.cell,
                  driverUsername: driver.username,
                  isActive: true
                }}
                history={history}
              />
            ))}
          </div>
        </section>
        <Pagination count={driver_list_in_lord.count} onPageChange={this.handlePageChange} />
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    driver_list_in_lord: state.driverReducer.driver_list_in_lord
  };
};
const mapDispatchToProps = {
  findDriverListInLord,
  createADriverInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Driver));
