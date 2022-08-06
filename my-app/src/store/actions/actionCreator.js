import {
  REPO_SUCCESS,
  REPO_STATUS,
  PROFILE
} from "./actionType";
import { useDispatch } from "react-redux";
import axios from "axios";

const baseURL = `https://api.github.com/users/`;
const baseRepo = `/repos`;

export const profileSet = payload => {
  return {
    type: PROFILE,
    payload
  };
};

export const repoSucess = payload => {
  return {
    type: REPO_SUCCESS,
    payload
  };
};

export const repoSetStatus = payload => {
  return {
    type: REPO_STATUS,
    payload
  };
};

export function fetchDetailData(username) {
  return async function(dispatch) {
    try {
      const res = await 
        axios({
          method: 'get',
          url: baseURL+username
        });
      dispatch(profileSet(res.data));
      const temp = await axios({
        method: 'get',
        url: baseURL+username+baseRepo
      });
      dispatch(repoSetStatus(true));
      dispatch(repoSucess(temp.data));
      
    } catch (err) {
      dispatch(repoSucess([]));
            dispatch(repoSetStatus(false));
            dispatch(profileSet(""));
      console.log(err);
    } finally {
      // dispatch(isLoading(false));
    }
  };
}


