import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PaymentDetailListItem from "./Payment.component/PaymentList.item";
import PaymentModal from "./Payment.component/Payment.modal";
import PaymentUpdateModal from "./Payment.component/PaymentUpdate.modal";
import { Header, ListView, ListHeader } from "../../../components/shared";
import SourceDetail from "../Source.share/SourceDetail.container";
import {
  findRealmDetailInLord,
  findPaymentListInLord,
  createRealmPaymentInLord,
  setPrimaryForResources,
  updateAPaymentMethod
} from "../../../actions/settings.action";
class Payment extends Component {
  state = {
    showCreatePaymentResource: false,
    showEditPaymentResource: false,
    currPaymentResource: ""
  };
  handleCreatePaymentResource = () => {
    this.setState(states => ({ showCreatePaymentResource: !states.showCreatePaymentResource }));
  };

  handleUpdatePaymentResource = (payment_resource_token, currPayment) => {
    this.setState(states => ({
      showEditPaymentResource: !states.showEditPaymentResource,
      currPaymentResource: {
        payment_resource_token,
        currPayment
      }
    }));
  };

  async componentDidMount() {
    const { findRealmDetailInLord, findPaymentListInLord } = this.props;
    Promise.all([findRealmDetailInLord(), findPaymentListInLord()]);
  }
  handlePageChange = start => {
    this.props.findAllPaymentResourceList({ start });
  };
  render() {
    const { showCreatePaymentResource, showEditPaymentResource, currPaymentResource } = this.state;
    const {
      history,
      createRealmPaymentInLord,
      realm_list_in_lord,
      payment_list_in_lord,
      setPrimaryForResources,
      updateAPaymentMethod
    } = this.props;
    const { basic_info, payment_resource_info } = realm_list_in_lord;
    return (
      <main>
        {showCreatePaymentResource && (
          <PaymentModal createAPaymentMethod={createRealmPaymentInLord} onClose={this.handleCreatePaymentResource} />
        )}
        {showEditPaymentResource && (
          <PaymentUpdateModal
            updateAPaymentMethod={updateAPaymentMethod}
            currPaymentResource={currPaymentResource}
            onClose={this.handleUpdatePaymentResource}
          />
        )}
        <section className="container-fluid">
          <div className="mb-4">
            <Header title="Settings" history={history} tabicon={"tabicon_.svg"} subTitle={"Payment Resource"} />
          </div>
          <div className="mb-4 ">
            <SourceDetail
              title={"Primary Payment Information"}
              imgLink={basic_info.logo_path}
              subTitles={["Square Application Id", "Square Location Id", "Square Access Token"]}
              subTitlesInfos={[
                payment_resource_info.square_application_id,
                payment_resource_info.square_location_id,
                payment_resource_info.square_access_token
              ]}
            />
          </div>
          <div className="mb-4">
            <ListHeader
              parentProps={{
                title: "Payment Resource List",
                clickFunction: this.handleCreatePaymentResource,
                clickTitle: "Payment Resource"
              }}
              buttonWidth={"146px"}
            />
            <ListView
              totalCount={30}
              title=" Admin List"
              fieldNames={["Square Application Id", "Square location id", "square access token", "Status", "edit"]}
              hideHeader={true}
              onPageChange={this.handlePageChange}
            >
              {payment_list_in_lord.record_list.map((payment, index) => (
                <PaymentDetailListItem
                  parentProps={payment}
                  handleUpdatePaymentResource={this.handleUpdatePaymentResource}
                  setPrimaryForResources={setPrimaryForResources}
                  isPrimary={
                    realm_list_in_lord.payment_resource_info.payment_resource_token === payment.payment_resource_token
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
    payment_list_in_lord: state.settingsReducer.payment_list_in_lord
  };
};
const mapDispatchToProps = {
  findRealmDetailInLord,
  findPaymentListInLord,
  createRealmPaymentInLord,
  setPrimaryForResources,
  updateAPaymentMethod
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Payment));
