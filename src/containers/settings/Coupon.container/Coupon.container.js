import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../../components/shared";
import CouponListItem from "./Coupon.component/CouponList.item";
import CouponAdding from "./Coupon.component/CouponAdding.modal";
import { findCouponListInLord, createACouponInLord, updateACouponInLord } from "../../../actions/coupon.action";
class Coupon extends Component {
  state = {
    showAddCouponModal: false
  };
  handleWageSearch = keywords => {};
  handleShowAddingCouponModal = () => {
    this.setState(state => ({ showAddCouponModal: !state.showAddCouponModal }));
  };
  handleUpdateACouponInLord = discount_token => {
    this.props.updateACouponInLord(discount_token, { status: 0 });
  };
  componentDidMount() {
    this.props.findCouponListInLord();
  }
  render() {
    const { createACouponInLord, coupon_list_in_lord } = this.props;
    const { showAddCouponModal } = this.state;
    return (
      <main className="container-fluid">
        {showAddCouponModal && (
          <CouponAdding createACouponInLord={createACouponInLord} onClose={this.handleShowAddingCouponModal} />
        )}
        <section className="mb-4">
          <Header
            title="Settings"
            subTitle="Coupon"
            tabicon={"icon_settings_white.svg"}
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
            fieldNames={["Created On", "Amount", "Min Amount", "Available Usage", "Delete"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {coupon_list_in_lord.record_list.map((coupon, index) => (
              <CouponListItem parentProps={coupon} key={index} onClick={this.handleUpdateACouponInLord} />
            ))}
          </ListView>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    coupon_list_in_lord: state.couponReducer.coupon_list_in_lord
  };
};
const mapDispatchToProps = { findCouponListInLord, createACouponInLord, updateACouponInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Coupon));
