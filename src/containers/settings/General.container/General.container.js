import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../../components/shared";
import GeneralAdding from "./General.component/GeneralAdding.modal";
import GeneralListItem from "./General.component/GeneralList.item";
import { createGeneralSettingInLord, findGeneralSettingListInLord } from "../../../actions/settings.action";
class General extends Component {
  state = {
    showAddGeneral: false
  };
  handleGeneralSearch = keywords => {};
  handleShowGeneralModal = () => {
    this.setState(state => ({ showAddGeneral: !state.showAddGeneral }));
  };
  componentDidMount() {
    this.props.findGeneralSettingListInLord();
  }
  render() {
    const { history, createGeneralSettingInLord, general_setting_list_in_lord } = this.props;
    const { showAddGeneral } = this.state;
    return (
      <main className="container-fluid">
        {showAddGeneral && (
          <GeneralAdding
            createGeneralSettingInLord={createGeneralSettingInLord}
            onClose={this.handleShowGeneralModal}
          />
        )}
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
            fieldNames={["Created On", "Key", "Value", "Edit", "Delete"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {general_setting_list_in_lord.record_list.map((general, index) => (
              <GeneralListItem general={general} key={index} onClick={this.handlePunchItemClick} />
            ))}
          </ListView>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return { general_setting_list_in_lord: state.settingsReducer.general_setting_list_in_lord };
};
const mapDispatchToProps = {
  createGeneralSettingInLord,
  findGeneralSettingListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(General));
