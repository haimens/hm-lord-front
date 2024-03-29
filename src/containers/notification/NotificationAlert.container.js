import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../components/shared";
import { findAlertListInLord, muteAlertInfoInTrip } from "../../actions/alert.action";
import NotificationAlertListItem from "./notificationAlert.component/NotificationAlertList.item";
class NotificationAlert extends Component {
  handleAddingWage = () => {
    this.setState(state => ({ showAddWage: !state.showAddWage }));
  };
  handlePageChange = start => {
    this.props.findAlertListInLord({ start });
  };
  componentDidMount() {
    this.props.findAlertListInLord({ status: 3 });
  }
  render() {
    const { history, alert_list_in_lord, muteAlertInfoInTrip } = this.props;
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
            totalCount={alert_list_in_lord.count}
            title="Trip Alert"
            fieldNames={["Driver img", "Alert Time", "Driver Name", "Type", "Mute", "Trip Detail"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {alert_list_in_lord.record_list.map((alert, index) => (
              <NotificationAlertListItem
                muteAlertInfoInTrip={muteAlertInfoInTrip}
                parentProps={alert}
                key={index}
                history={history}
              />
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
const mapDispatchToProps = { findAlertListInLord, muteAlertInfoInTrip };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NotificationAlert));
