import React, { Component } from "react";
import DriverCard from "./driver.component/DriverCard.component";
import Pagination from "../../components/shared/Pagination";
import DriverCreation from "./driver.component/DriverCreation.modal";
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
  render() {
    const { showDriverCreationModal } = this.state;
    return (
      <main>
        {showDriverCreationModal && <DriverCreation onClose={this.handleAddingDriver} />}
        <section>
          <div className="mb-4 d-flex justify-content-between">
            <h3 className="font-weight-bold">Driver</h3>
            <button className="btn hm-bg-green text-white" onClick={this.handleAddingDriver}>
              <span>
                <i className="fas fa-plus mr-2" />
              </span>
              Driver
            </button>
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
        <Pagination onPageChange={this.handlePageChange} />
      </main>
    );
  }
}
export default Driver;
