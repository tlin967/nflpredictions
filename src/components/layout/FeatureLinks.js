import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const FeatureLinks = (props) => {
  return (

      <ul className="left hide-on-med-and-down">
      {/*links in the navbar*/}
        <li><img src="../homepage/logo.png" alt="logo" width="150" class=" responsive-img" /></li>

        <li><a href="/"><i class="material-icons left">home</i>Home</a></li>
        <li><a href='/teams'><i class="material-icons left">insert_chart</i>Team Stats</a></li>
        <li><a href='/predictor'><i class="material-icons left">storage</i>Predictor</a></li>
      </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(FeatureLinks)
