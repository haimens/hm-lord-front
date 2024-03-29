import constant from "../constants/constant";

const initialState = {
  order_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  order_list_in_lord_with_date: {
    record_list: [],
    count: 0,
    end: 0
  },
  order_detail: {
    customer_info: {
      name: "",
      email: "",
      cell: ""
    },
    order_discount_list: [],
    order_info: {
      receipt: "",
      order_type: "",
      cdate: "",
      amount: "",
      note: "",
      status_str: "",
      contact_name: "",
      contact_cell: ""
    },
    trip_list: []
  },
  current_order: {
    order_token: "",
    trip_list: ["", ""]
  },
  order_list_in_customer: {
    record_list: [],
    count: 0,
    end: 0
  },
  curr_customer: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.ORDER_LIST_IN_LORD:
      return { ...state, order_list_in_lord: action.payload };
    case constant.ORDER_LIST_IN_LORD_WITH_DATE:
      return { ...state, order_list_in_lord_with_date: action.payload };
    case constant.ORDER_DETAIL:
      return { ...state, order_detail: action.payload };
    case constant.CURRENT_ORDER:
      return { ...state, current_order: action.payload };
    case constant.ORDER_LIST_IN_CUSTOMER:
      return { ...state, order_list_in_customer: action.payload };
    case constant.SET_CURRENT_CUSTOMER:
      return { ...state, curr_customer: action.payload };
    default:
      return state;
  }
};
