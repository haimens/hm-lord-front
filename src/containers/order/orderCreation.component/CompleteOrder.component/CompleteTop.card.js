import React, { Component } from "react";
import BasicInfo from "./BasicInfo.card";
import TripSubtotal from "./TripSubtotal.card";
import TipCard from "./Tip.card";
import AddonCard from "./Addon.card";
import { parseAmount } from "../../../../actions/utilities.action";

export default class CompleteTop extends Component {
  render() {
    const { trip_detail_in_lord, handleAddingAddon, trip_token } = this.props;
    const { basic_info, from_address_info, to_address_info } = trip_detail_in_lord;
    return (
      <div className="bg-white rounded-custom shadow-sm">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-12 mb-4">
              <div className="hm-title-sub-size font-weight-bold text-modal-color p-4">Trip 1</div>
              <BasicInfo
                from_address_info={from_address_info}
                to_address_info={to_address_info}
                basic_info={basic_info}
                showEditButton={true}
              />
            </div>
            <div className="col-lg-6 col-12 mb-4">
              <div className="text-right hm-title-sub-size font-weight-bold text-modal-color p-4">
                <span className="hm-title-sub-size font-weight-bold text-secondary-color text-modal-color mr-3">
                  Trip 1 Subtotal:
                </span>
                {parseAmount(basic_info.amount, 2)}
              </div>
              <TripSubtotal from_address_info={from_address_info} to_address_info={to_address_info} />
            </div>
            <div className="col-lg-6 col-12 mb-4">
              <TipCard showEditButton={true} />
            </div>
            <div className="col-lg-6 col-12 mb-4">
              <AddonCard trip_token={trip_token} handleAddingAddon={handleAddingAddon} showEditButton={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
