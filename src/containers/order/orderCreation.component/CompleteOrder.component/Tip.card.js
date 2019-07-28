import React from "react";
import { parseAmount } from "../../../../actions/utilities.action";
export default function TipCard(props) {
  const { showEditButton, trip_token, addon_list, deleteAddonItem, position } = props;
  return (
    <div style={{ height: "185px", overflow: "auto" }}>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Tip</div>
          {showEditButton && (
            <img
              src={`${process.env.PUBLIC_URL}/img/icon_add.svg`}
              onClick={() => props.handleAddingAddon(trip_token, "A Tip")}
              className="hm-pointer-cursor"
              alt="Edit"
            />
          )}
        </div>
      </div>
      {addon_list.length > 0 &&
        addon_list.map(
          (addon, index) =>
            addon.type === 1 && (
              <div className="mb-4" key={index}>
                <div className="container-fluid">
                  <div
                    className="tip-card  rounded-custom shadow-sm d-flex flex-column justify-content-between p-4"
                    style={{ height: "110px" }}
                  >
                    <div className="row text-white">
                      <div className="col-12 hm-text-14 font-weight-500">Tip</div>
                    </div>
                    <div className="row text-white">
                      <div className="col-12">
                        <div className="d-flex align-items-center mt-auto">
                          <div className="hm-text-16 font-weight-500"> {parseAmount(addon.amount, 2)}</div>
                          <img
                            src={`${process.env.PUBLIC_URL}/img/icon_delete_white.svg`}
                            className="hm-pointer-cursor ml-auto"
                            alt="delete"
                            style={{ height: "25px", width: "25px" }}
                            onClick={() => deleteAddonItem(trip_token, addon.addon_token, position)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      {addon_list.length === 0 && (
        <div className="mb-4">
          <div className="container-fluid">
            <div
              className="tip-card  rounded-custom shadow-sm d-flex flex-column justify-content-between p-4"
              style={{ height: "110px" }}
            >
              <div className="row text-white">
                <div className="col-12 hm-text-14 font-weight-500">Tip</div>
              </div>
              <div className="row text-white">
                <div className="col-12">
                  <div className="d-flex align-items-center mt-auto">
                    <div className="hm-text-16 font-weight-500"> {parseAmount(0, 2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
