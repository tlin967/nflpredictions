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

    const { predicted_results, auth} = this.props;

    if(!auth.uid) {
      return <Redirect to='/signin' />
    }


    return(
        /*general home page container*/
        <div className="predictor container" class="row">

            {/*rest of the page container*/}
            <div class="col-lg-12 container row">
                {/*icon for the hometeam logo*/}

                <div className="col-lg-6 home-team-container icon">
                  <div className="card center predictor-team-header row"> 

                    <div> Home </div> 

                    <div className="predictor-image-container"><img src="../team-icons/packers.png" alt="team" class="home-team-image" /></div>
                    <hr></hr>
                    <div> asd </div>
                  </div>
                </div>


                {/*icon for the away team lgo*/}
                <div className="col-lg-6 home-team-container icon">
                  <div className="card center predictor-team-header row"> 

                    <div> Home </div> 

                    <div className="predictor-image-container"><img src="../team-icons/packers.png" alt="team" class="home-team-image" /></div>
                    <hr></hr>
                    <div> asd </div>
                  </div>
                </div>


                {/*result box*/}
                

                {/*importing the hometeam drop down table*/}
                <div class="container">
                    <div class = "col-lg-12 center card" classname="stats">
                        <div class="card-content black-text">
                            <span class="card-title">Result</span>
                            <p>The Greenbay Packers will lead the Oakland Raiders 38-34 </p>
                        </div>
                    </div>

                    <div class="col-lg-12 card">
                        <div class="input-field " classname="home-team container">
                            <div> Game Week </div>
                            <select class="browser-default" name="hometeam">
                                <option value="" disabled selected>Choose Home Team</option>
                                <option value="1">San Francisco - 49er's</option>
                                <option value="2">Oakland - Raiders</option>
                                <option value="3">Green Bay - Packers</option>
                            </select>
                        </div>

                        <div class="input-field" classname="away-team container">
                            <div> Game Matchups </div>
                            <select class="browser-default" name="awayteam">
                                <option value="" disabled selected>Choose Away Team</option>
                                <option value="1">San Francisco - 49er's</option>
                                <option value="2">Oakland - Raiders</option>
                                <option value="3">Green Bay - Packers</option>
                           </select>
                        </div>
                    </div>

                    {


                      predicted_results && predicted_results.map(result => {


                        if(result.schedule_week === 1){
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
                        }


                        })

                    }

                    {/*importing the away team drop down table*/}

                </div>
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
      {collection: 'predicted_results', orderBy: ['schedule_week']} //specify which collection we want to sync
    ])
  )(Predictor)
