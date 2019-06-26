import React, { Component } from "react";
import PaymentResourceCard from "./paymentResource.container/PaymentResource.card";
import { ListView } from "../../components/shared";
import PaymentResourceListItem from "./paymentResource.container/PaymentResourceList.item";
import AddPaymentResourceModal from "./paymentResource.container/AddPaymentResource.modal";
class PaymentResource extends Component {
  state = {
    showAddingPaymentResourceModal: false
  };
  handleShowAddingPaymentResourceModal = () => {
    this.setState(state => ({ showAddingPaymentResourceModal: !state.showAddingPaymentResourceModal }));
  };

  render() {
    const { showAddingPaymentResourceModal } = this.state;
    return (
      <main>
        {showAddingPaymentResourceModal && (
          <AddPaymentResourceModal close={this.handleShowAddingPaymentResourceModal} />
        )}
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold mr-3">Payment Resource</h3>
          </div>
          <div>
            <PaymentResourceCard />
          </div>
        </section>

        <section className="mb-4">
          <div className="mb-4 d-flex">
            <h3 className="font-weight-bold mr-3">Payment List</h3>
            <i
              className="fas fa-plus hm-bg-green rounded-circle text-white p-2 hm-pointer-cursor"
              onClick={this.handleShowAddingPaymentResourceModal}
            />
          </div>
          <div>
            <ListView
              totalCount={30}
              fieldNames={["Application_Id", "Location_Id", "Access_Token", "Status", "Edit"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <PaymentResourceListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
            </ListView>
          </div>
        </section>
      </main>
    );
  }
}
export default PaymentResource;
