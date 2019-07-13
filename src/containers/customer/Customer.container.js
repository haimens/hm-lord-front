import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header } from "../../components/shared";
import CustomerCard from "./customer.component/CustomerCard.component";
import Pagination from "../../components/shared/Pagination";
import CustomerAdding from "./customer.component/CustomerAdding.modal";

import { findCustomerListInLord, createACustomerInLord } from "../../actions/customer.action";
import { createNewAddressInstance } from "../../actions/address.action";
class Customer extends Component {
  state = {
    showCustomerAdding: false
  };
  handlePageChange = start => {};
  handleAddingCustomer = () => {
    this.setState(state => ({ showCustomerAdding: !state.showCustomerAdding }));
  };
  handlePageChange = start => {};
  componentDidMount() {
    this.props.findCustomerListInLord();
  }
  render() {
    const { showCustomerAdding } = this.state;
    const { history, customer_list_in_lord, createACustomerInLord, createNewAddressInstance } = this.props;
    return (
      <main>
        {showCustomerAdding && (
          <CustomerAdding
            createACustomerInLord={createACustomerInLord}
            createNewAddressInstance={createNewAddressInstance}
            onClose={this.handleAddingCustomer}
          />
        )}
        <section className="container-fluid">
          <div className="mb-4">
            <Header
              title="Customer"
              tabicon={"icon_customer_white.svg"}
              showButton={true}
              clickFunction={this.handleAddingCustomer}
              clickTitle={"Customer"}
              buttonWidth={"88px"}
            />
          </div>
          <div className="row">
            {customer_list_in_lord.record_list.map((customer, index) => (
              <CustomerCard
                parentProps={{
                  customerName: customer.name,
                  customerImage: customer.img_path,
                  customerPhone: customer.cell,
                  customerEmail: customer.email,
                  customerUsername: customer.username,
                  customer_token: customer.customer_token
                }}
                key={index}
                history={history}
              />
            ))}
          </div>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    customer_list_in_lord: state.customerReducer.customer_list_in_lord
  };
};
const mapDispatchToProps = { findCustomerListInLord, createACustomerInLord, createNewAddressInstance };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Customer));
