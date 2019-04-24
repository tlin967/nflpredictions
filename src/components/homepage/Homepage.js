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
                <div className="block-34"  style={{ cursor: "pointer" }}>
                    <div className="home-page-card-image home-page-card-image-1">
                        <a href="#child4"><img src="../homepage/home-card-1.jpeg"  alt="Placeholder"/></a>
                    </div>
                    <div className="text">
                      <h2 className="heading">Presidential Room</h2>
                      <div className="price"><sup className="room-page-room-price">$</sup><span className="room-page-room-price"></span><sub>/per night</sub></div>
                      <ul className="specs">
                           <li><strong>Bed Type:</strong> </li>                                     
                           <li><strong>Ammenities:</strong> Closet with hangers, HD flat-screen TV, Telephone</li>
                           <li><strong>Capacity Per Room:</strong> </li>
                           {/*<li><strong>Bed Number:</strong> {eachRoomResult.bed_number} </li>*/}

                           {/*<a href="#child4">{eachRoomResult.room_number}</a>*/}
                      </ul>
                      <div >
                        <strong># Of Rooms </strong> 
                        <input type="text" name="numbers" list="numbers">
                        </input>
                        <datalist id="numbers">
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <option value="4"></option>
                          <option value="5"></option>
                        </datalist>
                      </div>
                            {/*<p><a href="#" className="btn btn-primary py-3 px-5">Read More</a></p>*/}

                    </div>
                </div>
              </div>

              <div className="room-page-room-item col-lg-4 mb-5">
                <div className="block-34"  style={{ cursor: "pointer" }}>
                    <div className="home-page-card-image home-page-card-image-2">
                        <a href="#child4"><img src="../homepage/home-card-2.jpeg"  alt="Placeholder"/></a>
                    </div>
                    <div className="text">
                      <h2 className="heading">Presidential Room</h2>
                      <div className="price"><sup className="room-page-room-price">$</sup><span className="room-page-room-price"></span><sub>/per night</sub></div>
                      <ul className="specs">
                           <li><strong>Bed Type:</strong> </li>                                     
                           <li><strong>Ammenities:</strong> Closet with hangers, HD flat-screen TV, Telephone</li>
                           <li><strong>Capacity Per Room:</strong> </li>
                           {/*<li><strong>Bed Number:</strong> {eachRoomResult.bed_number} </li>*/}

                           {/*<a href="#child4">{eachRoomResult.room_number}</a>*/}
                      </ul>
                      <div >
                        <strong># Of Rooms </strong> 
                        <input type="text" name="numbers" list="numbers">
                        </input>
                        <datalist id="numbers">
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <option value="4"></option>
                          <option value="5"></option>
                        </datalist>
                      </div>
                            {/*<p><a href="#" className="btn btn-primary py-3 px-5">Read More</a></p>*/}

                    </div>
                </div>
              </div>

              <div className="room-page-room-item col-lg-4 mb-5">
                <div className="block-34"  style={{ cursor: "pointer" }}>
                    <div className="home-page-card-image home-page-card-image-3">
                        <a href="#child4"><img src="../homepage/home-card-3.jpeg"  alt="Placeholder"/></a>
                    </div>
                    <div className="text">
                      <h2 className="heading">Presidential Room</h2>
                      <div className="price"><sup className="room-page-room-price">$</sup><span className="room-page-room-price"></span><sub>/per night</sub></div>
                      <ul className="specs">
                           <li><strong>Bed Type:</strong> </li>                                     
                           <li><strong>Ammenities:</strong> Closet with hangers, HD flat-screen TV, Telephone</li>
                           <li><strong>Capacity Per Room:</strong> </li>
                           {/*<li><strong>Bed Number:</strong> {eachRoomResult.bed_number} </li>*/}

                           {/*<a href="#child4">{eachRoomResult.room_number}</a>*/}
                      </ul>
                      <div >
                        <strong># Of Rooms </strong> 
                        <input type="text" name="numbers" list="numbers">
                        </input>
                        <datalist id="numbers">
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <option value="4"></option>
                          <option value="5"></option>
                        </datalist>
                      </div>
                            {/*<p><a href="#" className="btn btn-primary py-3 px-5">Read More</a></p>*/}

                    </div>
                </div>
              </div>

          </div>

          <div class="parallax-container">
            <div class="parallax">
              <img src="../homepage/home2.jpeg" alt="home2" class="responsive-img" />
            </div>
          </div>

          <div class="container">
            <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            </p>
            <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            </p>
          </div>


          <div class="parallax-container">
            <div class="parallax">
              <img src="../homepage/home3.jpeg" alt="home3" class="responsive-img" />
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
