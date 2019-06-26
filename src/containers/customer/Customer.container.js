import React, { Component } from "react";
import CustomerCard from "./customer.component/CustomerCard.component";
import Pagination from "../../components/shared/Pagination";
import CustomerCreation from "./customer.component/CustomerCreation.modal";
class Customer extends Component {
  state = {
    showCustomerCreationModal: false
  };
  handlePageChange = start => {
    console.log(start);
  };
  handleCustomerCreation = () => {
    this.setState(state => ({ showCustomerCreationModal: !state.showCustomerCreationModal }));
  };
  handlePageChange = start => {
    console.log(start);
  };
  render() {
    const { showCustomerCreationModal } = this.state;
    return (
      <main>
        {showCustomerCreationModal && <CustomerCreation onClose={this.handleCustomerCreation} />}
        <section>
          <div className="mb-4 d-flex justify-content-between">
            <h3 className="font-weight-bold">Customer</h3>
            <button className="btn hm-bg-green text-white" onClick={this.handleCustomerCreation}>
              <span>
                <i className="fas fa-plus mr-2" />
              </span>
              Customer
            </button>
          </div>
          <div className="row">
            <CustomerCard
              parentProps={{
                customerId: "1000016",
                customerName: "Lebron James",
                customerImage: "unnamed.jpg",
                customerPhone: "6266266266",
                customerEmail: "lebronjames@gmail.com",
                customerUsername: "lebronjames123",
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
export default Customer;
