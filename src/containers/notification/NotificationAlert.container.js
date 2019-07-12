import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../components/shared";
import NotificationAlertListItem from "./notificationAlert.component/NotificationAlertList.item";
class NotificationAlert extends Component {
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
          <Header title="Notification" subTitle="Trip Alert" tabicon={"icon_notification_white.svg"} />
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Trip Alert",
              clickFunction: this.handleShowAddingWageModal,
              clickTitle: "Wage"
            }}
            hideButton={true}
          />
          <ListView
            totalCount={30}
            title="Trip Alert"
            fieldNames={["Created On", "Amount", "Type", "Note"]}
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
)(withRouter(NotificationAlert));
