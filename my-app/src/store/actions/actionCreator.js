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

export const setRepo = (username) => {
  const dispatch = useDispatch();

  const Repo = repo => {
    axios({
      method: 'get',
      url: baseURL+username
    })
      .then(function (response) {
        console.log(response.data);
        dispatch(profileSet(response.data));
        axios({
          method: 'get',
          url: baseURL+username+baseRepo
        })
          .then(function (response) {
            dispatch(repoSetStatus(true));
            dispatch(repoSucess(response.data));
            
          }).catch((error)=>{
            console.log(error);
            dispatch(repoSucess([]));
          });
      }).catch((error)=>{
        console.log(error);
        dispatch(repoSucess([]));
        dispatch(repoSetStatus(false));
        dispatch(profileSet(""));
      });

  }
  return { Repo };
};

