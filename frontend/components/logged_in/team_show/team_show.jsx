import React from 'react';
import { Link } from 'react-router-dom';

class TeamShow extends React.Component{
  constructor(props){
    super(props);
    this.state = { description: this.props.description,
                   name: this.props.name,
                   placeholder: "Loading team description..."
                 };
    this.saveDescription = this.saveDescription.bind(this);
  }

  componentDidMount(){
    this.props.thunkGetTeam().then(
      (res) => { this.setState({ description: res.team.description,
        name: res.team.name,
        placeholder: "Click to add team description..."    
      })}
    )
  }


  
  componentDidUpdate(prevProps, prevState){
    // https://stackoverflow.com/questions/30528348/setstate-inside-of-componentdidupdate

    // compare if new props id != old props id 
    //    not sure if need to update old Team description here or not
    // if different ids -- then need to thunkGetTeam
    //    does it make sense to use a loading/bufferring text here?
    
    // if(this.props.id !== prevProps.id){
    //   this.props.thunkGetTeam();
    // }
    if (this.props.name !== prevProps.name){
      this.setState({ description: "",
                      name: this.props.name,
                      placeholder: "Loading team description..."
      });
      this.props.thunkGetTeam().then(
        (res) => { this.setState({ description: res.team.description,
                                    name: res.team.name,
                                    placeholder: "Click to add team description..."  
        })}
      );
    }
  }

  saveDescription(){
    if (this.state.name !== "Loading Team Name..." &&
        this.state.description !== this.props.description &&
        this.state.description !== ""){
      this.props.thunkUpdateTeam(
        {
          id: this.props.id,
          name: this.props.name,
          description: this.state.description 
        }
      );
    }
  }

  changeDescription(){
    return (e) => {
      this.setState({ description: e.currentTarget.value }, this.saveDescription);
      // still having an error of leaving off the last character, 
      // but debouncing should fix that, see below:
      //
      // https://davidwalsh.name/javascript-debounce-function
    };
  }

  render(){
    if(!this.props.team) return (
      <div className="home-main">
        {this.props.sidebar}
        <div className="page-main">
          {this.props.header}
          <div className="TeamShow-main">
            <div> No Team Found </div>
          </div>
        </div>  
      </div>
    );


    return (
      <div className="home-main">
        {this.props.sidebar}
        <div className="page-main">
          {this.props.header}
          <div className="TeamShow-main">
            <div className="TeamShow-leftPane">
              <div className="team-visual-container">
                {/* <div className="TeamShow-description-title">
                  <h5>Description</h5>

                </div> */}
                <div className="task-header-container">
                  <div className="task-header">
                    Description
                  </div>
                </div>
                <div className="description-Holder">
                  <textarea value={this.state.description || ""}
                            placeholder="Click to add team description..."
                            onChange={this.changeDescription()}
                            className="team-description"
                    />
                  
                </div>
              </div>
              <div className="home-member-links">
                <div className="home-member-title">Team Members:</div>
                <ul>
                  {
                    this.props.teammates.map(teammate => 
                      <li className="link TeamShow-Member" key={teammate.id} >
                        <Link to={`/users/${teammate.id}`} >
                          {/* https://stackoverflow.com/questions/26516353/font-awesome-background-color */}
                          {/* <span className="fa-stack" style={{"vertical-align": "top"}}>
                            <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fas fa-chevron-up fa-stack-1x fa-inverse"></i>
                          </span> */}
                            <i className="fa-solid fa-circle-user fa-4x"
                                style={{color: teammate.color}}></i>
                          <span className="teammate-email">{this.props.currentUserId === teammate.id ? "Me" : teammate.email}</span>
                        </Link>
                      </li>
                    )
                  }
                </ul>
              </div>
            </div>
          
            <div className="TeamShow-rightPane">
              <div className="home-prj-links">
                <div className="home-prj-title">Project Links:</div>
                <div className="prj-grid">
                  {
                    this.props.projects.map(prj => 
                      <div className="link TeamShow-Project" key={prj.id}>
                        <Link to={`/projects/${prj.id}`} >
                          <i className="fa-solid fa-briefcase fa-5x"
                             style={{color: prj.color}}></i>
                          <span className="prj-name">{prj.name}</span>
                        </Link>
                      </div>
                    )
                  }
          
                  <div className=" link prj-create-link">
                    <Link to={`/projects/new`} >
                      <i class="fa-regular fa-square-plus fa-5x"></i>
                      <span className="prj-name">Make a new project</span>
                    </Link>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default TeamShow;