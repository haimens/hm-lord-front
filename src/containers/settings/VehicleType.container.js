import React, { Component } from "react";
import { ListView } from "../../components/shared";
import VehicleTypeListItem from "./vehicleType.container/VehicleTypeList.item";
import AddingVehicleTypeModal from "./vehicleType.container/AddingVehicleType.modal";
class VehicleType extends Component {
  state = {
    showAddingVehicleTypeModal: false
  };
  handleShowAddingVehicleTypeModal = () => {
    this.setState(state => ({ showAddingVehicleTypeModal: !state.showAddingVehicleTypeModal }));
  };

  render() {
    const { showAddingVehicleTypeModal } = this.state;
    return (
      <main>
        {showAddingVehicleTypeModal && <AddingVehicleTypeModal onClose={this.handleShowAddingVehicleTypeModal} />}
        <section className="mb-4">
          <div className="mb-4 d-flex justify-content-between">
            <h3 className="font-weight-bold">Vehicle Type</h3>
            <button className="btn hm-bg-green text-white" onClick={this.handleShowAddingVehicleTypeModal}>
              <span>
                <i className="fas fa-plus mr-2" />
              </span>
              Vehicle Type
            </button>
          </div>
          <div>
            <ListView
              totalCount={30}
              fieldNames={["Created On", "Name", "Price Prefix", "Img", "Delete"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <VehicleTypeListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
            </ListView>
          </div>
        </section>
      </main>
    );
  }
}
export default VehicleType;
