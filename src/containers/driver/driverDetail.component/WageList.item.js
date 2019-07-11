import React from "react";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";
import { CopyToClipboard } from "react-copy-to-clipboard";
import alertify from "alertifyjs";

/**
 * @onClick
 * @onCorrect
 */
export default function WageListItem(props) {
  const { cdate, amount, type, note } = props.parentProps;
  return (
    <tr className="border-bottom">
      <td data-label="Created On" className="items-height align-middle">
        <section className="text-center align-middle ">{convertUTCtoLocal(cdate, "YYYY-MM-DD HH:mm")}</section>
      </td>
      <td data-label="Amount" className="items-height align-middle">
        <section className="text-center align-middle  hm-text-14 text-main-color font-weight-bold">
          {parseAmount(amount)}
        </section>
      </td>
      <td data-label="Type" className="items-height align-middle">
        <div className="hm-text-14 text-modal-color font-weight-bold">
          {type === 1 ? (
            <div className="d-flex align-items-center justify-content-center ">
              <i className="fas fa-circle success-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color hm-text-14  font-weight-500">Salary</div>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center ">
              <i className="fas fa-circle text-danger mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color hm-text-14  font-weight-500">Fine</div>
            </div>
          )}
        </div>
      </td>
      <td data-label="Note" className="items-height align-middle text-center">
        <section className="text-center align-middle hm-text-14 text-main-color font-weight-bold">{note}</section>
      </td>
    </tr>
  );
}
