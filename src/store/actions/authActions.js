export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    //use firebase to signin with email and pass, will take time to do, so use promise
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({type: 'SUCCESSFUL_LOGIN'});
    }).catch((err) => {
      dispatch({type: 'LOGIN_ERROR', err});
    });
  }
}

export const signOut = () => {
  return(dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({type: 'SIGNOUT_SUCCESS'});
    })
  }
}

export const signUp = (newUser) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    //create user using firebase
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => { //create a user entry in firestore
      return firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      })
    }).then(() => { //dispatch that signup was successful
      dispatch({type: 'SIGNUP_SUCCESS'})
    }).catch(err => {
      dispatch({type: 'SIGNUP_ERROR', err})
    })


  }
}
