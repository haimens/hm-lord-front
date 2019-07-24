import constant from "../constants/constant";

const initialState = {
  message_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  message_detail_with_customer: {
    record_list: [],
    count: 0,
    end: 0
  },
  showChat: false,
  current_customer: {
    customer_name: "",
    customer_token: ""
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.MESSAGE_LIST_IN_CUSTOMER:
      return { ...state, message_list_in_lord: action.payload };
    case constant.MESSAGE_DETAIL_WITH_CUSTOMER:
      return {
        ...state,
        showChat: action.showChat,
        message_detail_with_customer: {
          record_list: [...action.payload.record_list, ...state.message_detail_with_customer.record_list],
          count: action.payload.count,
          end: action.payload.end
        }
      };
    case constant.MESSAGE_DETAIL_WITH_CUSTOMER_RESET:
      return { ...state, message_detail_with_customer: action.payload, showChat: true };
    case constant.SET_CHAT_TO_FALSE:
      return { ...state, showChat: false };
    case constant.SET_CHAT_TO_TRUE:
      return { ...state, showChat: true };
    case constant.SET_CHAT_USER:
      return { ...state, current_customer: action.payload, showChat: true };
    default:
      return state;
  }
};
