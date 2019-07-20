import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListHeader, FlightDetailModal, CouponCard, CouponModal } from "../../../components/shared";
import { convertLocalToUTC, parseAmount } from "../../../actions/utilities.action";
import "./TripDetail.card.css";
import { findFlightListInLord } from "../../../actions/flight.action";
import {
  findOrderDetailInLord,
  applyOrderDiscountInLord,
  updateOrderDiscountInLord,
  applyFinalOrder,
  updateOrderDetailInLord
} from "../../../actions/order.action";
import { findCouponListInLord } from "../../../actions/coupon.action";
import {
  findTripDetailInLord,
  findTripDetailInLordAgain,
  createAddonToTrip,
  deleteAddonItem,
  updateTripOperationInfo,
  updateTripBasicInfo
} from "../../../actions/trip.action";
import CompleteTop from "./CompleteOrder.component/CompleteTop.card";
import AddonModal from "./CompleteOrder.component/Addon.modal";
import EditAmountModal from "./CompleteOrder.component/EditAmount.card";
class CompleteOrderCard extends Component {
  state = {
    showCouponModal: false,
    showAddingAddon: false,
    showFlightDetail: false,
    currPosition: "",
    curr_trip_token: "",
    currButtonItem: "",
    name: "",
    cell: "",
    email: "",
    area: "",
    special_instruction: "",
    currFlightPosition: "",
    showEditingAmountInOrder: false,
    position: "",
    currAmount: "",
    currFlightStr: ""
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

  handleDeleteAddonItem = (trip_token, addon_token, position) => {
    this.props.deleteAddonItem(this.props.current_order.order_token, trip_token, addon_token, position);
  };

  handleFlightButton = async (props, position) => {
    await this.props.findFlightListInLord({
      date: convertLocalToUTC(props.pickup_time),
      airlineCode: props.flight_str.split(" ")[0],
      flightNumber: props.flight_str.split(" ")[1]
    });
    this.setState({ currFlightPosition: position, showFlightDetail: true });
  };

  handleFlightDetailBeenClicked = () => {
    this.setState({ showFlightDetail: false });
  };

  handleAddingAddon = async (curr_trip_token, currButtonItem, currPosition) => {
    await this.setState(state => ({
      showAddingAddon: !state.showAddingAddon,
      curr_trip_token,
      currButtonItem,
      currPosition
    }));
  };

  handleDeleteCouponFromOrder = async order_discount_token => {
    this.props.updateOrderDiscountInLord(
      this.props.current_order.order_token,
      order_discount_token,
      { status: 0 },
      this.state.currFlightPosition
    );
  };

  handleMovingToPayment = () => {
    const { current_order, handleMoveNext, applyFinalOrder, updateOrderDetailInLord } = this.props;
    const { name, area, cell } = this.state;
    updateOrderDetailInLord(current_order.order_token, { contact_name: name, contact_cell: `${area} ${cell}` }, true);
    applyFinalOrder(current_order.order_token);
    handleMoveNext(1);
  };

  getTripTotal = (total, addon_list) => {
    if (addon_list.length === 0) {
      return total;
    }
    if (addon_list.length > 0) {
      addon_list.map(addon => (total += addon.amount));
    }
    return total;
  };

  saveFlightToken = flight_token => {
    const { updateTripOperationInfo, current_order } = this.props;
    if (this.state.currFlightPosition === "first") {
      updateTripOperationInfo(current_order.trip_list[0], { flight_token }, "first");
    }
    if (this.state.currFlightPosition === "second") {
      updateTripOperationInfo(current_order.trip_list[1], { flight_token }, "second");
    }
  };

  handleUpdateTripAmount = (trip_token, amount, position, currFlightStr) => {
    this.setState({
      curr_trip_token: trip_token,
      currAmount: amount,
      showEditingAmountInOrder: true,
      position,
      currFlightStr
    });
  };

  setShowEditingAmountInOrderToFalse = () => {
    this.setState({ showEditingAmountInOrder: false });
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
      special_instruction,
      showFlightDetail,
      showEditingAmountInOrder,
      currAmount,
      position,
      currFlightStr
    } = this.state;
    const {
      coupon_list_in_lord,
      trip_detail_in_lord,
      trip_detail_in_lord_again,
      order_detail,
      current_order,
      round_trip,
      createAddonToTrip,
      flight_list_in_lord,
      findCouponListInLord,
      updateTripBasicInfo
    } = this.props;
    const { basic_info, addon_list } = trip_detail_in_lord;

    let order_token = current_order.order_token;
    let first_trip_total = this.getTripTotal(basic_info.amount, addon_list);
    let second_trip_total = this.getTripTotal(
      trip_detail_in_lord_again.basic_info.amount,
      trip_detail_in_lord_again.addon_list
    );

    let sum = first_trip_total + second_trip_total;
    let total_discount_amount = 0;
    let total_discount_rate = 0;
    if (order_detail.order_discount_list.length > 0) {
      order_detail.order_discount_list.map(discount => {
        if (discount.type === 1) {
          total_discount_amount += discount.amount;
        }
        if (discount.type === 2) {
          total_discount_rate += discount.rate;
        }
        return null;
      });
    }
    total_discount_rate = ((total_discount_rate / 1000) * sum) / 100;
    let total = (sum / 100 - total_discount_rate - total_discount_amount / 100).toFixed(2);
    return (
      <section>
        {showFlightDetail && (
          <FlightDetailModal
            saveFlightToken={this.saveFlightToken}
            onClose={this.handleFlightDetailBeenClicked}
            flight_list_in_lord={flight_list_in_lord}
          />
        )}
        {showEditingAmountInOrder && (
          <EditAmountModal
            position={position}
            updateTripBasicInfo={updateTripBasicInfo}
            onClose={this.setShowEditingAmountInOrderToFalse}
            currAmount={currAmount}
            currFlightStr={currFlightStr}
            trip_token={curr_trip_token}
          />
        )}
        {showCouponModal && (
          <CouponModal
            findCouponListInLord={findCouponListInLord}
            amount={sum}
            handleAddingCoupon={this.handleAddingCoupon}
            coupon_list_in_lord={coupon_list_in_lord}
            onClose={this.handleShowCouponModal}
          />
        )}
        {showAddingAddon && (
          <AddonModal
            title={this.state.currButtonItem}
            trip_token={curr_trip_token}
            onClose={this.handleAddingAddon}
            position={this.state.currPosition}
            createAddonToTrip={createAddonToTrip}
            order_token={order_token}
          />
        )}
        <div className="mb-4">
          <CompleteTop
            position={"first"}
            handleFlightButton={this.handleFlightButton}
            sum={first_trip_total}
            deleteAddonItem={this.handleDeleteAddonItem}
            addon_list={addon_list}
            handleAddingAddon={this.handleAddingAddon}
            trip_detail_in_lord={trip_detail_in_lord}
            handleIconBeenClicked={this.handleUpdateTripAmount}
          />
        </div>

        {round_trip && (
          <div className="mb-4">
            <CompleteTop
              position={"second"}
              handleFlightButton={this.handleFlightButton}
              sum={second_trip_total}
              deleteAddonItem={this.handleDeleteAddonItem}
              addon_list={trip_detail_in_lord_again.addon_list}
              handleAddingAddon={this.handleAddingAddon}
              trip_detail_in_lord={trip_detail_in_lord_again}
              handleIconBeenClicked={this.handleUpdateTripAmount}
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
          <div className="container-fluid mt-3">
            <div className="row p-3">
              <div className="col-12">
                <div className="d-flex justify-content-between border-bottom-custom py-2">
                  <div className="text-secondary-color hm-text-14 font-weight-bold">Trip 1 Subtotal:</div>
                  <div className="hm-text-14 font-weight-bold text-modal-color">
                    +{parseAmount(first_trip_total, 2)}
                  </div>
                </div>
              </div>
              {round_trip && (
                <div className="col-12">
                  <div className="d-flex justify-content-between border-bottom-custom py-2">
                    <div className="text-secondary-color hm-text-14 font-weight-bold">Trip 2 Subtotal:</div>
                    <div className="hm-text-14 font-weight-bold text-modal-color">
                      +{parseAmount(second_trip_total, 2)}
                    </div>
                  </div>
                </div>
              )}
              <div className="col-12">
                <div className="d-flex justify-content-between border-bottom-custom py-2">
                  <div className="text-secondary-color hm-text-14 font-weight-bold">Discount:</div>
                  <div className="hm-text-14 font-weight-bold text-modal-color">
                    -${(total_discount_amount / 100 + total_discount_rate).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-content-between  py-3">
                  <div className="text-secondary-color hm-text-14 font-weight-bold hm-title-sub-size">
                    Order Total Due:
                  </div>
                  <div className="hm-title-sub-size font-weight-bold text-modal-color">${total}</div>
                </div>
              </div>
            </div>

            <div className="px-4 py-5 border-top">
              <div className="d-flex justify-content-end">
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
    coupon_list_in_lord: state.couponReducer.coupon_list_in_lord,
    flight_list_in_lord: state.flightReducer.flight_list_in_lord
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
  applyFinalOrder,
  updateOrderDetailInLord,
  findFlightListInLord,
  updateTripOperationInfo,
  updateTripBasicInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CompleteOrderCard));
