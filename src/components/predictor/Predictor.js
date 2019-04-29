import React, { Component } from 'react'
import HomeTable from './HomeTable'
import AwayTable from './AwayTable'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import M from 'materialize-css';


class Predictor extends Component {
constructor(props) {
            
        super(props)
        console.log(props)
        this.state = {
           week: 1,
          results: {},
          stop: 0
        };

              this.handleResults = this.handleResults.bind(this);
              this.ok = {};

}

componentDidMount = () => {
      M.AutoInit();

  }

  handleWeek = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });

    console.log(value)

  }

  handleResults(event) {
    this.setState({
        results: event,
        stop: 1
    });
  }


  render() {

    const { predicted_results, auth} = this.props;

    if(predicted_results != undefined){
        console.log("no")
            if (this.state.stop === 0){
                console.log("yes")
                {this.ok = predicted_results}
                console.log(this.ok)
                this.setState({
                    results:this.ok,
                    stop : 1
                })
                console.log(this.state.results)

            }
        
    }

    if(!auth.uid) {
      return <Redirect to='/signin' />
    }


    return(
        /*general home page container*/
        <div className="predictor container" class="row">

            {/*rest of the page container*/}
            <div class="col-lg-12 container row">
                {/*icon for the hometeam logo*/}
{/* IGNORE
                {

                    this.state.week === 0 ? <div> {

                                      predicted_results && predicted_results.map(result => {


                                        if(result.schedule_week === 1){
                                          return (

                                            <div className="col-lg-12 row">


                                            <p>Date: {result.schedule_date}</p>
                                                <p>Week: {result.schedule_week}</p>
                                                <p>Home Team: {result.team_home}</p>
                                                <p>Away Team: {result.team_away} </p>
                                                <p>Predicted Result: {result.predicted_result === 0 ? 'Away Team Wins' : 'Home Team Wins'} </p>
                                                <p>Actual Result: {result.full_result === 0 ? 'Away Team Wins' : 'Home Team Wins'} </p>
                                                <p>{this.state.week}</p>
                                                <div className="col-lg-6 home-team-container icon">
                                                  <div className="card center predictor-team-header row"> 

                                                    <div> Home Team: {result.team_home} </div> 

                                                    <div className="predictor-image-container"><img src="../team-icons/packers.png" alt="team" class="home-team-image" /></div>
                                                    <hr></hr>
                                                    <div> asd </div>
                                                  </div>
                                                </div>

                                                <div className="col-lg-6 home-team-container icon">
                                                  <div className="card center predictor-team-header row"> 

                                                    <div> Away Team: {result.team_away} </div> 

                                                    <div className="predictor-image-container"><img src="../team-icons/packers.png" alt="team" class="home-team-image" /></div>
                                                    <hr></hr>
                                                    <div> asd </div>
                                                  </div>
                                                </div>
                                            </div>

                                          )
                                        }


                                        })

                    } 



                    </div>

                    : <div> {this.state.week}</div>
                  

                }

            */}
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
                            <select class="browser-default" name="week" value={this.state.week} onChange={this.handleWeek}>
                                <option value="" disabled selected>Choose Home Team</option>
                                <option value="1">Week 1</option>
                                <option value="2">Week 2</option>
                                <option value="3">Week 3</option>
                            </select>
                        </div>

                        <div class="input-field" classname="away-team container">
                            <div> Game Matchups </div>
                                <select class="browser-default" name="awayteam">

                            {
                                predicted_results && predicted_results.map(result => {
                                    if(result.schedule_week === this.state.week){
                                        return(
                                        <option value="" disabled selected>Week {result.schedule_week}. {result.team_home} vs {result.team_away}</option>
                                        
                                        )
                                    }
                                })

                            }
                                </select>
                        </div>
                    </div>


                    {

                        this.state.week === 1 ? <div> {

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
                                                    <p>this.state.week value is {this.state.week}</p>
                                                  </div>
                                                </div>
                                              )
                                            }


                                            })

                        } 

                        </div>

                        : <div> {this.state.week}</div>

                      

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
      {collection: 'predicted_results', orderBy: ['id']} //specify which collection we want to sync
    ])
  )(Predictor)
