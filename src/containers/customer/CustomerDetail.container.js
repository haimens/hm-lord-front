import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { OrderCard, ListView, ListHeader, Header } from "../../components/shared";

import CustomerDetailCard from "./customerDetail.component/CustomerDetail.card";
import LogListItem from "./customerDetail.component/LogList.item";
import AddingOrderModal from "./customerDetail.component/AddingOrder.modal";

import { findCustomerDetailInLord } from "../../actions/customer.action";
class VehicleDetail extends Component {
  state = {
    showAddingOrderModal: false
  };
  handleShowAddingOrderModal = () => {
    this.setState(state => ({ showAddingOrderModal: !state.showAddingOrderModal }));
  };
  componentDidMount() {
    const { match, findCustomerDetailInLord } = this.props;
    const { customer_token } = match.params;
    Promise.all([findCustomerDetailInLord(customer_token)]);
  }
  render() {
    const { showAddingOrderModal } = this.state;
    const { history, customer_Detail_in_lord } = this.props;
    return (
      <main>
        {showAddingOrderModal && <AddingOrderModal />}
        <section className="mb-4">
          <div className="mb-4">
            <Header
              title="Customer"
              subTitle="Cusomter Detail"
              toLocation={"/customer"}
              tabicon={"tabicon_dashboard.svg"}
              buttonWidth={"88px"}
              history={history}
            />
          </div>
          <div>
            <CustomerDetailCard customer_Detail_in_lord={customer_Detail_in_lord} />
          </div>
        </section>
        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Related Order List",
              clickFunction: this.handleShowAddingVehicleModal,
              clickTitle: "Vehicle"
            }}
            hideShadow={true}
            buttonWidth={"88px"}
          />
          <div className="row p-3">
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

        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Log History",
              clickFunction: this.handleShowAddingVehicleModal,
              clickTitle: "Vehicle"
            }}
            hideButton={true}
            buttonWidth={"88px"}
          />
          <ListView
            totalCount={30}
            title="Log History"
            fieldNames={["Date", "Admin", "Log Note"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <LogListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
          </ListView>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    customer_Detail_in_lord: state.customerReducer.customer_Detail_in_lord
  };
};
const mapDispatchToProps = { findCustomerDetailInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VehicleDetail));
