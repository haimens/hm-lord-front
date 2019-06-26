import React from "react";
import { convertUTCtoLocal } from "../../../actions/utilities.action";
import { CopyToClipboard } from "react-copy-to-clipboard";
import alertify from "alertifyjs";

/**
 * @onClick
 * @onCorrect
 */
export default function VehicleListItem(props) {
  const handleDetailLink = trans_token => {
    if (props.onClick) props.onClick(trans_token);
  };

  return (
    <tr>
      <td data-label="Created On" className="st-text-ellipsis">
        <section className="text-position align-middle text-muted text-sm">
          <small>{21}</small>
        </section>
      </td>
      <td data-label="Last Updated" className="st-text-ellipsis">
        <section className="text-position align-middle text-muted text-sm">
          <small>{13}</small>
        </section>
      </td>
      <td data-label="Company ID" className="st-text-ellipsis">
        <section className="text-position align-middle text-muted text-sm">
          <small>{"N/A"}</small>
        </section>
      </td>
      <td data-label="Company Name" className="st-text-ellipsis text-position">
        <section className="text-position align-middle text-muted text-sm">
          <small>{"N/A"}</small>
        </section>
      </td>
    </tr>
  );
}
