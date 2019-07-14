import constant from "../constants/constant";

const initialState = {
  quote_in_lord: {
    basic_info: "",
    quote_list: []
  },
  quote_in_lord_again: {
    basic_info: "",
    quote_list: []
  },
  showMap: false,
  showMapAgain: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.QUOTE_IN_LORD:
      return { ...state, quote_in_lord: action.payload, showMap: true };
    case constant.QUOTE_IN_LORD_AGAIN:
      return { ...state, quote_in_lord_again: action.payload, showMapAgain: true };
    case constant.QUOTE_IN_LORD_SET_MAP:
      return { ...state, showMap: false };
    case constant.QUOTE_IN_LORD_SET_MAP_AGAIN:
      return { ...state, showMapAgain: false };
    default:
      return state;
  }
};
