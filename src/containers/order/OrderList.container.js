import React, { Component } from "react";
import { OrderCard } from "../../components/shared";
import Pagination from "../../components/shared/Pagination";
class Order extends Component {
  handlePageChange = start => {
    console.log(start);
  };
  render() {
    return (
      <main>
        <section>
          <div className="mb-4">
            <h3 className="font-weight-bold">Order</h3>
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
        <Pagination onPageChange={this.handlePageChange} />
      </main>
    );
  }
}
export default Order;
