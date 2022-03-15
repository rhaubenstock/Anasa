import React from 'react';
import { Link } from 'react-router-dom';

class UserShow extends React.Component{
  constructor(props){
    super(props);
    this.state = { aboutMe: this.props.aboutMe || "",
                 };
    this.saveAboutMe = this.saveAboutMe.bind(this);
  }

  saveAboutMe(aboutMe){
    const user = this.props.user;
    user.about_me = aboutMe;
    this.props.thunkUpdateUser(user);
  }

  changeAboutMe(){
    if(this.props.canEdit){
      return (e) => {
        this.setState({ aboutMe: e.currentTarget.value || "" });
        // still having an error of leaving off the last character, 
        // but debouncing should fix that, see below:
        //
        // https://davidwalsh.name/javascript-debounce-function
        this.saveAboutMe(e.currentTarget.value);
      };
    }
    else{
      return () => null;
    }
  }

  componentDidMount(){
    // fetch user aboutMe and update state here
    this.props.thunkGetUser().then(
      payload => {
        this.setState({ 
          aboutMe: payload.user.about_me || "", 
          email: payload.user.email
        });
      }
    );
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.user && prevProps.user && this.props.user.id !== prevProps.user.id){
      this.props.thunkGetUser().then(
        payload => {
          this.setState({ 
            aboutMe: payload.user.about_me || "", 
            email: payload.user.email
          });
        }
      );
    }
  }

  render(){
    // const returnHomeOrCreateProjectLink = (this.props.canEdit) ? (<h5>
    //   <button className="new-prj-link">
    //     <Link to={`/projects/new`} className="team-create-submit">
    //       Make a New Project Page
    //     </Link>
    //   </ button>
    // </h5>) : null;
    // (<button className="home-profile-link"> 
    //     <Link to={`$/users/${this.props.currentUserId}`}>  <i className="fa-solid fa-house"/> Go to your profile</ Link>
    // </button>);


    if(!this.props.user) return (
      <div className="home-main">
        {this.props.sidebar}
        <div className="page-main">
          {this.props.header}
          <div className="UserShow-main">
            <div> No User Found </div>
            {/* {returnHomeOrCreateProjectLink} */}
          </div>
        </div>  
      </div>
    );

    const aboutMe = 
      <div className="task-spacing-container">
        <div className="task-visual-container">
          <div className="task-header-container">
            <div className="task-header">
              About Me:
            </div>
          </div>
          <div className="aboutme-container">
            <textarea className="user-aboutme"
            onChange={this.changeAboutMe()}
            value={this.state.aboutMe}
            placeholder="Add a description of yourself here!"
              />
          </div>
        </div>
      </div>;


    return (
    <div className="home-main">
      {this.props.sidebar}
      <div className="page-main">
        {this.props.header}
        <div className="UserShow-main">
        {aboutMe}
        {this.props.tasks}
      </div>
    </div>
  </div>
)
  }
}
export default UserShow;