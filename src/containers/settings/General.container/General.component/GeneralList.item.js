import React, { Component } from "react";
import { convertLocalToUTC } from "../../../../actions/utilities.action";

export default class GeneralListItem extends Component {
  render() {
    const { key, value, cdate, setting_token } = this.props.general;
    return (
      <tr className="border-bottom">
        <td data-label="Created On" className="items-height align-middle">
          <section className="text-center align-middle ">{convertLocalToUTC(cdate)}</section>
        </td>
        <td data-label="Key" className="items-height align-middle text-center">
          <section className="text-center align-middle hm-text-14 text-main-color font-weight-bold">{key}</section>
        </td>
        <td data-label="Value" className="items-height align-middle">
          <section className="text-center align-middle ">{value}</section>
        </td>
        <td data-label="Edit" className="items-height align-middle text-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
            className="hm-pointer-cursor"
            alt="delete"
            style={{ height: "25px", width: "25px" }}
            onClick={() => this.props.editGeneralListItem(this.props.general)}
          />
        </td>
        <td data-label="Delete" className="items-height align-middle">
          <img
            src={`${process.env.PUBLIC_URL}/img/icon_delete.svg`}
            className="hm-pointer-cursor"
            alt="delete"
            style={{ height: "25px", width: "25px" }}
            onClick={() => this.props.updateGeneralSettingListInLord(setting_token)}
          />
        </td>
      </tr>
    );
  }
}
