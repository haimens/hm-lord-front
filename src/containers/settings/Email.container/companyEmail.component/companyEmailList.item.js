import React from "react";
import { EditButton } from "../../../../../components/shared";

/**
 * @onClick
 * @onCorrect
 */
export default function CompanyEmailListItem(props) {
  const handleEditEmailResource = email_resource_token => {
    props.handleUpdateEmailResource(email_resource_token, props.parentProps);
  };
  const handleSetEmailPrimary = (realm_token, email_resource_token) => {
    props.setPrimaryForResources(realm_token, { email_resource_token });
  };
  const { isPrimary, realm_token, parentProps } = props;
  const { sendgrid_api_key, sendgrid_from_email, email_resource_token } = parentProps;
  return (
    <tr className="border-bottom">
      <td className="items-height align-middle" data-label="SendGrid Api Key">
        <section className="text-lg-center text-right align-middle hm-text-14 font-weight-bold text-modal-color">
          {sendgrid_api_key}
        </section>
      </td>
      <td className="items-height align-middle" data-label="SendGrid From Email">
        <section className="text-lg-center text-right align-middle hm-text-14 font-weight-bold text-modal-color">
          {sendgrid_from_email}
        </section>
      </td>
      <td className="items-height align-middle" data-label="Square Access Token">
        {isPrimary ? (
          <section
            className="text-lg-center text-right align-middle hm-text-14 font-weight-bold"
            style={{ color: "#5e72e4" }}
          >
            Primary
          </section>
        ) : (
          <section
            className="text-lg-center text-right align-middle hm-text-14 font-weight-bold"
            style={{ color: "#5e72e4" }}
          >
            <button
              className="primary-set-button"
              onClick={() => handleSetEmailPrimary(realm_token, email_resource_token)}
            >
              Set Primary
            </button>
          </section>
        )}
      </td>
      <td className="items-height align-middle text-lg-center text-right " data-label="Edit">
        <EditButton clickFunction={() => handleEditEmailResource(email_resource_token)} />
      </td>
    </tr>
  );
}
