import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../components/shared";
import NotificationMessageListItem from "./notificationMessage.component/NotificationMessageList.item";
class NotificationMessage extends Component {
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
          <Header title="Notification" subTitle="Message Center" tabicon={"icon_notification_white.svg"} />
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Message Center",
              clickFunction: this.handleShowAddingWageModal,
              clickTitle: "Wage"
            }}
            hideButton={true}
          />
          <ListView
            totalCount={30}
            title="Message Center"
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
)(withRouter(NotificationMessage));
