import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import FeatureLinks from './FeatureLinks'


const Navbar = function(props) {
  //getting auth data from props

  const { auth, profile } = props;
  const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />;



  //if page is on signinpage, display nav bar with register button instead of nav bar with sign in button
  // const currentLocation = window.location.pathname;
  // const signed_out_link = currentLocation === '/signin' ? <SignedOutLinks

  return (
    //used materialize css library for these classes
      <div className="nav">
        <nav className="nav-wrapper custom-navbar darken-2 z-depth 5">

          <a href="#" class="sidenav-trigger" data-target="mobile-links">
            <i class="material-icons">menu</i>
          </a>

          <FeatureLinks/>
          {links}

        </nav>

        {/* links for mobile view, set to be triggered when screen gets small */}
        <ul className="sidenav" id="mobile-links">
          <li><img src="../homepage/logo.png" alt="logo" width="150" class=" responsive-img" /></li>

          <li><a href='/'><i class="small material-icons left">home</i>Home</a></li>
          <li><a href='/teams'><i class="small material-icons left">insert_chart</i>Team Stats</a></li>
          <li><a href='/predictor'><i class="small material-icons left">storage</i>Predictor</a></li>
        </ul>

      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}
export default connect(mapStateToProps)(Navbar)
