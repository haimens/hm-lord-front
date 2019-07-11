import React, { Component } from "react";
import { Header, ListHeader, ListView } from "../../components/shared";
import BasicInfo from "./orderDetail.component/BasicInfo.card";
import CustomerInfo from "./orderDetail.component/CustomerInfo.card";
import CouponCard from "./orderDetail.component/Coupon.card";
import BasicInfoModal from "./orderDetail.component/BasicInfo.modal";
import CustomerInfoModal from "./orderDetail.component/CustomerInfo.modal";
class OrderDetail extends Component {
  state = {
    showUpdateBasicInfoModal: false,
    showUpdateCustomerInfoModal: false
  };
  handleUpdateBasicInfo = () => {
    this.setState(state => ({ showUpdateBasicInfoModal: !state.showUpdateBasicInfoModal }));
  };
  handleUpdateCustomerInfo = () => {
    this.setState(state => ({ showUpdateCustomerInfoModal: !state.showUpdateCustomerInfoModal }));
  };
  render() {
    const { showUpdateBasicInfoModal, showUpdateCustomerInfoModal } = this.state;
    return (
      <main className="container-fluid">
        {showUpdateBasicInfoModal && <BasicInfoModal onClose={this.handleUpdateBasicInfo} />}
        {showUpdateCustomerInfoModal && <CustomerInfoModal onClose={this.handleUpdateCustomerInfo} />}

        <section>
          <div className="mb-4">
            <Header
              title="Order List"
              tabicon={"tabicon_dashboard.svg"}
              showButton={true}
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
                <BasicInfo handleUpdateBasicInfo={this.handleUpdateBasicInfo} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <CustomerInfo handleUpdateCustomerInfo={this.handleUpdateCustomerInfo} />
              </div>
            </div>
          </div>
        </section>
        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Coupon List",
              clickFunction: this.handleAddCompanyModal,
              clickTitle: "Coupon"
            }}
            hideShadow={true}
            buttonWidth={"88px"}
          />
          <div className="row p-3 triplist-scroll">
            <CouponCard />
          </div>
        </section>

        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Trip List",
              clickFunction: this.handleAddCompanyModal,
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
              clickFunction: this.handleShowAddingVehicleModal,
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
export default OrderDetail;
