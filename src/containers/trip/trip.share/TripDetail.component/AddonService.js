import React from "react";
import { parseAmount } from "../../../../actions/utilities.action";
export default function AddonService(props) {
  const { showEditButton, addon_list, handleDetailButtonClicked, handleDeleteAnAddon } = props;
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Add-on Service</div>
          {showEditButton && (
            <img
              src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
              alt="Customer"
              className="rounded-circle hm-pointer-cursor"
              style={{ height: "25px", width: "25px" }}
              onClick={() => handleDetailButtonClicked("add-on")}
            />
          )}
        </div>
      </div>
      <div style={{ height: "185px", overflow: "auto" }}>
        {addon_list.map(
          (addon, index) =>
            addon.type === 2 && (
              <div className="mb-4" key={index}>
                <div className="container-fluid">
                  <div
                    className="coupon-card  rounded-custom shadow-sm d-flex flex-column justify-content-between p-4"
                    style={{ height: "110px" }}
                  >
                    <div className="row text-white">
                      <div className="col-12 hm-text-14 font-weight-500 ">{addon.note}</div>
                    </div>
                    <div className="row text-white">
                      <div className="col-12">
                        <div className="d-flex align-items-center mt-auto">
                          <div className="hm-text-16 font-weight-500 text-white">{parseAmount(addon.amount, 2)}</div>
                          {!props.hideDelete && (
                            <img
                              src={`${process.env.PUBLIC_URL}/img/icon_delete_white.svg`}
                              className="hm-pointer-cursor ml-auto"
                              alt="delete"
                              style={{ height: "25px", width: "25px" }}
                              onClick={() => handleDeleteAnAddon(addon.addon_token)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
