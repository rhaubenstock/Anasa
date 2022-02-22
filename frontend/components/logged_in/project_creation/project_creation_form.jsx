import React from 'react';
import { Link } from 'react-router-dom';

class ProjectCreationForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      team_id: this.props.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    // this.props.thunkGetTeams().then(
    //   (res) => { 
    //     this.teams = Object.values(res.teams);
    //     this.setState({
    //       team_id: Object.keys(res.teams)[0]
    //     })
    //   }
    // );
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const project = Object.assign({}, this.state);
    console.log(this.state.name.length);
    this.props.thunkCreateProject(project).then(
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
          <div className="prj-form-container">
            <form onSubmit={this.handleSubmit} 
                  className="prj-form">
              <div className="prj-inputs">
                <div>
                  <div className="prj-input-label">Project Name</div>
                  <input type="text"
                          value={this.state.name}
                          onChange={this.update('name')}
                          className="prj-input-field"
                  />
                </div>
                <div>
                  <div className="prj-input-label">Team</div>
                  <select onChange={this.update('team_id')}
                          className="prj-input-field"
                  >
                    {
                      this.props.teams.map(team => <option value={team.id} key={team.id}>{team.name}</option>)
                    }
                  </ select>
                </div>
              </div>
              <input type="submit" 
                      value="Create Project"
                      className="project-create-submit"
                      disabled={(this.state.name.length === 0) || null}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectCreationForm;