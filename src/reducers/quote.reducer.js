import constant from "../constants/constant";

const initialState = {
  quote_in_lord: {
    basic_info: "",
    quote_list: []
  },
  quote_in_lord_again: {
    basic_info: "",
    quote_list: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.QUOTE_IN_LORD:
      return { ...state, quote_in_lord: action.payload };
    case constant.QUOTE_IN_LORD_AGAIN:
      return { ...state, quote_in_lord_again: action.payload };
    default:
      return state;
  }
};
