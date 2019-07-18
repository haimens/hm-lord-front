import constant from "../constants/constant";

const initialState = {
  trip_list_in_driver: {
    record_list: [],
    count: 0,
    end: 0
  },
  trip_active_list_in_driver: {
    record_list: [],
    count: 0,
    end: 0
  },
  trip_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  trip_active_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  trip_detail_in_lord: {
    basic_info: {
      amount: 0,
      arrive_time: "",
      cad_time: "",
      cdate: "",
      cob_time: "",
      contact_cell: "",
      contact_name: "",
      eta_time: "",
      flight_str: "",
      is_paid: 0,
      note: "",
      order_token: "",
      pickup_time: "",
      pickup_time_local: "",
      start_time: "",
      status: "",
      status_str: "",
      trip_token: "",
      type: "",
      udate: "",
      vehicle_type: ""
    },
    from_address_info: {
      addr_str: ""
    },
    to_address_info: {
      addr_str: ""
    },
    customer_info: {
      name: "",
      cell: "",
      email: ""
    },
    driver_info: {
      name: "",
      cell: "",
      email: "",
      img_path: ""
    },
    car_info: {
      identifier: "",
      plate: "",
      description: ""
    },
    alert_list: [{ type: "", record_time: "" }, { type: "", record_time: "" }, { type: "", record_time: "" }],
    addon_list: []
  },
  trip_detail_in_lord_again: {
    basic_info: {
      amount: 0,
      arrive_time: "",
      cad_time: "",
      cdate: "",
      cob_time: "",
      contact_cell: "",
      contact_name: "",
      eta_time: "",
      flight_str: "",
      is_paid: 0,
      note: "",
      order_token: "",
      pickup_time: "",
      pickup_time_local: "",
      start_time: "",
      status: "",
      status_str: "",
      trip_token: "",
      type: "",
      udate: "",
      vehicle_type: ""
    },
    from_address_info: {
      addr_str: ""
    },
    to_address_info: {
      addr_str: ""
    },
    customer_info: {
      name: "",
      cell: "",
      email: ""
    },
    driver_info: {
      name: "",
      cell: "",
      email: "",
      img_path: ""
    },
    car_info: {
      identifier: "",
      plate: "",
      description: ""
    },
    alert_list: [{ type: "", record_time: "" }, { type: "", record_time: "" }, { type: "", record_time: "" }],
    addon_list: []
  },
  trip_count_in_lord_active: [],
  trip_count_in_lord_finished: [],
  trip_count_in_lord_failed: [],
  trip_add_on_list: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.TRIP_LIST_IN_DRIVER:
      return { ...state, trip_list_in_driver: action.payload };
    case constant.TRIP_ACTIVE_LIST_IN_DRIVER:
      return { ...state, trip_active_list_in_driver: action.payload };
    case constant.TRIP_ACTIVE_LIST_IN_LORD:
      return { ...state, trip_list_in_lord: action.payload };
    case constant.TRIP_LIST_IN_LORD:
      return { ...state, trip_list_in_lord: action.payload };
    case constant.TRIP_DETAIL_IN_LORD:
      return { ...state, trip_detail_in_lord: action.payload };
    case constant.TRIP_DETAIL_IN_LORD_AGAIN:
      return { ...state, trip_detail_in_lord_again: action.payload };
    case constant.TRIP_COUNT_IN_LORD_ACTIVE:
      return { ...state, trip_count_in_lord_active: action.payload };
    case constant.TRIP_COUNT_IN_LORD_FINISHED:
      return { ...state, trip_count_in_lord_finished: action.payload };
    case constant.TRIP_COUNT_IN_LORD_FAILED:
      return { ...state, trip_count_in_lord_failed: action.payload };
    case constant.TRIP_ADD_ON_LIST:
      return { ...state, trip_add_on_list: action.payload };
    default:
      return state;
  }
};
