import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = function() {
  const currentLocation = window.location.pathname;

  //based on page, decide if we display the reister or login button
  const regis_or_log = currentLocation === '/signin' ?
    <li><a href="/signup" class="waves-effect waves-light btn"><i class="material-icons right">people</i>Register</a></li> :
    <li><a href="/signin" class="waves-effect waves-light btn"><i class="material-icons right">check</i>Login</a></li>




  return (
    //navbar links for when user is logged out

    <ul className="signed-out-links right ">
      {regis_or_log}
    </ul>

  )
}

export default SignedOutLinks
