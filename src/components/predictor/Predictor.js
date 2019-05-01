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

        console.dir(props.predicted_results)
        this.state = {
           week: 1,
           results: props.predicted_results,
           stop: 0,
           teamIndex: 0,
        };

              this.handleResults = this.handleResults.bind(this);
              this.ok = {};

}

componentDidMount = () => {
      M.AutoInit();

  }

// componentWillReceiveProps(nextProps) {
//    if(nextProps.predicted_results !== this.props.results) {
//      this.setState({
//        results: nextProps.predicted_results,
//        week: 1
//      });
//    }
//
//  }

  handleWeek = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.dir(this.props.predicted_results)
    console.log(value)

    this.setState({
        //[name]: value,
        week: value,
        results: this.props.predicted_results,
    });


  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        //[name]: value,
        [name]:value
    });

    console.log(this.state.teamIndex)
  }

  handleResults(event) {
    this.setState({
        results: event,
        stop: 1
    });
  }


  render() {
    console.log(this.state.results)
    const { predicted_results, auth} = this.props;
    console.log({predicted_results})
    // if(predicted_results !== undefined) {
    //     console.log("no")
    //         if (this.state.stop === 0){
    //             console.log("yes")
    //             {this.ok = predicted_results}
    //             console.log(this.ok)
    //             this.setState({
    //                 results:this.ok,
    //                 stop : 1
    //             })
    //             console.log(this.state.results)
    //
    //         }
    //
    // }

    if(!auth.uid) {
      return <Redirect to='/signin' />
    }


    return(
        /*general home page container*/
        <div className="predictor container" class="row">

            {/*rest of the page container*/}
            <div class="col-lg-12 container row">
                {/*icon for the hometeam logo*/}

                {

                    this.state.week === 1 ? <div> {

                                      predicted_results && predicted_results.map((result, index) => {


                                        if(result.schedule_week === 1 && index === this.state.teamIndex ){
                                          return (

                                            <div className="col-lg-12 header-team-container row">

                                            {/*
                                            <p>Date: {result.schedule_date}</p>
                                                <p>Week: {result.schedule_week}</p>
                                                <p>Home Team: {result.team_home}</p>
                                                <p>Away Team: {result.team_away} </p>
                                                <p>Predicted Result: {result.predicted_result === 0 ? 'Away Team Wins' : 'Home Team Wins'} </p>
                                                <p>Actual Result: {result.full_result === 0 ? 'Away Team Wins' : 'Home Team Wins'} </p>
                                                <p>{this.state.week}</p>
                                            */}
                                                <div className="col-lg-6 team-container icon">
                                                  <div className="card center predictor-team-header row">

                                                    <div> {result.team_home} </div>

                                                    <div className="predictor-image-container"><img src="../team-icons/eagles.png" alt="team" class="home-team-image" /></div>
                                                    <hr></hr>
                                                    <div> Home </div>
                                                  </div>
                                                </div>



                                                <div className="col-lg-6 team-container icon">
                                                  <div className="card center predictor-team-header row">

                                                    <div> {result.team_away} </div>

                                                    <div className="predictor-image-container"><img src="../team-icons/falcons.png" alt="team" class="home-team-image" /></div>
                                                    <hr></hr>
                                                    <div> Away </div>
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

                {/*result box*/}


                {/*importing the hometeam drop down table*/}
                <div class="container">

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
                                <select class="browser-default" name="teamIndex" value={this.state.teamIndex} onChange={this.handleChange}>

                            {
                                predicted_results && predicted_results.map((result,index) => {
                                    if(result.schedule_week === this.state.week){
                                        return(
                                        <option value={index} >Week {result.schedule_week}. {result.team_home} vs {result.team_away}</option>
                                        )
                                    }

                                })

                            }
                                </select>
                        </div>
                    </div>
                    
                    <div class = "col-lg-12 center card" classname="stats">
                        <div class="card-content black-text">
                            <span class="card-title">Result</span>
                            {
                                predicted_results && predicted_results.map((result, index) => {
                                    if(result.schedule_week === this.state.week && index == this.state.teamIndex){
                                        return(
                                            <div className="col-lg-12 py-1">
   
                                                <div className="col-lg-12 row"> 
                                                    <div className="col-lg-5" >Date: {result.schedule_date}</div>
                                                    <div className="col-lg-5" >Week: {result.schedule_week}</div>
                                                </div>
                                                <div className="col-lg-12 row"> 
                                                    <div className="col-lg-5" >Home Team: <br></br> {result.team_home} </div>
                                                    <div className="col-lg-5" >Away Team: <br></br> {result.team_away}</div>
                                                </div>
                                                <hr></hr>
                                                <div className="col-lg-12 row"> 
                                                    <div className="col-lg-5" >Predicted Result: <br></br> {result.predicted_result === 0 ? 'Away Team Wins' : 'Home Team Wins'} </div>
                                                    <div className="col-lg-5" >Actual Result: <br></br>{result.full_result === 0 ? 'Away Team Wins' : 'Home Team Wins'} </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                })

                            }
                        </div>
                    </div>

                   


                    {

                        this.state.week === 1 ? <div> {

                                          this.state.results && this.state.results.map(result => {


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
