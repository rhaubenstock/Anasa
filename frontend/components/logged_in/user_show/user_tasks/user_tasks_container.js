import React from 'react';
import { connect } from 'react-redux';

import {
  updateProjectTask,
  createProjectTask,
  deleteProjectTask
} from '../../../../actions/project_task_actions';

import {
  updateUserTask,
  createUserTask,
  deleteUserTask
} from '../../../../actions/user_task_actions';


import UserTasks from './user_tasks';

const mapStateToProps = (state, ownProps) => {
  
  const user = state.entities.users ? state.entities.users[ownProps.id] : null;
  const taskIds = user ? user.taskIds : [];
  const prjIds = user ? user.prjIds : [];
  const prjs = [];
  prjIds.forEach(id => {
    if(state.entities.projects[id]) prjs.push(state.entities.projects[id])
  });
  const tasks = {};
  taskIds.forEach(taskId => {
    if(state.entities.tasks[taskId]) {tasks[taskId] = state.entities.tasks[taskId]}
  });
  
  return {
    tasks,
    prjs,
    canEdit: ownProps.editable
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  if(ownProps.editable){
  return {
    thunkProjectUpdateTask: task => dispatch(updateProjectTask(task)),
    thunkProjectCreateTask: task => dispatch(createProjectTask(task)),
    thunkProjectDeleteTask: task => dispatch(deleteProjectTask(task)),
    thunkUserUpdateTask: task => dispatch(updateUserTask(task)),
    thunkUserCreateTask: task => dispatch(createUserTask(task)),
    thunkUserDeleteTask: task => dispatch(deleteUserTask(task)),
  };
} else {
  return {
    thunkProjectUpdateTask: () => null,
    thunkProjectCreateTask: () => null,
    thunkProjectDeleteTask: () => null,
    thunkUserUpdateTask: () => null,
    thunkUserCreateTask: () => null,
    thunkUserDeleteTask: () => null,
  };
}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTasks);