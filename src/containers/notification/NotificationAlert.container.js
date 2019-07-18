import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../components/shared";
import { findAlertListInLord } from "../../actions/alert.action";
import NotificationAlertListItem from "./notificationAlert.component/NotificationAlertList.item";
class NotificationAlert extends Component {
  state = {
    showAddWage: false
  };
  handleWageSearch = keywords => {};
  handleAddingWage = () => {
    this.setState(state => ({ showAddWage: !state.showAddWage }));
  };
  componentDidMount() {
    this.props.findAlertListInLord();
  }
  render() {
    const { history, alert_list_in_lord } = this.props;
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
            fieldNames={["Driver img", "Alert Time", "Driver Name", "Type", "Trip Detail"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {alert_list_in_lord.record_list.map((alert, index) => (
              <NotificationAlertListItem parentProps={alert} key={index} onClick={this.handlePunchItemClick} />
            ))}
          </ListView>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    alert_list_in_lord: state.alertReducer.alert_list_in_lord
  };
};
const mapDispatchToProps = { findAlertListInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NotificationAlert));
