import React, { Component } from "react";
import CustomerCard from "./customer.component/CustomerCard.component";
import Pagination from "../../components/shared/Pagination";
class Customer extends Component {
  handlePageChange = start => {
    console.log(start);
  };
  render() {
    return (
      <main>
        <section>
          <div className="mb-4">
            <h3>Customer</h3>
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
