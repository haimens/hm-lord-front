import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EmailDetailListItem from "./Email.component/EmailList.item";
import EmailModal from "./Email.component/Email.modal";
import EmailUpdateModal from "./Email.component/EmailUpdate.modal";
import { Header, ListView, ListHeader } from "../../../components/shared";
import SourceDetail from "../Source.share/SourceDetail.container";
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
    const { match } = this.props;
    Promise.all([]);
  }
  handlePageChange = start => {
    this.props.findAllEmailResourceList({ start });
  };
  render() {
    const { history } = this.props;
    const { showCreateEmailResource, showEditEmailResource, currEmailResource } = this.state;

    return (
      <main>
        {/* {showCreateEmailResource && (
          <EmailModal
            realm_token={realm_token}
            createAEmailMethod={createAEmailMethod}
            onClose={this.handleCreateEmailResource}
          />
        )}
        {showEditEmailResource && (
          <EmailUpdateModal
            realm_token={realm_token}
            updateAEmailMethod={updateAEmailMethod}
            currEmailResource={currEmailResource}
            onClose={this.handleUpdateEmailResource}
          />
        )} */}
        <section className="container-fluid">
          <div className="mb-4">
            <Header title="Settings" history={history} tabicon={"tabicon_.svg"} subTitle={"Email Resource"} />
          </div>
          <div className="mb-4 ">
            <SourceDetail
              title={"Primary Email Information"}
              imgLink={123}
              subTitles={["SendGrid API Key", "SendGrid From Email"]}
              subTitlesInfos={[123, 123]}
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
              totalCount={30}
              title="Email List"
              fieldNames={["sendgrid api key", "sendgrid from_email", "Status", "edit"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {/* {email_list.record_list.map((email, index) => (
                <EmailDetailListItem
                  parentProps={email}
                  handleUpdateEmailResource={this.handleUpdateEmailResource}
                  setPrimaryForResources={setPrimaryForResources}
                  realm_token={realm_token}
                  isPrimary={_detail.email_resource_info.email_resource_token === email.email_resource_token}
                  key={index}
                />
              ))} */}
            </ListView>
          </div>
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
)(withRouter(Email));
