import React, { Component } from "react";
import { Header } from "../../components/shared";
import CustomerCard from "./customer.component/CustomerCard.component";
import Pagination from "../../components/shared/Pagination";
import CustomerAdding from "./customer.component/CustomerAdding.modal";

class Customer extends Component {
  state = {
    showCustomerAdding: false
  };
  handlePageChange = start => {
    console.log(start);
  };
  handleAddingCustomer = () => {
    this.setState(state => ({ showCustomerAdding: !state.showCustomerAdding }));
  };
  handlePageChange = start => {
    console.log(start);
  };
  render() {
    const { showCustomerAdding } = this.state;
    return (
      <main>
        {showCustomerAdding && <CustomerAdding onClose={this.handleAddingCustomer} />}
        <section className="container-fluid">
          <div className="mb-4">
            <Header
              title="Customer"
              tabicon={"tabicon_dashboard.svg"}
              showButton={true}
              clickFunction={this.handleAddingCustomer}
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
