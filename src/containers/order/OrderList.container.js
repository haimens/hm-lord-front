import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { OrderCard, Header } from "../../components/shared";

import { findOrderListInLord } from "../../actions/order.action";

class Order extends Component {
  handlePageChange = start => {
    console.log(start);
  };
  componentDidMount() {
    this.props.findOrderListInLord();
  }
  render() {
    return (
      <main className="container-fluid">
        <section>
          <div className="mb-4">
            <Header
              title="Order List"
              tabicon={"tabicon_dashboard.svg"}
              showButton={true}
              clickTitle={"Order"}
              buttonWidth={"88px"}
              clickFunction={() => this.props.history.push("/order/creation")}
            />
          </div>
          <div className="row">
            <OrderCard
              parentProps={{
                order_token: "1000016",
                cdate: "06/16 16.30",
                method: "Lebron James",
                order_img: "unnamed.jpg",
                orderPhone: "6266266266"
              }}
            />
          </div>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    order_list_in_lord: state.orderReducer.order_list_in_lord
  };
};
const mapDispatchToProps = { findOrderListInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Order));
