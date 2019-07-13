import React, { Component } from "react";
import { OrderHeader, CustomerInformationCard } from "./orderCreation.component";
import TripDetailCard from "./orderCreation.component/TripDetail.card";
import CompleteOrderCard from "./orderCreation.component/CompleteOrderCard.card";
import PaymentInfoCard from "./orderCreation.component/PaymentInfo.card";
class OrderCreation extends Component {
  state = {
    position: 4,
    loaded: false,
    currentCustomer: ""
  };
  handleChangePosition = position => {
    this.setState(states => ({ position: states.position + position }));
  };
  handleCustomerInformationItemClicked = id => {
    console.log(id);
  };

  handleSetCurrentCustomer = props => {
    this.setState({ currentCustomer: props });
  };

  render() {
    const { position, loaded, currentCustomer } = this.state;
    return (
      <main className="container-fluid">
        <section>
          <div className="mb-4">
            <OrderHeader
              titles={["Add Order", "Customer Information", "Trip Detail", "Complete Order", "Payment Information"]}
              position={position}
            />
          </div>
        </section>
        <section>
          {position === 2 && (
            <CustomerInformationCard
              handleSetCurrentCustomer={this.handleSetCurrentCustomer}
              handleMoveNext={this.handleChangePosition}
            />
          )}
        </section>
        <section>
          {position === 3 && (
            <TripDetailCard currentCustomer={currentCustomer} handleMoveNext={this.handleChangePosition} />
          )}
        </section>
        <section>{position === 4 && <CompleteOrderCard handleMoveNext={this.handleChangePosition} />}</section>
        <section>{position === 5 && <PaymentInfoCard handleMoveNext={this.handleChangePosition} />}</section>
      </main>
    );
  }
}
export default OrderCreation;
