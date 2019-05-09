import React, { Component } from 'react'
import SignedInLinks from '../layout/SignedInLinks'
import SignedOutLinks from '../layout/SignedOutLinks'
import { connect } from 'react-redux'
import M from 'materialize-css';
import homeImage from '../homepage/home12.jpeg';


var topSectionStyle = {
  width: "100%",
  height: "70vh",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundImage: `url(${homeImage})`,
};

class Homepage extends Component {
  componentDidMount = () => {
      M.AutoInit();
  }



  render() {
    //if uid exists in auth then user is signed in, passing with it the user profile
    const { auth, profile } = this.props;
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />;


    return(
        /*general home page container*/
        <div className="homepage">

          <div className="parallax-container">
            <div className="row" style={topSectionStyle} >
              <div className="home-page-header-container col-lg-5 row">
                <div className=" col-lg-12 home-page-header-box">
                    <p className="home-page-header-first-text">Time to Begin Your</p>
                    <p className="home-page-header-second-text">Predictive Analysis </p>
                    <p className="home-page-header-third-text">Into The NFL Today! </p>
                    <a href='/predictor' className="home-page-submit-button" >Predict</a>

                </div>

              </div>
              <div class="col-lg-7 ">

              </div>

            </div>
          </div>


          <div class="home-page-middle-section col-lg-12 row">
              <div className="room-page-room-item col-lg-4 mb-5">
                <div className="home-card"  style={{ cursor: "pointer" }}>
                    <div className="home-page-card-image home-page-card-image-1">
                        <a href="#child4"><img src="../homepage/home-card-1.jpeg"  alt="Placeholder"/></a>
                    </div>
                    <div className="text">
                      <h2 className="heading">Model Development</h2>
                      <div className="">
                        Through the utilization of machine learning algorithms, methodologies, data collecion and preprocessing, are we able to develop a model that achieves nearly a 65% accuracy.

                      </div>
                      
                            {/*<p><a href="#" className="btn btn-primary py-3 px-5">Read More</a></p>*/}

                    </div>
                </div>
              </div>

              <div className="room-page-room-item col-lg-4 mb-5">
                <div className="home-card"  style={{ cursor: "pointer" }}>
                    <div className="home-page-card-image home-page-card-image-2">
                        <a href="#child4"><img src="../homepage/home-card-2.jpeg"  alt="Placeholder"/></a>
                    </div>
                    <div className="text">
                      <h2 className="heading">Predictions</h2>
                      <div>
                        Our model is based on the matchups of previous games, which provides our model insight into how to predict the outcome of future games.
                      </div>

                    </div>
                </div>
              </div>

              <div className="room-page-room-item col-lg-4 mb-5">
                <div className="home-card"  style={{ cursor: "pointer" }}>
                    <div className="home-page-card-image home-page-card-image-3">
                        <a href="#child4"><img src="../homepage/home-card-3.jpeg"  alt="Placeholder"/></a>
                    </div>
                    <div className="text">
                      <h2 className="heading">Utility</h2>
                      <div className="price">
                      </div>
                        Having the ability to predict outcomes provides analytics, sports fanatics, and coaches the means to gain insight on their favorite teams and how they would fare against other teams.
                            {/*<p><a href="#" className="btn btn-primary py-3 px-5">Read More</a></p>*/}

                    </div>
                </div>
              </div>
          </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}
export default connect(mapStateToProps)(Homepage)
