import React, { Component } from "react";
import { Header } from "../../components/shared";
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
        <section className="container-fluid">
          <div className="mb-4">
            <Header
              title="Customer"
              tabicon={"tabicon_dashboard.svg"}
              showButton={true}
              clickFunction
              clickTitle={"Customer"}
              buttonWidth={"88px"}
            />
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
