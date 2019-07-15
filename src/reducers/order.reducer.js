import constant from "../constants/constant";

const initialState = {
  order_list_in_lord: {
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
    order_discount_list: []
  },
  current_order: {
    order_token: "ORD-b5ce19762203fe4888d2fede5a42d902",
    trip_list: ["TRIP-b57d377d06e4bcf437e5af88fadb6250", "TRIP-26a70303cd190cf709b300618a9ee642"]
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.ORDER_LIST_IN_LORD:
      return { ...state, order_list_in_lord: action.payload };
    case constant.ORDER_DETAIL:
      return { ...state, order_detail: action.payload };
    case constant.CURRENT_ORDER:
      return { ...state, current_order: action.payload };
    default:
      return state;
  }
};
