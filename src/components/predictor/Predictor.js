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

    //separate the predicted_results from this.props object
    const { predicted_results, auth} = this.props;

    //if uid in auth does not exist
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

                {predicted_results && predicted_results.map(result => {
                  return (

                    <div class = "col s6 offset-s3 center card" classname="stats">
                      <div class="card-content black-text">
                        <span class="card-title">Game</span>
                        <p>Date: {result.schedule_date}</p>
                        <p>Week: {result.schedule_week}</p>
                        <p>Home Team: {result.team_home}</p>
                        <p>Away Team: {result.team_away} </p>
                        <p>Predicted Result: {result.predicted_result === 0 ? 'Away Team Wins' : 'Home Team Wins'} </p>
                        <p>Actual Result: {result.full_result === 0 ? 'Away Team Wins' : 'Home Team Wins'} </p>
                      </div>
                    </div>
                  )
                })}



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
    predicted_results: state.firestore.ordered.predicted_results,
    auth: state.firebase.auth
  }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {collection: 'predicted_results', orderBy: ['schedule_date', 'desc']} //specify which collection we want to sync
    ])
  )(Predictor)
