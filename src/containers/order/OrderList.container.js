import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { OrderCard, Header, Pagination } from "../../components/shared";
import { findOrderListInLord } from "../../actions/order.action";

class Order extends Component {
  state = {
    hasMore: true
  };
  handlePageChange = async start => {
    this.props.findOrderListInLord({ start });
  };

  componentDidMount() {
    this.props.findOrderListInLord();
  }
  render() {
    const { history, order_list_in_lord } = this.props;
    return (
      <main className="container-fluid">
        <section>
          <div className="mb-4">
            <Header
              title="Order List"
              tabicon={"icon_order_white.svg"}
              showButton={true}
              clickTitle={"Order"}
              buttonWidth={"88px"}
              clickFunction={() => this.props.history.push("/order/creation")}
            />
          </div>

          <div className="row">
            {order_list_in_lord.record_list.map((order, index) => (
              <OrderCard
                parentProps={{
                  order_token: order.order_token,
                  contact_name: order.contact_name,
                  cdate: order.cdate,
                  order_img: order.img_path,
                  order_type: order.order_type,
                  contact_cell: order.contact_cell,
                  status_str: order.status_str
                }}
                key={index}
                history={history}
              />
            ))}
          </div>
        </section>
        {order_list_in_lord.count === 0 ? (
          <section className="fixed-bottom">
            <Pagination count={order_list_in_lord.count} onPageChange={this.handlePageChange} />
          </section>
        ) : (
          <section>
            <Pagination count={order_list_in_lord.count} onPageChange={this.handlePageChange} />
          </section>
        )}
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
