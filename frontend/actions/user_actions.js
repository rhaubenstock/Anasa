import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = ({ user }) => {
  return {
    type: RECEIVE_USER,
    user
  };
};

export const getUser = (userId) => dispatch => {

  return APIUtil.getUser(userId)
        .then(payload => dispatch(receiveUser(payload)));
};