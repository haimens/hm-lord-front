import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, ListHeader, ListView, CouponCard, CouponModal } from "../../../components/shared";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";

import BasicInfo from "./BasicInfo.card";
import "./TripDetail.card.css";
import TripSubtotal from "./TripSubtotal.card";
import TipCard from "./Tip.card";
import AddonCard from "./Addon.card";

import { findOrderDetailInLord } from "../../../actions/order.action";
import { findCouponListInLord } from "../../../actions/coupon.action";
import { findTripDetailInLord } from "../../../actions/trip.action";

class TripDetail extends Component {
  state = {
    round_trip: false,
    showCouponModal: false
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
  handleAddingCoupon = discount_token => {
    console.log(discount_token);
  };

  componentDidMount() {
    const { current_order, findOrderDetailInLord, findTripDetailInLord, findCouponListInLord } = this.props;
    let orderStr = "ORD-b7a2137a9353dea1db332fb0f9d67603";
    let tripStr = "TRIP-8ea520fbb71c379142994763322a4a12";
    Promise.all([findOrderDetailInLord(orderStr), findTripDetailInLord(tripStr), findCouponListInLord()]);
  }
  render() {
    const { round_trip, showCouponModal } = this.state;
    const { history, coupon_list_in_lord, trip_detail_in_lord } = this.props;
    const { basic_info, from_address_info, to_address_info } = trip_detail_in_lord;

    return (
      <section>
        {showCouponModal && (
          <CouponModal
            handleAddingCoupon={this.handleAddingCoupon}
            coupon_list_in_lord={coupon_list_in_lord}
            onClose={this.handleShowCouponModal}
          />
        )}
        <div className="mb-4">
          <div className="bg-white rounded-custom shadow-sm">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-12 mb-4">
                  <div className="hm-title-sub-size font-weight-bold text-modal-color p-4">Trip 1</div>
                  <BasicInfo
                    from_address_info={from_address_info}
                    to_address_info={to_address_info}
                    basic_info={basic_info}
                    showEditButton={true}
                  />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <div className="text-right hm-title-sub-size font-weight-bold text-modal-color p-4">
                    <span className="hm-title-sub-size font-weight-bold text-secondary-color text-modal-color mr-3">
                      Trip 1 Subtotal:
                    </span>
                    {parseAmount(basic_info.amount, 2)}
                  </div>
                  <TripSubtotal from_address_info={from_address_info} to_address_info={to_address_info} />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <TipCard showEditButton={true} />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <AddonCard showEditButton={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 
        <div className="mb-4">
          <div className="bg-white rounded-custom shadow-sm">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-12 mb-4">
                  <div className="hm-title-sub-size font-weight-bold text-modal-color p-4">Trip 2</div>
                  <BasicInfo showEditButton={true} />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <div className="text-right hm-title-sub-size font-weight-bold text-modal-color p-4">
                    <span className="hm-title-sub-size font-weight-bold text-secondary-color text-modal-color mr-3">
                      Trip 2 Subtotal:
                    </span>
                    ${100}
                  </div>
                  <TripSubtotal />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <TipCard showEditButton={true} />
                </div>
                <div className="col-lg-6 col-12 mb-4">
                  <AddonCard showEditButton={true} />
                </div>
              </div>
            </div>
          </div>
        </div> */}

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
            <CouponCard />
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
              <div className="hm-text-14 font-weight-bold text-modal-color">{200}</div>
            </div>
            <div className="d-flex justify-content-between border-bottom-custom py-2">
              <div className="text-secondary-color hm-text-14 font-weight-bold">Trip 2 Subtotal:</div>
              <div className="hm-text-14 font-weight-bold text-modal-color">{200}</div>
            </div>
            <div className="d-flex justify-content-between border-bottom-custom py-2">
              <div className="text-secondary-color hm-text-14 font-weight-bold">Discount:</div>
              <div className="hm-text-14 font-weight-bold text-modal-color">{200}</div>
            </div>
            <div className="d-flex justify-content-between  py-3">
              <div className="text-secondary-color hm-text-14 font-weight-bold hm-title-sub-size">Order Total Due:</div>
              <div className="hm-title-sub-size font-weight-bold text-modal-color">{200}</div>
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
    trip_detail_in_lord: state.tripReducer.trip_detail_in_lord,
    coupon_list_in_lord: state.couponReducer.coupon_list_in_lord
  };
};
const mapDispatchToProps = { findOrderDetailInLord, findTripDetailInLord, findCouponListInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetail));
