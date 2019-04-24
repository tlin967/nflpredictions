import React, { Component } from 'react'
import HomeTable from './HomeTable'
import AwayTable from './AwayTable'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import M from 'materialize-css';


class Predictor extends Component {
  componentDidMount = () => {
      M.AutoInit();
  }

  render() {

    const { team, auth} = this.props;

    if(!auth.uid) {
      return <Redirect to='/signin' />
    }


    return(
        /*general home page container*/
        <div className="predictor container" class="row">

          {/*rest of the page container*/}
          <div class="col s10 indigo lighten-5 full-width">
            {/*icon for the hometeam logo*/}
            <div class="col s4 offset-s1 center" classname="home-team icon">
              <img src="../team-icons/packers.png" alt="team" width="350" class=" responsive-img" />
            </div>

            {/*icon for the away team logo*/}
            <div class="col s4 offset-s2 center " classname="away-team icon">
              <img src="../team-icons/raiders.png" alt="ATeam" width="350" class="responsive-img" />
            </div>

            {/*result box*/}
            <div class = "col s6 offset-s3 center card" classname="stats">
              <div class="card-content black-text">
              <span class="card-title">Result</span>
                <p>The Greenbay Packers will lead the Oakland Raiders 38-34 </p>
              </div>
            </div>

            {/*importing the hometeam drop down table*/}
            <div class="col s6"><HomeTable /></div>

            {/*importing the away team drop down table*/}
            <div class="col s6"><AwayTable /></div>

           </div>
        </div>


    )
  }
}

const mapStateToProps = (state) => {
  return {
    //gets state.team's object, and then that object's "teams" object
    teams: state.firestore.ordered.teams,
    auth: state.firebase.auth
  }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {collection: 'teams'} //specify which collection we want to sync
    ])
  )(Predictor)
