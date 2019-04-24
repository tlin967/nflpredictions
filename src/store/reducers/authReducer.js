//create initial state
const initState = {
  authError: null
}

//create reducer for authentication, passing in initial state of reducer
const authReducer = (state = initState, action) => {

  //use switch to determine what to do in certain types
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log("login error")
      return {
        ...state, //returns all the same values of state without having to type it all out
        authError: 'Login failed'
      }
    case 'SUCCESSFUL_LOGIN':
      console.log("login success")
      return {
        ...state,
        authError: null
      }
    case 'SIGNOUT_SUCCESS':
      console.log("signout success")
      return state;

    case 'SIGNUP_SUCCESS':
      console.log("signup sucess")
      return {
        ...state,
        authError: null
      }

    case 'SIGNUP_ERROR':
      console.log("signup error")
      return {
        ...state,
        authError: action.err.message
      }


    default:
      return state
  }
}

export default authReducer
