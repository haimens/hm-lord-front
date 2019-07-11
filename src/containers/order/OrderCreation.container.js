import React, { Component } from "react";
import { OrderHeader, CustomerInformationCard } from "./orderCreation.component";

class OrderCreation extends Component {
  state = {
    position: 2
  };
  handleChangePosition = position => {
    this.setState(states => ({ position: states.position + position }));
  };
  handleCustomerInformationItemClicked = id => {
    console.log(id);
  };
  render() {
    const { position } = this.state;
    return (
      <main className="container-fluid">
        <section>
          <div className="mb-4">
            <OrderHeader titles={["Add Order", "Customer Information", "Trip Detail"]} position={position} />
          </div>
        </section>
        <section>{position === 2 && <CustomerInformationCard />}</section>
      </main>
    );
  }
}
export default OrderCreation;
