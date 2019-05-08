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

        console.log(this.props.predicted_results)
        this.state = {
           week: 1,
           results: props.predicted_results,
           stop: 0,
           teamIndex: 0,
           result: 0,
           predicted_results: 0,
        };

        this.handleResults = this.handleResults.bind(this);
        this.ok = {};

}

componentDidMount = () => {
      M.AutoInit();

  }


componentWillReceiveProps(nextProps){
    if (nextProps.predicted_results !== undefined){
        console.log(nextProps.predicted_results)
        this.setState({
            predicted_results: nextProps.predicted_results,
            stop: 1,
        },

        function() {
        console.log(JSON.stringify( this.state ) );
    }
    );

        console.log(this.state.predicted_results)
        console.log(this.state.stop)
    }
    
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
    console.log(this.props.predicted_results)
    console.log(value)

    this.setState({
        //[name]: value,
        [name]: value,
        teamIndex: 1,
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
  }

  handleResults(event) {
    this.setState({
        results: event,
        stop: 1
    });
  }

  handleImage(imageName){
    if (imageName == "Philadelphia Eagles")
        var imageName = "../team-icons/Philadelphia-Eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/Atlanta-Falcons.png"
    if (imageName == "Baltimore Ravens")
        var imageName = "../team-icons/Baltimore-Ravens.png"
    if (imageName == "Buffalo Bills")
        var imageName = "../team-icons/Buffalo-Bills.png"
    if (imageName == "Carolina Panthers")
        var imageName = "../team-icons/Carolina-Panthers.png"
    if (imageName == "Dallas Cowboys")
        var imageName = "../team-icons/Dallas-Cowboys.png"
    if (imageName == "Cleveland Browns")
        var imageName = "../team-icons/Cleveland-Browns.png"
    if (imageName == "Pittsburgh Steelers")
        var imageName = "../team-icons/Pittsburgh Steelers.png"
    if (imageName == "Denver Broncos")
        var imageName = "../team-icons/Denver-Broncos.png"
    if (imageName == "Seattle Seahawks")
        var imageName = "../team-icons/Seattle-Seahawks.png"
    if (imageName == "Green Bay Packers")
        var imageName = "../team-icons/Green-Bay-Packers.png"
    if (imageName == "Chicago Bears")
        var imageName = "../team-icons/Chicago-Bears.png"
    if (imageName == "Indianapolis Colts")
        var imageName = "../team-icons/Indianapolis-Colts.png"
    if (imageName == "Cincinnati Bengals")
        var imageName = "../team-icons/Cincinnati-Bengals.png"
    if (imageName == "Los Angeles Chargers")
        var imageName = "../team-icons/Los-Angeles-Chargers.png"
    if (imageName == "Kansas City Chiefs")
        var imageName = "../team-icons/Kansas-City-Chiefs.png"
    if (imageName == "Miami Dolphins")
        var imageName = "../team-icons/Miami-Dolphins.png"
    if (imageName == "Tennessee Titans")
        var imageName = "../team-icons/Tennessee-Titans.png"
    if (imageName == "Minnesota Vikings")
        var imageName = "../team-icons/Minnesota-Vikings.png"
    if (imageName == "San Francisco 49ers")
        var imageName = "../team-icons/San-Francisco-49ers.png"
    if (imageName == "New England Patriots")
        var imageName = "../team-icons/New-England-Patriots.png"
    if (imageName == "Houston Texans")
        var imageName = "../team-icons/Houston-Texans.png"
    if (imageName == "New Orleans Saints")
        var imageName = "../team-icons/New-Orleans-Saints.png"
    if (imageName == "Tampa Bay Buccaneers")
        var imageName = "../team-icons/Tampa-Bay-Buccaneers.png"
    if (imageName == "New York Giants")
        var imageName = "../team-icons/New-York-Giants.png"
    if (imageName == "Jacksonville Jaguars")
        var imageName = "../team-icons/Jacksonville-Jaguars.png"
    if (imageName == "Detroit Lions")
        var imageName = "../team-icons/Detroit-Lions.png"
    if (imageName == "New York Jets")
        var imageName = "../team-icons/New-York-Jets.png"
    if (imageName == "Oakland-Raiders")
        var imageName = "../team-icons/Oakland-Raiders.png"
    if (imageName == "Los Angeles Rams")
        var imageName = "../team-icons/Los-Angeles-Rams.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"
    if (imageName == "Atlanta Falcons")
        var imageName = "../team-icons/eagles.png"

    return imageName
  }

  render() {
//    console.log(this.state.results)
    const { predicted_results, auth} = this.props;
//    console.log({predicted_results}.predicted_results)
 //   console.log()
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

    if (this.state.predicted_results === undefined){
        return <div> Loading </div>
    }

    else
    {
        console.log(this.state.predicted_results)
    
    return(
        /*general home page container*/
        <div className="predictor container" class="row">

            {/*rest of the page container*/}
            <div class="col-lg-12 container row">
                {/*icon for the hometeam logo*/}

                {

                    <div> 
                        {

                        this.state.predicted_results && this.state.predicted_results.map((result, index) => {
                            if(result.schedule_week == this.state.week && index == this.state.teamIndex){
                              return (
                                <div className="col-lg-12 header-team-container row">
                                    <div className="col-lg-6 team-container icon">
                                      <div className="card center predictor-team-header row">
                                        <div> {result.team_home} </div>
                                        <div className="predictor-image-container"><img src={this.handleImage(result.team_home)} alt="team" class="home-team-image" /></div>
                                        <hr></hr>
                                        <div> Home </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-6 team-container icon">
                                      <div className="card center predictor-team-header row">
                                        <div> {result.team_away} </div>
                                        <div className="predictor-image-container"><img src={this.handleImage(result.team_away)} alt="team" class="home-team-image" /></div>
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
                                    <option value=""  selected>Choose Team Match Up</option>
                                {
                                this.state.predicted_results && this.state.predicted_results.map((result,index) => {
                                    if(result.schedule_week == this.state.week){
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
                                this.state.predicted_results && this.state.predicted_results.map((result, index) => {
                                    if(result.schedule_week == this.state.week && index == this.state.teamIndex){
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
                                                    <div className="col-lg-5" >Predicted Result: <br></br> {result.predicted_result == 0 ? 'Away Team Wins' : 'Home Team Wins'} </div>
                                                    <div className="col-lg-5" >Actual Result: <br></br>{result.full_result == 0 ? 'Away Team Wins' : 'Home Team Wins'} </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
    }
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
