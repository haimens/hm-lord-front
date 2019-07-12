import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EmailDetailListItem from "./Email.component/EmailList.item";
import EmailModal from "./Email.component/Email.modal";
import EmailUpdateModal from "./Email.component/EmailUpdate.modal";
import { Header, ListView, ListHeader } from "../../../components/shared";
import SourceDetail from "../Source.share/SourceDetail.container";
import {
  findRealmDetailInLord,
  findEmailListInLord,
  createRealmEmailInLord,
  updateAEmailMethod,
  setPrimaryForResources
} from "../../../actions/settings.action";

class Email extends Component {
  state = {
    showCreateEmailResource: false,
    showEditEmailResource: false,
    currEmailResource: ""
  };
  handleCreateEmailResource = () => {
    this.setState(states => ({ showCreateEmailResource: !states.showCreateEmailResource }));
  };

  handleUpdateEmailResource = (email_resource_token, currEmail) => {
    this.setState(states => ({
      showEditEmailResource: !states.showEditEmailResource,
      currEmailResource: {
        email_resource_token,
        currEmail
      }
    }));
  };

  async componentDidMount() {
    const { findRealmDetailInLord, findEmailListInLord } = this.props;
    Promise.all([findRealmDetailInLord(), findEmailListInLord()]);
  }
  handlePageChange = start => {
    this.props.findAllEmailResourceList({ start });
  };
  render() {
    const {
      history,
      createRealmEmailInLord,
      setPrimaryForResources,
      realm_list_in_lord,
      email_list_in_lord,
      updateAEmailMethod
    } = this.props;
    const { showCreateEmailResource, showEditEmailResource, currEmailResource } = this.state;
    const { basic_info, email_resource_info } = realm_list_in_lord;

    return (
      <main>
        {showCreateEmailResource && (
          <EmailModal createAEmailMethod={createRealmEmailInLord} onClose={this.handleCreateEmailResource} />
        )}
        {showEditEmailResource && (
          <EmailUpdateModal
            updateAEmailMethod={updateAEmailMethod}
            currEmailResource={currEmailResource}
            onClose={this.handleUpdateEmailResource}
          />
        )}
        <section className="container-fluid">
          <div className="mb-4">
            <Header title="Settings" history={history} tabicon={"tabicon_.svg"} subTitle={"Email Resource"} />
          </div>
          <div className="mb-4 ">
            <SourceDetail
              title={"Primary Email Information"}
              imgLink={basic_info.logo_path}
              subTitles={["SendGrid API Key", "SendGrid From Email"]}
              subTitlesInfos={[email_resource_info.sendgrid_api_key, email_resource_info.sendgrid_from_email]}
            />
          </div>
          <div className="mb-4">
            <ListHeader
              parentProps={{
                title: "Email Resource List",
                clickFunction: this.handleCreateEmailResource,
                clickTitle: "Email Resource"
              }}
              buttonWidth={"146px"}
            />
            <ListView
              totalCount={email_list_in_lord.count}
              title="Email List"
              fieldNames={["sendgrid api key", "sendgrid from_email", "Status", "edit"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {email_list_in_lord.record_list.map((email, index) => (
                <EmailDetailListItem
                  parentProps={email}
                  handleUpdateEmailResource={this.handleUpdateEmailResource}
                  setPrimaryForResources={setPrimaryForResources}
                  isPrimary={realm_list_in_lord.email_resource_info.email_resource_token === email.email_resource_token}
                  key={index}
                />
              ))}
            </ListView>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    realm_list_in_lord: state.settingsReducer.realm_list_in_lord,
    email_list_in_lord: state.settingsReducer.email_list_in_lord
  };
};
const mapDispatchToProps = {
  findRealmDetailInLord,
  findEmailListInLord,
  createRealmEmailInLord,
  updateAEmailMethod,
  setPrimaryForResources
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Email));
