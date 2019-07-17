import constant from "../constants/constant";

const initialState = {
  note_list_for_customer: {
    record_list: [],
    count: 0,
    end: 0
  },
  note_list_for_trip: {
    record_list: [],
    count: 0,
    end: 0
  },
  note_list_for_order: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.NOTE_LIST_FOR_CUSTOMER:
      return { ...state, note_list_for_customer: action.payload };
    case constant.NOTE_LIST_FOR_TRIP:
      return { ...state, note_list_for_trip: action.payload };
    case constant.NOTE_LIST_FOR_ORDER:
      return { ...state, note_list_for_order: action.payload };
    default:
      return state;
  }
};
