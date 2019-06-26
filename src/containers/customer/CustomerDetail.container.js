import React, { Component } from "react";
import { OrderCard, ListView } from "../../components/shared";

import CustomerDetailCard from "./customerDetail.component/CustomerDetail.card";
import LogListItem from "./customerDetail.component/LogList.item";
import AddingOrderModal from "./customerDetail.component/AddingOrder.modal";

export default class VehicleDetail extends Component {
  state = {
    showAddingOrderModal: false
  };
  handleShowAddingOrderModal = () => {
    this.setState(state => ({ showAddingOrderModal: !state.showAddingOrderModal }));
  };
  render() {
    const { showAddingOrderModal } = this.state;
    return (
      <main>
        {showAddingOrderModal && <AddingOrderModal />}
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold mr-3">Customer Detail</h3>
          </div>
          <div>
            <CustomerDetailCard />
          </div>
        </section>
        <section className="mb-4">
          <div className="mb-4 d-flex">
            <h3 className="font-weight-bold mr-3">Order List</h3>
            <i
              className="fas fa-plus hm-bg-green rounded-circle text-white p-2 hm-pointer-cursor"
              onClick={this.handleShowAddingOrderModal}
            />
          </div>
          <div className="row">
            <OrderCard
              parentProps={{
                orderId: "1000016",
                orderDate: "06/16 16.30",
                orderName: "Lebron James",
                orderImage: "unnamed.jpg",
                orderPhone: "6266266266"
              }}
            />
          </div>
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
