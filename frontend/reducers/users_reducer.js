import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TEAMS, RECEIVE_TEAM  } from '../actions/team_actions';
import { RECEIVE_USER } from '../actions/user_actions';

import {
  RECEIVE_USER_TASK,
  RECEIVE_USER_TASKS,
  REMOVE_USER_TASK
} from "../actions/user_task_actions";

const usersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  const newState = Object.assign({}, oldState);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      const currentUser = { [action.currentUser.id]: action.currentUser }
      return Object.assign({}, oldState, currentUser);
    case RECEIVE_TEAM:
    case RECEIVE_TEAMS:
      for(let teammateId in action.teammates){
        newState[teammateId] = Object.assign(newState[teammateId] || {}, action.teammates[teammateId]);
      }
      return newState;
    case RECEIVE_USER:
      newState[action.user.id] = action.user;
      newState[action.user.id].tasksIds = new Set(Object.keys(action.tasks));
      return newState;
    case RECEIVE_USER_TASKS:
      return newState;
    case RECEIVE_USER_TASK:
      newState[action.task.user_id].taskIds.add(action.task.id);
      return newState;
    case REMOVE_USER_TASK:
      newState[action.task.user_id].taskIds.delete(action.task.id);
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return oldState;
  }
};

export default usersReducer;