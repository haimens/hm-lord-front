import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../../components/shared";
import CouponListItem from "./Coupon.component/CouponList.item";
class Coupon extends Component {
  state = {
    showAddWage: false
  };
  handleWageSearch = keywords => {
    console.log(keywords);
  };
  handleAddingWage = () => {
    this.setState(state => ({ showAddWage: !state.showAddWage }));
  };
  render() {
    const { history } = this.props;
    return (
      <main className="container-fluid">
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
              clickFunction: this.handleShowAddingWageModal,
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
