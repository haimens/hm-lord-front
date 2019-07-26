import constant from "../constants/constant";

const initialState = {
  tribute_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.TRIBUTE_LIST_IN_LORD:
      return { ...state, tribute_list_in_lord: action.payload };
    default:
      return state;
  }
};
