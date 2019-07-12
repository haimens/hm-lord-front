import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../../components/shared";
import GeneralAdding from "./General.component/GeneralAdding.modal";
import GeneralListItem from "./General.component/GeneralList.item";
class General extends Component {
  state = {
    showAddGeneral: false
  };
  handleGeneralSearch = keywords => {
    console.log(keywords);
  };
  handleShowGeneralModal = () => {
    this.setState(state => ({ showAddGeneral: !state.showAddGeneral }));
  };
  render() {
    const { history } = this.props;
    const { showAddGeneral } = this.state;
    return (
      <main className="container-fluid">
        {showAddGeneral && <GeneralAdding onClose={this.handleShowGeneralModal} />}
        <section className="mb-4">
          <Header
            title="Settings"
            subTitle="General Setting"
            tabicon={"icon_settings_white.svg"}
            clickTitle={"General Type"}
            buttonWidth={"110px"}
          />
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "General Setting",
              clickFunction: this.handleShowGeneralModal,
              clickTitle: "Key Value"
            }}
            buttonWidth={"110px"}
          />
          <ListView
            totalCount={30}
            title="General"
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
)(withRouter(General));
