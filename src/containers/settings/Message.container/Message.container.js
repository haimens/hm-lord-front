import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MessageDetailListItem from "./Message.component/MessageList.item";
import MessageModal from "./Message.component/Message.modal";
import MessageUpdateModal from "./Message.component/MessageUpdate.modal";

import SourceDetail from "../Source.share/SourceDetail.container";
import { Header, ListView, ListHeader } from "../../../components/shared";

import {
  findRealmDetailInLord,
  findMessageListInLord,
  createRealmMessageInLord,
  setPrimaryForResources,
  updateMessageMethod
} from "../../../actions/settings.action";
class Message extends Component {
  state = {
    showCreateMessageResource: false,
    showEditMessageResource: false,
    currMessageResource: ""
  };
  handleCreateMessageResource = () => {
    this.setState(states => ({ showCreateMessageResource: !states.showCreateMessageResource }));
  };

  handleUpdateMessageResource = (message_resource_token, currMessage) => {
    this.setState(states => ({
      showEditMessageResource: !states.showEditMessageResource,
      currMessageResource: {
        message_resource_token,
        currMessage
      }
    }));
  };

  async componentDidMount() {
    const { findRealmDetailInLord, findMessageListInLord } = this.props;
    Promise.all([findRealmDetailInLord(), findMessageListInLord()]);
  }
  handlePageChange = start => {
    this.props.findAllMessageResourceList({ start });
  };
  render() {
    const {
      history,
      createRealmMessageInLord,
      setPrimaryForResources,
      realm_list_in_lord,
      message_list_in_lord,
      updateMessageMethod
    } = this.props;
    const { basic_info, message_resource_info } = realm_list_in_lord;
    const { showCreateMessageResource, showEditMessageResource, currMessageResource } = this.state;
    return (
      <main>
        {showCreateMessageResource && (
          <MessageModal createAMessageMethod={createRealmMessageInLord} onClose={this.handleCreateMessageResource} />
        )}
        {showEditMessageResource && (
          <MessageUpdateModal
            updateAMessageMethod={updateMessageMethod}
            currMessageResource={currMessageResource}
            onClose={this.handleUpdateMessageResource}
          />
        )}
        <section className="container-fluid">
          <div className="mb-4">
            <Header title="Settings" history={history} tabicon={"tabicon_.svg"} subTitle={"Message Resource"} />
          </div>
          <div className="mb-4 ">
            <SourceDetail
              title={"Primary Message Information"}
              imgLink={basic_info.logo_path}
              subTitles={["Twilio Account Id", "Twilio Auth Id", "Twilio From Num"]}
              subTitlesInfos={[
                message_resource_info.twilio_account_id,
                message_resource_info.twilio_auth_token,
                message_resource_info.twilio_from_num
              ]}
            />
          </div>
          <div className="mb-4">
            <ListHeader
              parentProps={{
                title: "Message Resource List",
                clickFunction: this.handleCreateMessageResource,
                clickTitle: "Message Resource"
              }}
              buttonWidth={"146px"}
            />
            <ListView
              totalCount={message_list_in_lord.count}
              title=" Admin List"
              fieldNames={["Twilio Account Id", "Twilio Auth Id", "Twilio From Num", "Status", "edit"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {message_list_in_lord.record_list.map((message, index) => (
                <MessageDetailListItem
                  parentProps={message}
                  handleUpdateMessageResource={this.handleUpdateMessageResource}
                  setPrimaryForResources={setPrimaryForResources}
                  isPrimary={
                    realm_list_in_lord.message_resource_info.message_resource_token === message.message_resource_token
                  }
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
    message_list_in_lord: state.settingsReducer.message_list_in_lord
  };
};
const mapDispatchToProps = {
  findRealmDetailInLord,
  findMessageListInLord,
  createRealmMessageInLord,
  setPrimaryForResources,
  updateMessageMethod
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Message));
