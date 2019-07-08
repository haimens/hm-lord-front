import React, { Component } from "react";
import { Header } from "../../components/shared";
import DriverCard from "../../components/shared/DriverCard.component";
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
        <section className="container-fluid">
          <div className="mb-4">
            <Header title="Driver" tabicon={"tabicon_dashboard.svg"} showButton={true} clickFunction clickTitle={"Driver"} buttonWidth={"88px"} />
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
