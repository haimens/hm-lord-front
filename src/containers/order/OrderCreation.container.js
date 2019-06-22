import React, { Component } from "react";
import OrderCreationPagination from "./orderCreation.component/OrderCreationPagination.component";
import CustomerInformation from "./orderCreation.component/CustomerInformation.component";
import TripDetail from "./orderCreation.component/TripDetail.component";

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
      <main>
        <section className="mb-4">
          <OrderCreationPagination position={position} />
        </section>
        <section>
          <div>{position === 0 && <CustomerInformation />}</div>
          <div>{position === 1 && <CustomerInformation />}</div>
          <div>{position === 2 && <TripDetail handleChangePosition={this.handleChangePosition} />}</div>
          <div>{position === 3 && <CustomerInformation />}</div>
        </section>
      </main>
    );
  }
}
export default OrderCreation;
