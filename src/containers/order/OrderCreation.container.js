import React, { Component } from "react";
import { OrderHeader, CustomerInformationCard } from "./orderCreation.component";
import TripDetailCard from "./orderCreation.component/TripDetail.card";
import CompleteOrderCard from "./orderCreation.component/CompleteOrderCard.card";
import PaymentInfoCard from  "./orderCreation.component/PaymentInfo.card"
class OrderCreation extends Component {
  state = {
    position: 5
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
            <OrderHeader titles={["Add Order", "Customer Information", "Trip Detail", "Complete Order", "Payment Information"]} position={position} />
          </div>
        </section>
        <section>{position === 2 && <CustomerInformationCard />}</section>
        <section>{position === 3 && <TripDetailCard />}</section>
        <section>{position === 4 && <CompleteOrderCard />}</section>
        <section>{position === 5 && <PaymentInfoCard />}</section>

      </main>
    );
  }
}
export default OrderCreation;
