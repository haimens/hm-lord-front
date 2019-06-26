import React, { Component } from "react";
import EmailResourceCard from "./emailResource.container/EmailResource.card";
import { ListView } from "../../components/shared";
import EmailResourceListItem from "./emailResource.container/EmailResourceList.item";
import AddEmailResourceModal from "./emailResource.container/AddEmailResource.modal";
class EmailResource extends Component {
  state = {
    showAddingEmailResourceModal: false
  };
  handleShowAddingEmailResourceModal = () => {
    this.setState(state => ({ showAddingEmailResourceModal: !state.showAddingEmailResourceModal }));
  };

  render() {
    const { showAddingEmailResourceModal } = this.state;
    return (
      <main>
        {showAddingEmailResourceModal && <AddEmailResourceModal onClose={this.handleShowAddingEmailResourceModal} />}
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold mr-3">Email Resource</h3>
          </div>
          <div>
            <EmailResourceCard onClose={this.handleShowAddingEmailResourceModal} />
          </div>
        </section>

        <section className="mb-4">
          <div className="mb-4 d-flex">
            <h3 className="font-weight-bold mr-3">Email List</h3>
            <i
              className="fas fa-plus hm-bg-green rounded-circle text-white p-2 hm-pointer-cursor"
              onClick={this.handleShowAddingEmailResourceModal}
            />
          </div>
          <div>
            <ListView
              totalCount={30}
              fieldNames={["Api_Key", "From_Email", "Status", "Edit"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <EmailResourceListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
            </ListView>
          </div>
        </section>
      </main>
    );
  }
}
export default EmailResource;
