import React from "react";
import { convertUTCtoLocal } from "../../actions/utilities.action";

/**
 * @onClick
 * @onCorrect
 */
export default function LogListItem(props) {
  const handleDetailLink = trans_token => {
    if (props.onClick) props.onClick(trans_token);
  };
  const { note, cdate } = props.parentProps;
  return (
    <tr className="border-bottom">
      <td data-label="Created On" className="items-height align-middle">
        <section className="text-center align-middle ">{convertUTCtoLocal(cdate, "YYYY-MM-DD HH:mm")}</section>
      </td>
      <td data-label="Log Note" className="items-height align-middle text-left">
        <section className="text-left align-middle hm-text-14 text-main-color font-weight-bold">{note}</section>
      </td>
    </tr>
  );
}
