import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, ListHeader, ListView, CouponCard, CouponModal } from "../../../components/shared";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";

import "./TripDetail.card.css";

import {
  findOrderDetailInLord,
  applyOrderDiscountInLord,
  updateOrderDiscountInLord,
  applyFinalOrder
} from "../../../actions/order.action";
import { findCouponListInLord } from "../../../actions/coupon.action";
import {
  findTripDetailInLord,
  findTripDetailInLordAgain,
  createAddonToTrip,
  deleteAddonItem
} from "../../../actions/trip.action";
import CompleteTop from "./CompleteOrder.component/CompleteTop.card";
import AddonModal from "./CompleteOrder.component/Addon.modal";

class CompleteOrderCard extends Component {
  state = {
    showCouponModal: false,
    showAddingAddon: false,
    curr_trip_token: "",
    currButtonItem: "",
    name: "",
    cell: "",
    email: "",
    area: "",
    special_instruction: ""
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
    this.props.applyOrderDiscountInLord(this.props.current_order.order_token, { code });
    this.handleShowCouponModal();
  };

  handleDeleteAddonItem = (trip_token, addon_token) => {
    this.props.deleteAddonItem(this.props.current_order.order_token, trip_token, addon_token);
  };

  handleAddingAddon = async (curr_trip_token, currButtonItem) => {
    await this.setState(state => ({ showAddingAddon: !state.showAddingAddon, curr_trip_token, currButtonItem }));
  };

  handleDeleteCouponFromOrder = async order_discount_token => {
    this.props.updateOrderDiscountInLord(this.props.current_order.order_token, order_discount_token, { status: 0 });
    const { current_order, findTripDetailInLord, round_trip } = this.props;
    await Promise.all([findTripDetailInLord(current_order.trip_list[0])]);
    if (round_trip) {
      findTripDetailInLordAgain(current_order.trip_list[1]);
    }
  };

  handleMovingToPayment = () => {
    const { current_order, handleMoveNext, applyFinalOrder } = this.props;
    applyFinalOrder(current_order.order_token);
    handleMoveNext(1);
  };

  async componentDidMount() {
    const {
      current_order,
      findOrderDetailInLord,
      findTripDetailInLord,
      findCouponListInLord,
      round_trip,
      findTripDetailInLordAgain
    } = this.props;
    await Promise.all([
      findOrderDetailInLord(current_order.order_token),
      findTripDetailInLord(current_order.trip_list[0]),
      findCouponListInLord()
    ]);
    if (round_trip) {
      findTripDetailInLordAgain(current_order.trip_list[1]);
    }
    const { customer_info } = this.props.order_detail;
    console.log(this.props);
    this.setState({
      name: customer_info.name,
      email: customer_info.email,
      cell: customer_info.cell.split(" ")[1],
      area: customer_info.cell.split(" ")[0]
    });
  }
  render() {
    const {
      showCouponModal,
      showAddingAddon,
      curr_trip_token,
      name,
      email,
      cell,
      area,
      special_instruction
    } = this.state;
    const {
      history,
      coupon_list_in_lord,
      trip_detail_in_lord,
      trip_detail_in_lord_again,
      order_detail,
      current_order,
      round_trip,
      createAddonToTrip
    } = this.props;
    const { basic_info, addon_list } = trip_detail_in_lord;
    let totalDiscount = 0;
    if (order_detail.order_discount_list.length > 0) {
      totalDiscount = order_detail.order_discount_list.map(discount => console.log(discount));
    }
    let order_token = current_order.order_token;
    let trip_token = current_order.trip_list[0];
    let trip_token2 = 0;
    if (round_trip) {
      trip_token2 = current_order.trip_list[1];
    }
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
            title={this.state.currButtonItem}
            onClose={this.handleAddingAddon}
            createAddonToTrip={createAddonToTrip}
            order_token={order_token}
            trip_token={curr_trip_token}
          />
        )}
        <div className="mb-4">
          <CompleteTop
            deleteAddonItem={this.handleDeleteAddonItem}
            addon_list={addon_list}
            trip_token={trip_token}
            handleAddingAddon={this.handleAddingAddon}
            trip_detail_in_lord={trip_detail_in_lord}
          />
        </div>

        {round_trip && (
          <div className="mb-4">
            <CompleteTop
              deleteAddonItem={this.handleDeleteAddonItem}
              addon_list={trip_detail_in_lord_again.addon_list}
              trip_token={trip_token2}
              handleAddingAddon={this.handleAddingAddon}
              trip_detail_in_lord={trip_detail_in_lord_again}
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
                    id="name"
                    value={name}
                    placeholder={"Name"}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-4">
                <label htmlFor="cell" className="hm-text-14 text-main-color font-weight-bold">
                  Cell
                </label>
                <div className="form-group input-group d-flex">
                  <input
                    type="text"
                    className="form-control hm-input-height col-2"
                    id="area"
                    placeholder="Area"
                    value={area}
                    onChange={this.handleInputChange}
                  />

                  <input
                    type="text"
                    className="form-control hm-input-height "
                    id="cell"
                    placeholder="Cell"
                    value={cell}
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
                    id="email"
                    value={email}
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
                    value={special_instruction}
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
            {round_trip && (
              <div className="d-flex justify-content-between border-bottom-custom py-2">
                <div className="text-secondary-color hm-text-14 font-weight-bold">Trip 2 Subtotal:</div>
                <div className="hm-text-14 font-weight-bold text-modal-color">
                  {parseAmount(trip_detail_in_lord_again.basic_info.amount, 2)}
                </div>
              </div>
            )}
            <div className="d-flex justify-content-between border-bottom-custom py-2">
              <div className="text-secondary-color hm-text-14 font-weight-bold">Discount:</div>
              <div className="hm-text-14 font-weight-bold text-modal-color">{200}</div>
            </div>
            <div className="d-flex justify-content-between  py-3">
              <div className="text-secondary-color hm-text-14 font-weight-bold hm-title-sub-size">Order Total Due:</div>
              <div className="hm-title-sub-size font-weight-bold text-modal-color">
                {parseAmount(basic_info.amount + trip_detail_in_lord_again.basic_info.amount, 2)}
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
                onClick={this.handleMovingToPayment}
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
    trip_detail_in_lord_again: state.tripReducer.trip_detail_in_lord_again,
    coupon_list_in_lord: state.couponReducer.coupon_list_in_lord
  };
};
const mapDispatchToProps = {
  findOrderDetailInLord,
  findTripDetailInLord,
  findTripDetailInLordAgain,
  findCouponListInLord,
  applyOrderDiscountInLord,
  updateOrderDiscountInLord,
  createAddonToTrip,
  deleteAddonItem,
  applyFinalOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CompleteOrderCard));
