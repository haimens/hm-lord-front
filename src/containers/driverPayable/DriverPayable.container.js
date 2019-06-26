import React, { Component } from "react";
import ListView from "../../components/shared/ListView";
import DriverPayableListItem from "./driverPayable.component/DriverPayableList.item";
class DriverPayable extends Component {
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
            <h3 className="font-weight-bold">Driver Payable</h3>
            <button className="btn hm-bg-green text-white" onClick={this.handleAddingWage}>
              <span>
                <i className="fas fa-plus mr-2" />
              </span>
              Wage
            </button>
          </div>
          <div>
            <ListView
              totalCount={30}
              onSearch={this.handleWageSearch}
              fieldNames={["Payment Due Date", "Driver Name", "Payment Amount", "Note"]}
              onPageChange={this.handlePageChange}
            >
              {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <DriverPayableListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
            </ListView>
          </div>
        </section>
      </main>
    );
  }
}
export default DriverPayable;