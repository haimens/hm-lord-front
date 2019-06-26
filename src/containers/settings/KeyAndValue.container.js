import React, { Component } from "react";
import { ListView } from "../../components/shared";
import KeyAndValueListItem from "./keyAndValue.container/KeyAndValueList.item";
import AddingKeyAndValueModal from "./keyAndValue.container/AddingKeyAndValue.modal";
class KeyAndValue extends Component {
  state = {
    showAddingKeyAndValueModal: false
  };
  handleShowAddingKeyAndValueModal = () => {
    this.setState(state => ({ showAddingKeyAndValueModal: !state.showAddingKeyAndValueModal }));
  };

  render() {
    const { showAddingKeyAndValueModal } = this.state;
    return (
      <main>
        {showAddingKeyAndValueModal && <AddingKeyAndValueModal onClose={this.handleShowAddingKeyAndValueModal} />}
        <section className="mb-4">
          <div className="mb-4 d-flex justify-content-between">
            <h3 className="font-weight-bold">General Setting</h3>
            <button className="btn hm-bg-green text-white" onClick={this.handleShowAddingKeyAndValueModal}>
              <span>
                <i className="fas fa-plus mr-2" />
              </span>
              Key Value
            </button>
          </div>
          <div>
            <ListView
              totalCount={30}
              fieldNames={["Created On", "Key", "Value", "Edit", "Delete"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <KeyAndValueListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
            </ListView>
          </div>
        </section>
      </main>
    );
  }
}
export default KeyAndValue;
