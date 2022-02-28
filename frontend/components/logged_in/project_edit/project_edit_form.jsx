import React from 'react';
import { Link } from 'react-router-dom';

class ProjectEditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      id: this.props.project.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.thunkGetProject().then(
      (res) => { 
        this.setState({
          name: res.project.name,
          team_id: res.project.team_id
        });
      }
    );
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const project = Object.assign({}, this.state);
    this.props.thunkEditProject(project).then(
      res => {
        this.props.history.push(`/projects/${res.project.id}`);
      }
    );
  }

  // renderErrors() {
  //   return (
  //     <ul>
  //       {this.props.errors.map((error, i) => (
  //         <li key={`error-${i}`}>
  //           {error}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }

  // componentWillUnmount(){
  //   this.props.clearErrors()
  // }

  render(){
    return (
      <div className="home-main">
        {this.props.sidebar}
        <div className="page-main">
          {this.props.header}
          <div className="prj-edit-background">
            <div className="prj-edit-form-container">
              <form onSubmit={this.handleSubmit} 
                    className="prj-form">
                <h2 className="prj-edit-title">Edit Project</h2>
                <div className="prj-edit-inputs">
                  <div className="prj-edit-input-label-holder">
                    <label className="prj-edit-input-label">Project Name</label>
                  </div>
                  <input type="text"
                          value={this.state.name}
                          onChange={this.update('name')}
                          className="prj-edit-input-field"
                  />
                </div>
                <input type="submit" 
                        value="Save Edited Project"
                        className="project-edit-submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectEditForm;