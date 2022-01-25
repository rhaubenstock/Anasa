import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TEAMS, RECEIVE_TEAM  } from '../actions/team_actions';
import { RECEIVE_USER } from '../actions/user_actions';

import {
  RECEIVE_USER_TASK,
  RECEIVE_USER_TASKS,
  REMOVE_USER_TASK
} from "../actions/user_task_actions";

import {
  RECEIVE_PROJECT_TASK,
  RECEIVE_PROJECT_TASKS,
  REMOVE_PROJECT_TASK
} from "../actions/project_task_actions";

const usersReducer = (oldState = {}, action) => {
  // debugger
  // next work on adding receive_current_user action to task, prj, team reducers
  Object.freeze(oldState);
  //if(!action.user && !action.currentUser) return oldState;
  const newState = Object.assign({}, oldState);
  switch(action.type){
    // case RECEIVE_CURRENT_USER:
    
    //   // newState[action.currentUser.user.id] = action.currentUser.user;
    //   // newState[action.currentUser.user.id].taskIds = new Set(Object.keys(action.currentUser.tasks || {}));
    //   // newState[action.currentUser.user.id].prjIds = new Set(Object.keys(action.currentUser.projects || {}));
    //   // newState[action.currentUser.user.id].teamIds = new Set(Object.keys(action.currentUser.teams || {}));
      
    //   return newState;
    case RECEIVE_TEAM:
    case RECEIVE_TEAMS:
      // for(let teamId in action.teams){
      //   for(let teammateId in action.teams[teamId].teammates){
      //     newState[teammateId] = Object.assign(newState[teammateId] || {}, action.teammates[teammateId]);
      //     newState[teammateId].taskIds = newState[teammateId].taskIds || new Set();
      //     newState[teammateId].prjIds = newState[teammateId].prjIds || new Set();
      //     newState[teammateId].teamIds = newState[teammateId].teamIds || new Set();
      //   }
      // }
      for(let teammateId in action.teammates){
        newState[teammateId] = Object.assign(newState[teammateId] || {}, action.teammates[teammateId]);
        newState[teammateId].taskIds = newState[teammateId].taskIds || new Set();
        newState[teammateId].prjIds = newState[teammateId].prjIds || new Set();
        newState[teammateId].teamIds = newState[teammateId].teamIds || new Set();
      }
      return newState;
    case RECEIVE_USER:
      newState[action.user.id] = action.user;
      newState[action.user.id].taskIds = new Set(Object.keys(action.tasks || {}));
      newState[action.user.id].prjIds = new Set(Object.keys(action.projects || {}));
      newState[action.user.id].teamIds = new Set(Object.keys(action.teams || {}));

      return newState;
    case RECEIVE_PROJECT_TASKS:
    case RECEIVE_USER_TASKS:
      return newState;
    case RECEIVE_PROJECT_TASK:
    case RECEIVE_USER_TASK:
      
      if(action.task.assignee_id) newState[action.task.assignee_id].taskIds.add(action.task.id);
      return newState;
    case REMOVE_PROJECT_TASK:
      if(action.task.assignee_id) newState[action.task.assignee_id].taskIds.delete(action.task.id);
      return newState;
    case REMOVE_USER_TASK:
      newState[action.task.assignee_id].taskIds.delete(action.task.id);
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return oldState;
  }
};

export default usersReducer;