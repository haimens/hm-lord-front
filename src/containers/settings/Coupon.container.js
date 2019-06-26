import React, { Component } from "react";
import EmailResourceCard from "./emailResource.container/EmailResource.card";
import { ListView } from "../../components/shared";
import EmailResourceListItem from "./emailResource.container/EmailResourceList.item";
import AddingCouponModal from "./coupon.container/AddingCoupon.modal";
class Coupon extends Component {
  state = {
    showAddingCouponModal: false
  };
  handleShowAddingCouponModal = () => {
    this.setState(state => ({ showAddingCouponModal: !state.showAddingCouponModal }));
  };

  render() {
    const { showAddingCouponModal } = this.state;
    return (
      <main>
        {showAddingCouponModal && <AddingCouponModal onClose={this.handleShowAddingCouponModal} />}
        <section className="mb-4">
          <div className="mb-4 d-flex justify-content-between">
            <h3 className="font-weight-bold">Coupon</h3>
            <button className="btn hm-bg-green text-white" onClick={this.handleShowAddingCouponModal}>
              <span>
                <i className="fas fa-plus mr-2" />
              </span>
              Coupon
            </button>
          </div>
          <div>
            <ListView
              totalCount={30}
              fieldNames={["Created On", "Coupon Name", "Coupon Amount", "Delete"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <EmailResourceListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
            </ListView>
          </div>
        </section>
      </main>
    );
  }
}
export default Coupon;
