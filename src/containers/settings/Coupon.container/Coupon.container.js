import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../../components/shared";
import CouponListItem from "./Coupon.component/CouponList.item";
import CouponAdding from "./Coupon.component/CouponAdding.modal";
class Coupon extends Component {
  state = {
    showAddCouponModal: false
  };
  handleWageSearch = keywords => {
    console.log(keywords);
  };
  handleShowAddingCouponModal = () => {
    this.setState(state => ({ showAddCouponModal: !state.showAddCouponModal }));
  };
  render() {
    const { history } = this.props;
    const { showAddCouponModal } = this.state;
    return (
      <main className="container-fluid">
        {showAddCouponModal && <CouponAdding />}
        <section className="mb-4">
          <Header
            title="Settings"
            subTitle="Coupon"
            tabicon={"tabicon_dashboard.svg"}
            clickTitle={"Driver"}
            buttonWidth={"88px"}
          />
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Coupon",
              clickFunction: this.handleShowAddingCouponModal,
              clickTitle: "Coupon"
            }}
            buttonWidth={"88px"}
          />
          <ListView
            totalCount={30}
            title="Coupon"
            fieldNames={["Created On", "Name", "Amount", "Delete"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <WageListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
          </ListView>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Coupon));
