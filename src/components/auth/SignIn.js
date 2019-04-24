import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import SignedInLinks from '../layout/SignedInLinks'
import SignedOutLinks from '../layout/SignedOutLinks'
import M from 'materialize-css';


class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      //gets the field that is being changed and saves the value and updates the state
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault(); //prevent default submission of fields

    //pass email and password from state, to the function below that sends to signin function
    this.props.signIn(this.state)
  }

  componentDidMount = () => {
      M.AutoInit();
  }

  render() {
    //getting to see if there is a value in authError
    const { authError, auth } = this.props;
    //if uid exists in auth then user is signed in, passing with it the user profile
    const { profile } = this.props;
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />;


    if(auth.uid) {
      return <Redirect to='/' />
    }

    return (
        <div className="container">


          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign In</h5>


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
              <button className="btn pink lighten-1 z-depth 0">Login</button>
            </div>

          </form>
        </div>

    )
  }
}

//map the state to see errors
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
