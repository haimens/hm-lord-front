import React from "react";
/**
 * @onClick
 * @onCorrect
 */
export default function CompanyAdminList(props) {
  const handleEditPaymentResource = payment_resource_token => {
    props.handleUpdatePaymentResource(payment_resource_token, props.parentProps);
  };
  const handleSetPaymentPrimary = payment_resource_token => {
    props.setPrimaryForResources({ payment_resource_token });
  };
  const { isPrimary, parentProps } = props;
  const { square_application_id, square_location_id, square_access_token, payment_resource_token } = parentProps;
  return (
    <tr className="border-bottom">
      <td className="items-height align-middle" data-label="Square Application Id">
        <section className="text-lg-center text-right align-middle hm-text-14 font-weight-bold text-modal-color">
          {square_application_id}
        </section>
      </td>
      <td className="items-height align-middle" data-label="Square Location Id">
        <section className="text-lg-center text-right align-middle hm-text-14 font-weight-bold text-modal-color">
          {square_location_id}
        </section>
      </td>
      <td className="items-height align-middle" data-label="Square Access Token">
        <section className="text-lg-center text-right align-middle hm-text-14 font-weight-bold text-modal-color">
          {square_access_token}
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
            <button className="primary-set-button" onClick={() => handleSetPaymentPrimary(payment_resource_token)}>
              Set Primary
            </button>
          </section>
        )}
      </td>
      <td className="items-height align-middle text-lg-center text-right " data-label="Edit">
        <img
          src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
          alt="Customer"
          className="rounded-circle hm-pointer-cursor"
          style={{ height: "25px", width: "25px" }}
          onClick={() => handleEditPaymentResource(payment_resource_token)}
        />
      </td>
    </tr>
  );
}
