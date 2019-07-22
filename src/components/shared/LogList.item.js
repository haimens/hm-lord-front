import React from "react";
import { convertUTCtoLocal } from "../../actions/utilities.action";

/**
 * @onClick
 * @onCorrect
 */
export default function LogListItem(props) {
  const { note, cdate, type } = props.parentProps;
  return (
    <tr className="border-bottom">
      <td data-label="Created On" className="items-height align-middle">
        <section className={`text-center align-middle ${type === 1 && "text-danger"}`}>
          {convertUTCtoLocal(cdate, "YYYY-MM-DD HH:mm")}
        </section>
      </td>
      <td data-label="Log Note" className="items-height align-middle text-left">
        <section
          className={`text-center align-middle hm-text-14 font-weight-bold ${
            type === 1 ? "text-danger" : "text-main-color "
          }`}
        >
          {note}
        </section>
      </td>
    </tr>
  );
}
