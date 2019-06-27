import React, { Component } from "react";
import OrderCreationPagination from "./orderCreation.component/OrderCreationPagination.component";
import CustomerInformation from "./orderCreation.component/CustomerInformation.component";
import TripDetail from "./orderCreation.component/TripDetail.component";
import ReviewTrip from "./orderCreation.component/ReviewTrip.component";
import PaymentInformation from "./orderCreation.component/PaymentInformation.component";
class OrderCreation extends Component {
  state = {
    position: 3
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
          <div>{position === 1 && <TripDetail handleChangePosition={this.handleChangePosition} />}</div>
          <div>{position === 2 && <ReviewTrip />}</div>
          <div>{position === 3 && <PaymentInformation />}</div>
        </section>
      </main>
    );
  }
}
export default OrderCreation;
