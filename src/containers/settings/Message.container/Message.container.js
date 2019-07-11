import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MessageDetailListItem from "./Message.component/MessageList.item";
import MessageModal from "./Message.component/Message.modal";
import MessageUpdateModal from "./Message.component/MessageUpdate.modal";

import SourceDetail from "../Source.share/SourceDetail.container";
import { Header, ListView, ListHeader } from "../../../components/shared";

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
    const { match } = this.props;
    Promise.all([]);
  }
  handlePageChange = start => {
    this.props.findAllMessageResourceList({ start });
  };
  render() {
    const { history } = this.props;
    const { showCreateMessageResource, showEditMessageResource, currMessageResource } = this.state;
    return (
      <main>
        {/* {showCreateMessageResource && (
          <MessageModal
            realm_token={realm_token}
            createAMessageMethod={createAMessageMethod}
            onClose={this.handleCreateMessageResource}
          />
        )}
        {showEditMessageResource && (
          <MessageUpdateModal
            realm_token={realm_token}
            updateAMessageMethod={updateAMessageMethod}
            currMessageResource={currMessageResource}
            onClose={this.handleUpdateMessageResource}
          />
        )} */}
        <section className="container-fluid">
          <div className="mb-4">
            <Header title="Settings" history={history} tabicon={"tabicon_.svg"} subTitle={"Message Resource"} />
          </div>
          <div className="mb-4 ">
            <SourceDetail
              title={"Primary Message Information"}
              imgLink={123}
              subTitles={["Twilio Account Id", "Twilio Auth Id", "Twilio From Num"]}
              subTitlesInfos={[123, 123, 123]}
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
              totalCount={30}
              title=" Admin List"
              fieldNames={["Twilio Account Id", "Twilio Auth Id", "Twilio From Num", "Status", "edit"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {/* {message_list.record_list.map((message, index) => (
                <MessageDetailListItem
                  parentProps={message}
                  handleUpdateMessageResource={this.handleUpdateMessageResource}
                  setPrimaryForResources={setPrimaryForResources}
                  realm_token={realm_token}
                  isPrimary={_detail.message_resource_info.message_resource_token === message.message_resource_token}
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
)(withRouter(Message));
