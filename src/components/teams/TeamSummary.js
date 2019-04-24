import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const TeamSummary = (props) => {
  //get team object from props
  const { team, auth} = props;

  if(!auth.uid) {
    return <Redirect to='/signin' />
  }

  //if there is a team
  if(team) {
    return (
      /*general home page container*/
      <div className="row">


          {/*rest of the page*/}
        <div className="col s12">
          {/*importing the team drop down table and pass teams data to the table*/}
          <div className="card z-depth-0 team-summary">
            <div className="card-content grey-text text-darken-3">
              <span className="card-title">{team.name} ({team.ranking})</span>
              <p>From: {team.location}</p>
              <p className="grey-text">More stats about this team: {team.gamesPlayed} games played</p>
            </div>
          </div>

        </div>

      </div>
    )

  } else {
    return (
      <div className="container center">
        <p>Loading team data...</p>
      </div>
    )
  }

}
const mapStateToProps = (state, ownProps) => {
  //get id of the team we are specifically looking at
  const id = ownProps.match.params.id;

  //get list of teams data from firebase
  const teams = state.firestore.data.teams;

  //find team from list of teams, where it has matching id, else return null
  const team = teams ? teams[id] : null

  return {
    team: team,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'teams'}
  ])
)(TeamSummary)
