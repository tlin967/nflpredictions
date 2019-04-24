import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'



const SignedInLinks = (props) => {
  return (


    //nav bar links when user is signed in
    <ul className="signed-in-links right">
        <a class="dropdown-trigger btn-floating teal" data-target='dropdown'>
          <i class="material-icons black-text">person</i>
       </a>

      <ul id='dropdown' class='dropdown-content'>
        <li><span class="black-text"><b>Hello, {props.profile.firstName + " " + props.profile.lastName}</b></span></li>
        <li class="divider" tabindex="-1"></li>

        <li><a href='/profile'><i class="material-icons left black-text">description</i><span class="black-text">Profile</span></a></li>
        <li><a onClick={props.signOut}><i class="material-icons left black-text">exit_to_app</i><span class="black-text">Sign Out</span></a></li>
      </ul>







    </ul>

  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}


export default connect(null, mapDispatchToProps)(SignedInLinks);
