import constant from "../constants/constant";

export const toggleSideBar = () => dispatch => {
  dispatch({
    type: constant.OPEN_SIDEBAR
  });
};
