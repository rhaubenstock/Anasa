import React from 'react';
import { Link } from 'react-router-dom';


class UserTasks extends React.Component{
  constructor(props){
    super(props);
    // tasks -> id is key, value is text 
    this.state = {
      newTaskName: "",
      prj_id: 0,
      tasks: {}
    };
    Object.assign(this.state.tasks, this.props.tasks);
    this.saveTask = this.saveTask.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  componentDidMount(){

  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.tasks !== prevProps.tasks) {
      this.state.tasks = {};
      this.setState({
        newTaskName: "",
        prj_id: 0,
        tasks: this.props.tasks 
      });
    }
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  addTask(){
      let handleCreate, type, id;
      if (this.state.prj_id === 0){
        handleCreate = this.props.thunkUserCreateTask;
        type = "User";
        id = this.props.id;
      } else {
        handleCreate = this.props.thunkProjectCreateTask;
        type = "Project";
        id = this.state.prj_id;
      }
      handleCreate({
        name: this.state.newTaskName,
        taskable_type: type,
        taskable_id: id,
        assignee_id: this.props.id,
      }).then(
        () => { this.setState({"newTaskName": ""})}
      );
  }

  deleteTask(id){
    return () =>{
      let task = this.state.tasks[id];
      if(task.user_id){
        this.props.thunkUserDeleteTask(this.state.tasks[id]);
      } else {
        this.props.thunkProjectDeleteTask(this.state.tasks[id]);
      }
    }
  }

  changeTask(id){
    return (e) => {
      const newTask = this.state.tasks[id];
      newTask.name = e.currentTarget.value;
      const newState = {};
      Object.assign(newState, this.state)
      this.setState(newState, ()=>{this.saveTask(id)});
      // this.saveTask(this.state[id])
    }
  }

  // changeNewTask(){
  //   //later on can do more fancy things like + symbol to create new task on frontend side
  //   //and then treat new task like any other, but for now just have form
  //   return (e) => {
  //     this.setState({"newTaskName": e.currentTarget.value});
  //   }

  // }

  saveTask(id){
    let task = this.state.tasks[id];
    if(task.name.length > 0){
        if(task.user_id){
          this.props.thunkUserUpdateTask(this.state.tasks[id]);
        } else {
          this.props.thunkProjectUpdateTask(this.state.tasks[id]);
        }
    }
  }
 
  render(){
    // conditionally add onclick in react
    // https://stackoverflow.com/questions/48223852/how-to-conditionally-add-or-not-onclick-on-a-div-in-react
    
    // const addTaskEl = (!this.props.canEdit) ? null : (
    //   <li key={0}>
    //     <h5>Create a new task:</h5>
    //     <input type="text"
    //            value={this.state.newTaskName}
    //            onChange={this.update("newTaskName")}
    //            disabled={(this.state.newTaskName.length === 0) || null}
    //     />
    //     <select onChange={this.update('prj_id')}
    //               className="auth-input-field">
    //         <option value={0} key={0}>Personal Task</option>
    //         {
    //           this.props.prjs.map(prj => <option value={prj.id} key={prj.id}>{prj.name}</option>)
    //         }
    //     </ select>
    //     <input type="submit" onClick={this.addTask} value="Add Task" />
    //   </li> );

      // const deleteButton = (task) => {
      //   return (!this.props.canEdit) ? null :  (<button onClick={this.deleteTask(task.id)}> X </button>);
      // };

    const emptyNewTask = this.state.newTaskName.length === 0;

    // can change placeholder value based on state
    // on focus -> change to What's the next thing on your plate
    const taskAddButton =
      <input type="submit"
        className="task-button"
        onClick={this.addTask}
        value="Add Task"
        disabled={emptyNewTask || null}
      />;

    const taskCreator = (!this.props.canEdit) ? null :
      <div className="task-wrapper">
        <input className="task-text"
          value={this.state.newTaskName}
          onChange={this.update("newTaskName")}
          placeholder="Click to enter a new task"
        />
        <div className="new-task-buttons">
       
          <select onChange={this.update('prj_id')}
            className="prj-selector">
            <option value={0} key={0}>Personal Task</option>
            {
              this.props.prjs.map(prj => <option value={prj.id} key={prj.id}>{prj.name}</option>)
            }
          </ select>
          {emptyNewTask ? null : taskAddButton}
        </div>


    </div>;
    const taskList = <div className="task-list">
      {Object.values(this.props.tasks).reverse().map(task =>
        <div className="task-wrapper">
          <input className="task-text"
            value={this.state.tasks[task.id] ? this.state.tasks[task.id].name : ""}
            onChange={this.props.canEdit ? this.changeTask(task.id) : undefined}
            readOnly={!this.props.canEdit} 
          />
          { (!this.props.canEdit) ? null :
            <button onClick={this.deleteTask(task.id)}
              className="task-button delete-button"
            > Delete Task </button>
          }
        </div>
      )}
    </div>;

    return (
      <div className="task-spacing-container">
        <div className="task-visual-container">
          <div className="task-header-container">
            <div className="task-header">
              Todos
            </div>
          </div>
          {taskCreator}
          {taskList}
        </div>
      </div>
    );

    // return(
    //   <div>
    //     <p>Task List</p>
    //     <ul className="task-list">
    //         {
    //           Object.values(this.props.tasks).map(task => 
    //             <li className="deletableTask" key={task.id}>
    //               <input type="text" 
    //                      value={this.state.tasks[task.id] ? this.state.tasks[task.id].name : ""}
    //                      onChange={this.props.canEdit ? this.changeTask(task.id) : undefined}
    //                      readOnly={!this.props.canEdit}      
    //               />
    //               { deleteButton(task) }
    //             </li>
    //           )
    //         }
    //         { addTaskEl }
    //       </ul>
    //   </div>
    // )
  }
}

export default UserTasks;