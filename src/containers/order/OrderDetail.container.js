import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Header,
  ListHeader,
  ListView,
  CouponCard,
  CouponModal,
  TripCard,
  AddingNote,
  LogItem,
  ChatModalContainer,
  EmailPreviewModal
} from "../../components/shared";
import BasicInfo from "./orderDetail.component/BasicInfo.card";
import CustomerInfo from "./orderDetail.component/CustomerInfo.card";
import BasicInfoModal from "./orderDetail.component/BasicInfo.modal";
import CustomerInfoModal from "./orderDetail.component/CustomerInfo.modal";
import {
  findOrderDetailInLord,
  updateOrderDetailInLord,
  updateOrderDiscountInLord,
  applyOrderDiscountInLord,
  applyFinalOrder,
  cancelOrder,
  confirmOrder
} from "../../actions/order.action";
import {
  findMessageDetailWithCustomer,
  setChatToFalse,
  createAMessageWithCustomer,
  updateSmsStatus,
  findMessageAndResetData
} from "../../actions/message.action";
import { createOrderNoteListInLord, findOrderNoteListInLord } from "../../actions/note.action";
import { findCouponListInLord } from "../../actions/coupon.action";
import { sendEmailToConfirm } from "../../actions/email.action";
class OrderDetail extends Component {
  state = {
    showUpdateBasicInfoModal: false,
    showUpdateCustomerInfoModal: false,
    showCouponModal: false,
    showLogModal: false,
    showAddingLogInOrder: false,
    customer_token: "",
    name: "",
    showEmailModal: false
  };
  handleAddingLog = () => {
    this.setState(state => ({ showAddingLogInOrder: !state.showAddingLogInOrder }));
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
  handlePageChange = start => {
    const { order_token } = this.props.match.params;
    this.props.findOrderNoteListInLord(order_token, { start });
  };

  handleDeleteCouponFromOrder = async order_discount_token => {
    const { order_token } = this.props.match.params;
    this.props.updateOrderDiscountInLord(
      order_token,
      order_discount_token,
      { status: 0 },
      this.state.currFlightPosition
    );
  };
  handlePreview = () => {
    this.setState({ showPreviewModal: !this.state.showPreviewModal });
  };
  handleAddingCoupon = code => {
    const { order_token } = this.props.match.params;
    this.props.applyOrderDiscountInLord(order_token, { code });
    this.handleShowCouponModal();
  };
  findMoreList = async (customer_token, start) => {
    await this.props.findMessageDetailWithCustomer(customer_token, start);
  };
  handleShowChatWithCustomer = async () => {
    this.props.setChatToFalse();
  };
  handleChatWithCustomer = async (customer_token, name) => {
    this.setState({ customer_token, name });
    await this.props.findMessageAndResetData(customer_token);
  };
  handleShowEmailModal = () => {
    this.setState(state => ({ showEmailModal: !state.showEmailModal }));
  };

  componentDidMount() {
    const { order_token } = this.props.match.params;
    const { findOrderDetailInLord, findCouponListInLord, findOrderNoteListInLord } = this.props;
    Promise.all([findOrderDetailInLord(order_token), findCouponListInLord(), findOrderNoteListInLord(order_token)]);
  }

  render() {
    const {
      showEditAlertModal,
      customer_token,
      showUpdateBasicInfoModal,
      showUpdateCustomerInfoModal,
      showCouponModal,
      showAddingLogInOrder,
      name,
      showEmailModal
    } = this.state;
    const {
      history,
      coupon_list_in_lord,
      order_detail,
      updateOrderDetailInLord,
      match,
      note_list_for_order,
      createOrderNoteListInLord,
      applyFinalOrder,
      cancelOrder,
      confirmOrder,
      showChat,
      createAMessageWithCustomer,
      updateSmsStatus,
      message_detail_with_customer,
      sendEmailToConfirm
    } = this.props;
    const { order_token } = match.params;
    const {
      order_info: { status_str },
      trip_list
    } = order_detail;
    let sum = 0;
    sum = trip_list.map(trip => (sum += trip.amount));

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
        {showAddingLogInOrder && (
          <AddingNote token={order_token} createANote={createOrderNoteListInLord} onClose={this.handleAddingLog} />
        )}
        {showUpdateCustomerInfoModal && <CustomerInfoModal onClose={this.handleUpdateCustomerInfo} />}
        {showCouponModal && (
          <CouponModal
            amount={sum}
            handleAddingCoupon={this.handleAddingCoupon}
            coupon_list_in_lord={coupon_list_in_lord}
            onClose={this.handleShowCouponModal}
          />
        )}
        {showChat && (
          <ChatModalContainer
            updateSmsStatus={updateSmsStatus}
            name={name}
            findMoreList={this.findMoreList}
            token={customer_token}
            list={message_detail_with_customer}
            createAMessageWithCustomer={createAMessageWithCustomer}
            handleClose={this.handleShowChatWithCustomer}
          />
        )}
        {showEmailModal && (
          <EmailPreviewModal
            history={history}
            sendEmailToConfirm={sendEmailToConfirm}
            order_detail={order_detail}
            onClose={this.handleShowEmailModal}
          />
        )}
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
                <BasicInfo
                  order_token={order_token}
                  history={history}
                  cancelOrder={cancelOrder}
                  applyFinalOrder={applyFinalOrder}
                  order_detail={order_detail}
                  handleUpdateBasicInfo={this.handleUpdateBasicInfo}
                  confirmOrder={confirmOrder}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <CustomerInfo
                  history={history}
                  order_detail={order_detail}
                  handleDetailButtonClicked={this.handleChatWithCustomer}
                  handleUpdateCustomerInfo={this.handleUpdateCustomerInfo}
                  handleShowEmailModal={this.handleShowEmailModal}
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
            hideButton={status_str === "FINALIZED"}
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
            {trip_list.map((trip, index) => (
              <TripCard
                parentProps={{
                  tripCustomer: order_detail.customer_info.name,
                  tripPickUp: trip.pickup_time,
                  tripFrom: trip.from_addr_str,
                  tripTo: trip.to_addr_str,
                  tripStatus: trip.status_str,
                  trip_token: trip.trip_token
                }}
                history={history}
                key={index}
                hideDriver={true}
              />
            ))}
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
            totalCount={note_list_for_order.count}
            title="Log History"
            fieldNames={["Created Date", "Log Note"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {note_list_for_order.record_list.map((note, index) => (
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
    order_detail: state.orderReducer.order_detail,
    coupon_list_in_lord: state.couponReducer.coupon_list_in_lord,
    note_list_for_order: state.noteReducer.note_list_for_order,
    message_detail_with_customer: state.smsReducer.message_detail_with_customer,
    showChat: state.smsReducer.showChat
  };
};
const mapDispatchToProps = {
  findOrderDetailInLord,
  findCouponListInLord,
  updateOrderDetailInLord,
  updateOrderDiscountInLord,
  applyOrderDiscountInLord,
  createOrderNoteListInLord,
  findOrderNoteListInLord,
  applyFinalOrder,
  cancelOrder,
  confirmOrder,
  findMessageDetailWithCustomer,
  setChatToFalse,
  createAMessageWithCustomer,
  updateSmsStatus,
  findMessageAndResetData,
  sendEmailToConfirm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderDetail));
