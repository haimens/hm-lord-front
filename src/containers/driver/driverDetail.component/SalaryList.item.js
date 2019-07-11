import React from "react";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";

/**
 * @onClick
 * @onCorrect
 */
export default function SalaryListItem(props) {
  const { cdate, udate, amount } = props.parentProps;
  return (
    <tr>
      <td data-label="Created On" className="st-text-ellipsis">
        <section className="text-center align-middle ">{convertUTCtoLocal(cdate, "YYYY-MM-DD HH:mm")}</section>
      </td>
      <td data-label="Updated On" className="st-text-ellipsis">
        <section className="text-center align-middle  hm-text-14 text-main-color font-weight-bold">
          {convertUTCtoLocal(udate, "YYYY-MM-DD HH:mm")}
        </section>
      </td>

      <td data-label="Amount" className="st-text-ellipsis text-center">
        <section className="text-center align-middle hm-text-14 text-main-color font-weight-bold">
          {parseAmount(amount)}
        </section>
      </td>
    </tr>
  );
}
