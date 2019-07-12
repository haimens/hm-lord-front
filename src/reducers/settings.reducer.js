import constant from "../constants/constant";

const initialState = {
  coupon_list_in_settings: {
    record_list: [],
    count: 0,
    end: 0
  },
  vehicle_type_list_in_settings: {
    record_list: [],
    count: 0,
    end: 0
  },
  general_list_in_settings: {
    record_list: [],
    count: 0,
    end: 0
  },
  realm_list_in_lord: {
    basic_info: {
      vn_realm_id: "",
      cdate: "",
      udate: "",
      company_name: "",
      company_title: "",
      realm_token: "",
      status: 2
    },
    message_resource_info: {
      twilio_account_id: "",
      twilio_auth_token: "",
      twilio_from_num: ""
    },
    address_info: {
      address_token: "",
      cdate: "",
      udate: "",
      addr_str: "",
      lat: "",
      lng: "",
      street_line_1: "",
      street_line_2: "",
      city: "",
      state: "",
      zip: ""
    },
    tribute_rate_info: {
      tribute_rate_token: "",
      cdate: "",
      udate: "",
      rate: ""
    },
    email_resource_info: {
      sendgrid_api_key: "",
      sendgrid_from_email: ""
    },
    payment_resource_info: {
      square_application_id: "",
      square_location_id: "",
      square_access_token: ""
    }
  },
  payment_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  message_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  email_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.REALM_LIST_IN_LORD:
      return { ...state, realm_list_in_lord: action.payload };
    case constant.PAYMENT_LIST_IN_LORD:
      return { ...state, payment_list_in_lord: action.payload };
    case constant.MESSAGE_LIST_IN_LORD:
      return { ...state, message_list_in_lord: action.payload };
    case constant.EMAIL_LIST_IN_LORD:
      return { ...state, email_list_in_lord: action.payload };
    case constant.COUPON_LIST_IN_SETTINGS:
      return { ...state, coupon_list_in_settings: action.payload };
    case constant.VEHICLE_TYPE_LIST_IN_SETTINGS:
      return { ...state, vehicle_type_list_in_settings: action.payload };
    case constant.GENERAL_LIST_IN_SETTINGS:
      return { ...state, general_list_in_settings: action.payload };
    default:
      return state;
  }
};
