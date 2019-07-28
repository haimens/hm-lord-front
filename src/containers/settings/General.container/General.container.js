import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../../components/shared";
import GeneralAdding from "./General.component/GeneralAdding.modal";
import GeneralEditing from "./General.component/GeneralEditing.Modal";
import GeneralListItem from "./General.component/GeneralList.item";
import {
  createGeneralSettingInLord,
  findGeneralSettingListInLord,
  updateGeneralSettingListInLord
} from "../../../actions/settings.action";
import alertify from "alertifyjs";
class General extends Component {
  state = {
    showAddGeneral: false,
    showEditGeneral: false,
    currSetting: ""
  };
  editGeneralListItem = currSetting => {
    this.setState(state => ({ showEditGeneral: !state.showEditGeneral, currSetting }));
  };
  handleShowGeneralModal = () => {
    this.setState(state => ({ showAddGeneral: !state.showAddGeneral }));
  };
  updateGeneralSettingListInLord = setting_token => {
    alertify.confirm(
      "Are You Sure To Delete This Vehicle Type?",
      () => {
        this.props.updateGeneralSettingListInLord(setting_token, { status: 0 });
      },
      function() {
        alertify.error("Cancel");
      }
    );
  };
  componentDidMount() {
    this.props.findGeneralSettingListInLord();
  }
  render() {
    const { createGeneralSettingInLord, general_setting_list_in_lord, updateGeneralSettingListInLord } = this.props;
    const { showAddGeneral, showEditGeneral, currSetting } = this.state;
    return (
      <main className="container-fluid">
        {showAddGeneral && (
          <GeneralAdding
            createGeneralSettingInLord={createGeneralSettingInLord}
            onClose={this.handleShowGeneralModal}
          />
        )}
        {showEditGeneral && (
          <GeneralEditing
            updateGeneralSettingListInLord={updateGeneralSettingListInLord}
            currSetting={currSetting}
            onClose={this.editGeneralListItem}
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
              <GeneralListItem
                editGeneralListItem={this.editGeneralListItem}
                general={general}
                key={index}
                updateGeneralSettingListInLord={this.updateGeneralSettingListInLord}
              />
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
  findGeneralSettingListInLord,
  updateGeneralSettingListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(General));
