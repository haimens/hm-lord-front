import React, { Component } from "react";
import MessageResourceCard from "./messageResource.container/MessageResource.card";
import { ListView } from "../../components/shared";
import MessageResourceListItem from "./messageResource.container/MessageResourceList.item";
import AddMessageResourceModal from "./messageResource.container/AddMessageResource.modal";

class MessageResource extends Component {
  state = {
    showAddingMessageResourceModal: false
  };
  handleShowAddingMessageResourceModal = () => {
    this.setState(state => ({ showAddingMessageResourceModal: !state.showAddingMessageResourceModal }));
  };

  render() {
    const { showAddingMessageResourceModal } = this.state;
    return (
      <main>
        {showAddingMessageResourceModal && (
          <AddMessageResourceModal onClose={this.handleShowAddingMessageResourceModal} />
        )}
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold mr-3">Message Resource</h3>
          </div>
          <div>
            <MessageResourceCard />
          </div>
        </section>

        <section className="mb-4">
          <div className="mb-4 d-flex">
            <h3 className="font-weight-bold mr-3">Message List</h3>
            <i
              className="fas fa-plus hm-bg-green rounded-circle text-white p-2 hm-pointer-cursor"
              onClick={this.handleShowAddingMessageResourceModal}
            />
          </div>
          <div>
            <ListView
              totalCount={30}
              fieldNames={["Application_Id", "Location_Id", "Access_Token", "Status", "Edit"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <MessageResourceListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
            </ListView>
          </div>
        </section>
      </main>
    );
  }
}
export default MessageResource;
