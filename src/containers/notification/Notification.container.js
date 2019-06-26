import React, { Component } from "react";
import ListView from "../../components/shared/ListView";
import NotificationListItem from "./notification.component/NotificationList.item";
class Notification extends Component {
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
    return (
      <main>
        <section>
          <div className="mb-4 d-flex justify-content-between">
            <h3 className="font-weight-bold">Notification</h3>
          </div>
          <div>
            <ListView
              totalCount={30}
              onSearch={this.handleWageSearch}
              fieldNames={["Created On", "Driver Name", "Type", "Trip Detail"]}
              onPageChange={this.handlePageChange}
            >
              {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <NotificationListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
            </ListView>
          </div>
        </section>
      </main>
    );
  }
}
export default Notification;
