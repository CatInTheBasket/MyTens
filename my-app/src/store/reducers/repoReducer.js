import {
  REPO_SUCCESS,
  REPO_STATUS,
  PROFILE,
} from "../actions/actionType";

const initialState = {
  repo: [],
  successGetRepo: false,
  profile: ""
};


function repoReducer(state = initialState, action) {
  switch (action.type) {
    case REPO_SUCCESS:
      return { ...state, repo: action.payload };
    case REPO_STATUS:
      return { ...state, successGetRepo: action.payload };
    case PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
}

export default repoReducer;
