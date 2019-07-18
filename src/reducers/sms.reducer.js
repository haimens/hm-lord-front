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
  showChat: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.MESSAGE_LIST_IN_CUSTOMER:
      return { ...state, message_list_in_lord: action.payload };
    case constant.MESSAGE_DETAIL_WITH_CUSTOMER:
      return { ...state, message_detail_with_customer: action.payload, showChat: action.showChat };
    case constant.SET_CHAT_TO_FALSE:
      return { ...state, showChat: false };
    default:
      return state;
  }
};
