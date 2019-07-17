import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, ListHeader, ListView, CouponCard, CouponModal } from "../../components/shared";
import BasicInfo from "./orderDetail.component/BasicInfo.card";
import CustomerInfo from "./orderDetail.component/CustomerInfo.card";
import BasicInfoModal from "./orderDetail.component/BasicInfo.modal";
import CustomerInfoModal from "./orderDetail.component/CustomerInfo.modal";
import LogModal from "./orderDetail.component/Log.modal";
import { findOrderDetailInLord, updateOrderDetailInLord } from "../../actions/order.action";
import { findCouponListInLord } from "../../actions/coupon.action";
class OrderDetail extends Component {
  state = {
    showUpdateBasicInfoModal: false,
    showUpdateCustomerInfoModal: false,
    showCouponModal: false,
    showLogModal: false
  };
  handleUpdateBasicInfo = () => {
    this.setState(state => ({ showUpdateBasicInfoModal: !state.showUpdateBasicInfoModal }));
  };
  handleUpdateCustomerInfo = () => {
    this.setState(state => ({ showUpdateCustomerInfoModal: !state.showUpdateCustomerInfoModal }));
  };
  handleShowCouponModal = () => {
    this.setState(state => ({ showCouponModal: !state.showCouponModal }));
  };
  handleShowLogModal = () => {
    this.setState(state => ({ showLogModal: !state.showLogModal }));
  };
  handleAddingCoupon = discount_token => {};

  componentDidMount() {
    const { order_token } = this.props.match.params;
    Promise.all([this.props.findOrderDetailInLord(order_token), this.props.findCouponListInLord()]);
  }

  render() {
    const { showUpdateBasicInfoModal, showUpdateCustomerInfoModal, showCouponModal, showLogModal } = this.state;
    const { history, coupon_list_in_lord, order_detail, updateOrderDetailInLord, match } = this.props;
    const { order_token } = match.params;

    return (
      <main className="container-fluid">
        {showUpdateBasicInfoModal && (
          <BasicInfoModal
            order_token={order_token}
            updateOrderDetailInLord={updateOrderDetailInLord}
            order_info={order_detail.order_info}
            onClose={this.handleUpdateBasicInfo}
          />
        )}
        {showUpdateCustomerInfoModal && <CustomerInfoModal onClose={this.handleUpdateCustomerInfo} />}
        {showCouponModal && (
          <CouponModal
            handleAddingCoupon={this.handleAddingCoupon}
            coupon_list_in_lord={coupon_list_in_lord}
            onClose={this.handleShowCouponModal}
          />
        )}
        {showLogModal && <LogModal onClose={this.handleShowLogModal} />}

        <section>
          <div className="mb-4">
            <Header
              title="Order"
              tabicon={"icon_order_white.svg"}
              subTitle={"Order List"}
              thirdTitle={"Order Detail"}
              toSubLocation={"/order/list"}
              showButton={true}
              history={history}
              clickTitle={"Order"}
              buttonWidth={"88px"}
              clickFunction={() => this.props.history.push("/order/creation")}
            />
          </div>
        </section>

        <section className="mb-4">
          <div className="bg-white rounded-custom shadow-sm">
            <div className="row" style={{ padding: "40px" }}>
              <div className="col-lg-6 col-12 mb-4">
                <BasicInfo order_detail={order_detail} handleUpdateBasicInfo={this.handleUpdateBasicInfo} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <CustomerInfo
                  history={history}
                  order_detail={order_detail}
                  handleUpdateCustomerInfo={this.handleUpdateCustomerInfo}
                />
              </div>
            </div>
          </div>
        </section>
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

        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Trip List",
              clickFunction: this.handleShowLogModal,
              clickTitle: "Refresh"
            }}
            hideShadow={true}
            hideButton={true}
          />
          <div className="row p-3 triplist-scroll">
            {/* {trip_list_in_driver.record_list.map((trip, index) => (
              <TripCard
                parentProps={{
                  tripCustomer: trip.customer_name,
                  tripPickUp: trip.pickup_time,
                  tripFrom: trip.from_addr_str,
                  tripTo: trip.to_addr_str,
                  tripStatus: trip.status_str
                }}
                hideDriver={true}
              />
            ))} */}
          </div>
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Log History",
              clickFunction: this.handleShowLogModal,
              clickTitle: "Log"
            }}
            buttonWidth={"70px"}
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
    order_detail: state.orderReducer.order_detail,
    coupon_list_in_lord: state.couponReducer.coupon_list_in_lord
  };
};
const mapDispatchToProps = { findOrderDetailInLord, findCouponListInLord, updateOrderDetailInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderDetail));
