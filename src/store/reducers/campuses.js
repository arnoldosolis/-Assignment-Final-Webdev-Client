import * as at from "../actions/actionTypes";

// REDUCER;
const allCampuses = (state = [], action) => {
  switch (action.type) {
    case at.FETCH_ALL_CAMPUSES:
      return action.payload;
    case at.DELETE_CAMPUS:
      return state.allCampuses.filter((campus) => campus.id !== action.payload.id);
    default:
      return state;
  }
};

export default allCampuses;