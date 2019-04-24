import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import SignedInLinks from '../layout/SignedInLinks'
import SignedOutLinks from '../layout/SignedOutLinks'
import M from 'materialize-css';


class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  handleChange = (e) => {
    this.setState({
      //gets the field that is being changed and saves the value and updates the state
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault(); //prevent default submission of fields
    this.props.signUp(this.state)
  }

  componentDidMount = () => {
      M.AutoInit();
  }

  render() {
    const { auth, authError } = this.props;
    if(auth.uid) {
      return <Redirect to='/' />
    }
    const { profile } = this.props;
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />;


    return (

      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>

          <div className="red-text center">
            {/*if an error exists, itll display error, else null */}
            { authError ? <p>{authError}</p> : null}
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth 0">Sign Up</button>
          </div>

        </form>
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
