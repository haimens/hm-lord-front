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
  handleAddingDriver = () => {
    this.setState(state => ({ showDriverCreationModal: !state.showDriverCreationModal }));
  };
  componentDidMount() {
    const { findDriverListInLord } = this.props;
    findDriverListInLord();
  }
  handlePageChange = start => {
    const { findDriverListInLord } = this.props;
    findDriverListInLord({ start });
  };
  handleSubmitSearch = keywords => {
    const { findDriverListInLord } = this.props;
    findDriverListInLord({ keywords });
  };
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
              tabicon={"icon_driver_white.svg"}
              showButton={true}
              clickTitle={"Driver"}
              buttonWidth={"88px"}
              clickFunction={this.handleAddingDriver}
              search={true}
              handleSubmitSearch={this.handleSubmitSearch}
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
                  driver_token: driver.driver_token,
                  isActive: driver.status
                }}
                key={index}
                history={history}
              />
            ))}
          </div>
        </section>
        {driver_list_in_lord.count === 0 ? (
          <section className="fixed-bottom">
            <Pagination count={driver_list_in_lord.count} onPageChange={this.handlePageChange} />
          </section>
        ) : (
          <section>
            <Pagination count={driver_list_in_lord.count} onPageChange={this.handlePageChange} />
          </section>
        )}
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
