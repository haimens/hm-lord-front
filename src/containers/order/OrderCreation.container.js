import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { OrderHeader, CustomerInformationCard } from "./orderCreation.component";
import TripDetailCard from "./orderCreation.component/TripDetail.card";
import CompleteOrderCard from "./orderCreation.component/CompleteOrderCard.card";
import PaymentInfoCard from "./orderCreation.component/PaymentInfo.card";
import { setCurrentOrderInLord, setCurrentCustomerInLord } from "../../actions/order.action";
class OrderCreation extends Component {
  state = {
    position: 5,
    loaded: false,
    round_trip: false
  };
  handleChangePosition = position => {
    this.setState(states => ({ position: states.position + position }));
  };
  handleCustomerInformationItemClicked = id => {};

  handleRoundTrip = () => {
    this.setState(state => ({ round_trip: !state.round_trip }));
  };

  handleSetCurrentCustomer = currentCustomer => {
    this.props.setCurrentCustomerInLord(currentCustomer);
  };
  async componentDidMount() {
    if (this.props.history.location.pathname.includes("withCustomer")) {
      await this.setState({ position: 3 });
    }
    const { order_token } = this.props.match.params;
    this.props.setCurrentOrderInLord(order_token);
    if (order_token) {
      await this.setState({ position: 5 });
    }
  }
  render() {
    const { position, round_trip } = this.state;
    const { curr_customer } = this.props;

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
            <TripDetailCard
              round_trip={round_trip}
              handleRoundTrip={this.handleRoundTrip}
              currentCustomer={curr_customer}
              handleMoveNext={this.handleChangePosition}
            />
          )}
        </section>
        <section>
          {position === 4 && <CompleteOrderCard round_trip={round_trip} handleMoveNext={this.handleChangePosition} />}
        </section>
        <section>{position === 5 && <PaymentInfoCard handleMoveNext={this.handleChangePosition} />}</section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return { curr_customer: state.orderReducer.curr_customer };
};
const mapDispatchToProps = {
  setCurrentOrderInLord,
  setCurrentCustomerInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderCreation));
