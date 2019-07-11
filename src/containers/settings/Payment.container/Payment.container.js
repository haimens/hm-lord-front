import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PaymentDetailListItem from "./Payment.component/PaymentList.item";
import PaymentModal from "./Payment.component/Payment.modal";
import PaymentUpdateModal from "./Payment.component/PaymentUpdate.modal";
import { Header, ListView, ListHeader } from "../../../components/shared";
import SourceDetail from "../Source.share/SourceDetail.container";
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
    Promise.all([]);
  }
  handlePageChange = start => {
    this.props.findAllPaymentResourceList({ start });
  };
  render() {
    const { showCreatePaymentResource, showEditPaymentResource, currPaymentResource } = this.state;
    const { history } = this.props;
    return (
      <main>
        {/* {showCreatePaymentResource && (
          <PaymentModal
            realm_token={realm_token}
            createAPaymentMethod={createAPaymentMethod}
            onClose={this.handleCreatePaymentResource}
          />
        )} */}
        {/* {showEditPaymentResource && (
          <PaymentUpdateModal
            realm_token={realm_token}
            updateAPaymentMethod={updateAPaymentMethod}
            currPaymentResource={currPaymentResource}
            onClose={this.handleUpdatePaymentResource}
          />
        )} */}
        <section className="container-fluid">
          <div className="mb-4">
            <Header title="Settings" history={history} tabicon={"tabicon_.svg"} subTitle={"Payment Resource"} />
          </div>
          <div className="mb-4 ">
            <SourceDetail
              title={"Primary Payment Information"}
              imgLink={123}
              subTitles={["Square Application Id", "Square Location Id", "Square Access Token"]}
              subTitlesInfos={[123, 321, 123]}
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
              {/* {payment_list.record_list.map((payment, index) => (
                <PaymentDetailListItem
                  parentProps={payment}
                  handleUpdatePaymentResource={this.handleUpdatePaymentResource}
                  setPrimaryForResources={setPrimaryForResources}
                  realm_token={realm_token}
                  isPrimary={_detail.payment_resource_info.payment_resource_token === payment.payment_resource_token}
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
)(withRouter(Payment));
