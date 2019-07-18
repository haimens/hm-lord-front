import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { OrderCard, ListView, ListHeader, Header, AddingNote, LogItem } from "../../components/shared";

import CustomerDetailCard from "./customerDetail.component/CustomerDetail.card";
import EditCustomerModal from "./customerDetail.component/EditCustomer.modal";
import {
  findCustomerDetailInLord,
  updateACustomerInLord,
  updateACustomerAddressInLord
} from "../../actions/customer.action";
import { findCustomerNoteListInLord, createCustomerNoteListInLord } from "../../actions/note.action";
import { createNewAddressInstance } from "../../actions/address.action";
class CustomerDetail extends Component {
  state = {
    showAddingOrderModal: false,
    showAddingLogInCustomer: false
  };
  handleAddingLog = () => {
    this.setState(state => ({ showAddingLogInCustomer: !state.showAddingLogInCustomer }));
  };
  handleEditingCustomerInformation = () => {
    this.setState(state => ({ showEditingCustomerInfo: !state.showEditingCustomerInfo }));
  };
  handlePageChange = start => {
    const { customer_token } = this.props.match.params;
    this.props.findCustomerNoteListInLord(customer_token, { start });
  };
  componentDidMount() {
    const { match, findCustomerDetailInLord, findCustomerNoteListInLord } = this.props;
    const { customer_token } = match.params;
    Promise.all([findCustomerDetailInLord(customer_token), findCustomerNoteListInLord(customer_token)]);
  }
  render() {
    const { showEditingCustomerInfo, showAddingLogInCustomer } = this.state;
    const {
      history,
      match,
      customer_detail_in_lord,
      updateACustomerInLord,
      updateACustomerAddressInLord,
      createNewAddressInstance,
      createCustomerNoteListInLord,
      note_list_for_customer
    } = this.props;
    const { customer_token } = match.params;

    return (
      <main className="container-fluid">
        {showEditingCustomerInfo && (
          <EditCustomerModal
            customer_token={customer_token}
            customer_detail_in_lord={customer_detail_in_lord}
            createNewAddressInstance={createNewAddressInstance}
            updateACustomerAddressInLord={updateACustomerAddressInLord}
            updateACustomerInLord={updateACustomerInLord}
            onClose={this.handleEditingCustomerInformation}
          />
        )}
        {showAddingLogInCustomer && (
          <AddingNote
            type={2}
            token={customer_token}
            createANote={createCustomerNoteListInLord}
            onClose={this.handleAddingLog}
          />
        )}
        <section className="mb-4">
          <div className="mb-4">
            <Header
              title="Customer"
              subTitle="Cusomter Detail"
              toLocation={"/customer"}
              tabicon={"icon_customer_white.svg"}
              buttonWidth={"88px"}
              history={history}
            />
          </div>
          <div>
            <CustomerDetailCard
              handleDetailButtonClicked={this.handleEditingCustomerInformation}
              customer_detail_in_lord={customer_detail_in_lord}
            />
          </div>
        </section>
        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Related Order List",
              clickFunction: this.handleShowAddingVehicleModal,
              clickTitle: "Order"
            }}
            hideShadow={true}
            buttonWidth={"88px"}
          />
          <div className="container-fluid">
            <div className="row p-1">
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
          </div>
        </section>

        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Log History",
              clickFunction: this.handleAddingLog,
              clickTitle: "Log"
            }}
            buttonWidth={"70px"}
          />
          <ListView
            totalCount={note_list_for_customer.count}
            title="Log History"
            fieldNames={["Created ON", "Log Note"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {note_list_for_customer.record_list.map((note, index) => (
              <LogItem parentProps={note} key={index} />
            ))}
          </ListView>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    customer_detail_in_lord: state.customerReducer.customer_detail_in_lord,
    note_list_for_customer: state.noteReducer.note_list_for_customer
  };
};
const mapDispatchToProps = {
  findCustomerDetailInLord,
  updateACustomerInLord,
  createNewAddressInstance,
  updateACustomerAddressInLord,
  findCustomerNoteListInLord,
  createCustomerNoteListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CustomerDetail));
