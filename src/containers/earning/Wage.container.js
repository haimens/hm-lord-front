import React, { Component } from "react";
import ListView from "../../components/shared/ListView";
import WageListItem from "./Wage.component/WageList.item";
class Wage extends Component {
  handleWageSearch = keywords => {
    console.log(keywords);
  };
  render() {
    return (
      <main>
        <section>
          <div className="mb-4">
            <h3 className="font-weight-bold">Wage</h3>
          </div>
          <div>
            <ListView
              totalCount={30}
              onSearch={this.handleWageSearch}
              fieldNames={["Created On", "Driver Name", "Account", "Type", "Detail"]}
              onPageChange={this.handlePageChange}
            >
              {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <WageListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
            </ListView>
          </div>
        </section>
      </main>
    );
  }
}
export default Wage;
