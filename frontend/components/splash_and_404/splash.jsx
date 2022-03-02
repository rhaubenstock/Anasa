import React from 'react';
import Header from './header';
import Footer from './footer';
import { Link } from 'react-router-dom';


export default ({ signupLink }) => {
      // <div className="splash-main">
      //   <div className="splash-text">
      //     {/* {<h3>Work on big ideas, without the busywork.</h3>
      //     <p>From the small stuff to the big picture, Asana organizes work so teams know what to do, why it matters, and how to get it done.</p>} */}
      //     {/* {signupLink} */}
      //   </div>
      //   <div className="splash-img">
      //    {/* { <img src="assets/teamwork.jpeg" alt="teamwork!"/>} */}
      //   </div>
      // </div>
  return (
    <>
      <Header />
      <section className="firstSection">
        <div className="firstSection-text">
          <h3 className="firstSection-title">Work on big ideas, without the busywork</h3>
          <h5 className="firstSection-inner">From the small stuff to the big picture, Anasa organizes work so teams know what to do, why it matters, and how to get it done.</h5>
        </div>
        <div className="splash-img">
          {/* <img  src="assets/teamwork.jpeg" alt="" /> */}
        </div>
      </section>
      <section className="splashSection">
        <div className="splashSection-container">
          <div className="">
            <div className="">
              <div className="splashSection-mainText-Container">
                <h1 className="splashSection-mainText">
                  See everything the team’s working on in one place.
                </h1>
                <Link to="/signup" className="tryFree">Try it Out!(Free)</Link>
              </div>
           </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}