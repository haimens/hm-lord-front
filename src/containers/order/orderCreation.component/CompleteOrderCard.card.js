import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, ListHeader, ListView, CouponCard, CouponModal } from "../../../components/shared";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";

import "./TripDetail.card.css";

import {
  findOrderDetailInLord,
  applyOrderDiscountInLord,
  updateOrderDiscountInLord
} from "../../../actions/order.action";
import { findCouponListInLord } from "../../../actions/coupon.action";
import { findTripDetailInLord, createAddonToTrip } from "../../../actions/trip.action";
import CompleteTop from "./CompleteOrder.component/CompleteTop.card";
import AddonModal from "./CompleteOrder.component/Addon.modal";

class TripDetail extends Component {
  state = {
    showCouponModal: false,
    showAddingAddon: false,
    curr_trip_token: ""
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleShowCouponModal = () => {
    this.setState(state => ({ showCouponModal: !state.showCouponModal }));
  };
  handleRoundTripButton = () => {
    this.setState(state => ({ round_trip: !state.round_trip }));
  };
  handleAddingCoupon = code => {
    let orderStr = "ORD-b7a2137a9353dea1db332fb0f9d67603";
    this.props.applyOrderDiscountInLord(orderStr, { code });
  };
  handleAddingAddon = curr_trip_token => {
    this.setState(state => ({ showAddingAddon: !state.showAddingAddon, curr_trip_token }));
  };

  handleDeleteCouponFromOrder = order_discount_token => {
    let orderStr = "ORD-b7a2137a9353dea1db332fb0f9d67603";
    console.log(order_discount_token);
    this.props.updateOrderDiscountInLord(orderStr, order_discount_token, { status: 0 });
  };

  componentDidMount() {
    const { current_order, findOrderDetailInLord, findTripDetailInLord, findCouponListInLord } = this.props;
    let orderStr = "ORD-b7a2137a9353dea1db332fb0f9d67603";
    let tripStr = "TRIP-8ea520fbb71c379142994763322a4a12";
    Promise.all([findOrderDetailInLord(orderStr), findTripDetailInLord(tripStr), findCouponListInLord()]);
  }
  render() {
    const { showCouponModal, showAddingAddon, curr_trip_token } = this.state;
    const {
      history,
      coupon_list_in_lord,
      trip_detail_in_lord,
      order_detail,
      round_trip,
      createAddonToTrip
    } = this.props;
    const { basic_info } = trip_detail_in_lord;
    let totalDiscount = 0;
    if (order_detail.order_discount_list.length > 0) {
      totalDiscount = order_detail.order_discount_list.map(discount => console.log(discount));
    }
    let order_token = "ORD-b7a2137a9353dea1db332fb0f9d67603";

    let trip_token = "TRIP-8ea520fbb71c379142994763322a4a12";

    return (
      <section>
        {showCouponModal && (
          <CouponModal
            amount={basic_info.amount}
            handleAddingCoupon={this.handleAddingCoupon}
            coupon_list_in_lord={coupon_list_in_lord}
            onClose={this.handleShowCouponModal}
          />
        )}
        {showAddingAddon && (
          <AddonModal
            onClose={this.handleAddingAddon}
            createAddonToTrip={createAddonToTrip}
            order_token={order_token}
            trip_token={trip_token}
          />
        )}
        <div className="mb-4">
          <CompleteTop
            trip_token={trip_token}
            handleAddingAddon={this.handleAddingAddon}
            trip_detail_in_lord={trip_detail_in_lord}
          />
        </div>

        {round_trip && (
          <div className="mb-4">
            <CompleteTop
              trip_token={trip_token}
              handleAddingAddon={this.handleAddingAddon}
              trip_detail_in_lord={trip_detail_in_lord}
            />
          </div>
        )}

        <div className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Passenger Information"
            }}
            hideShadow={true}
            hideButton={true}
          />
          <div className="container-fluid">
            <div className="row ">
              <div className="col-4">
                <div className="form-group mb-4">
                  <label htmlFor="Name" className="hm-text-14 text-main-color font-weight-bold">
                    Name
                  </label>
                  <input
                    className="form-control hm-input-height"
                    name="name"
                    id="name"
                    placeholder={"Name"}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group mb-4">
                  <label htmlFor="Name" className="hm-text-14 text-main-color font-weight-bold">
                    Cell
                  </label>
                  <input
                    className="form-control hm-input-height"
                    name="cell"
                    id="cell"
                    placeholder={"Cell"}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group mb-4">
                  <label htmlFor="Name" className="hm-text-14 text-main-color font-weight-bold">
                    Email
                  </label>
                  <input
                    className="form-control hm-input-height"
                    name="email"
                    id="email"
                    placeholder={"Email"}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group mb-4">
                  <label htmlFor="Name" className="hm-text-14 text-main-color font-weight-bold">
                    Special Instruction
                  </label>
                  <input
                    className="form-control hm-input-height"
                    name="special_instruction"
                    id="special_instruction"
                    placeholder={"Special Instruction"}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Coupon List",
              clickFunction: this.handleShowCouponModal,
              clickTitle: "Coupon"
            }}
            hideShadow={true}
            buttonWidth={"88px"}
          />
          <div className="row p-3 triplist-scroll">
            {order_detail.order_discount_list.map((discount, index) => (
              <CouponCard
                handleDeleteCouponFromOrder={this.handleDeleteCouponFromOrder}
                discount={discount}
                key={index}
              />
            ))}
          </div>
        </section>
        <div className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Price Breakdown",
              clickFunction: this.handleShowCouponModal,
              clickTitle: "Coupon"
            }}
            hideShadow={true}
            hideButton={true}
          />
          <div className="container mt-3">
            <div className="d-flex justify-content-between border-bottom-custom py-2">
              <div className="text-secondary-color hm-text-14 font-weight-bold">Trip 1 Subtotal:</div>
              <div className="hm-text-14 font-weight-bold text-modal-color">{parseAmount(basic_info.amount, 2)}</div>
            </div>
            {/* <div className="d-flex justify-content-between border-bottom-custom py-2">
              <div className="text-secondary-color hm-text-14 font-weight-bold">Trip 2 Subtotal:</div>
              <div className="hm-text-14 font-weight-bold text-modal-color">{200}</div>
            </div> */}
            <div className="d-flex justify-content-between border-bottom-custom py-2">
              <div className="text-secondary-color hm-text-14 font-weight-bold">Discount:</div>
              <div className="hm-text-14 font-weight-bold text-modal-color">{200}</div>
            </div>
            <div className="d-flex justify-content-between  py-3">
              <div className="text-secondary-color hm-text-14 font-weight-bold hm-title-sub-size">Order Total Due:</div>
              <div className="hm-title-sub-size font-weight-bold text-modal-color">
                {parseAmount(basic_info.amount, 2)}
              </div>
            </div>
          </div>
          <div className="px-4 py-5 border-top">
            <div className="d-flex justify-content-between">
              <button
                className="btn shadow-sm border bg-white text-white font-weight-bold text-dark hm-text-12 rounded-custom"
                style={{ width: "310px", height: "43px" }}
              >
                Back
              </button>
              <button
                className="btn shadow-sm button-main-background font-weight-bold text-white hm-text-12 rounded-custom"
                style={{ width: "310px", height: "43px" }}
              >
                Next to payment
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    current_order: state.orderReducer.current_order,
    order_detail: state.orderReducer.order_detail,
    trip_detail_in_lord: state.tripReducer.trip_detail_in_lord,
    coupon_list_in_lord: state.couponReducer.coupon_list_in_lord
  };
};
const mapDispatchToProps = {
  findOrderDetailInLord,
  findTripDetailInLord,
  findCouponListInLord,
  applyOrderDiscountInLord,
  updateOrderDiscountInLord,
  createAddonToTrip
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetail));
