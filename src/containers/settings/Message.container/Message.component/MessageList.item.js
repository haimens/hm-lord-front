import React from "react";
import { EditButton } from "../../../../components/shared";

/**
 * @onClick
 * @onCorrect
 */
export default function MessageListItem(props) {
  const handleEditPaymentResource = message_resource_token => {
    props.handleUpdateMessageResource(message_resource_token, props.parentProps);
  };
  const handleSetMessagePrimary = (realm_token, message_resource_token) => {
    props.setPrimaryForResources(realm_token, { message_resource_token });
  };
  const { isPrimary, realm_token, parentProps } = props;
  const { twilio_account_id, twilio_auth_token, twilio_from_num, message_resource_token } = parentProps;
  return (
    <tr className="border-bottom">
      <td className="items-height align-middle" data-label="Square Application Id">
        <section className="text-lg-center text-right align-middle hm-text-14 font-weight-bold text-modal-color">
          {twilio_account_id}
        </section>
      </td>
      <td className="items-height align-middle" data-label="Square Location Id">
        <section className="text-lg-center text-right align-middle hm-text-14 font-weight-bold text-modal-color">
          {twilio_auth_token}
        </section>
      </td>
      <td className="items-height align-middle" data-label="Square Access Token">
        <section className="text-lg-center text-right align-middle hm-text-14 font-weight-bold text-modal-color">
          {twilio_from_num}
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
              onClick={() => handleSetMessagePrimary(realm_token, message_resource_token)}
            >
              Set Primary
            </button>
          </section>
        )}
      </td>
      <td className="items-height align-middle text-lg-center text-right " data-label="Edit">
        <EditButton clickFunction={() => handleEditPaymentResource(message_resource_token)} />
      </td>
    </tr>
  );
}
