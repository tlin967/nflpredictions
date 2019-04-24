import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//creation of the redux store
import { createStore, applyMiddleware, compose} from 'redux'
//our reducer
import rootReducer from './store/reducers/rootReducer'
//helps combine redux with the app
import { Provider } from 'react-redux'
//used to halt dispatcher in order for us to return function in action creator to obtain data from db
import thunk from 'redux-thunk'
//used to access firebase Firestore and store enhancers
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
//firebase config
import fbConfig from './config/fbConfig'



//use middleware to enhance the store with thunk functionality and extra args
const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true})
    )
);



//makes sure we wait for firebase to make sure we are logged in before we render it to the DOM
store.firebaseAuthIsReady.then(() => {



  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();

})
