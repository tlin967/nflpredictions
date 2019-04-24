import React from 'react'
import { Link } from 'react-router-dom'

//receives teams that was passed
const TeamTable = ({teams}) => {
  return (

    //drop down table that will hold all teams
    <div className="team-container">

      <table className="centered highlight">

        <thead>
          <tr>
              <th>Team Name</th>
              <th>Location</th>
              <th>Ranking</th>
              <th>Number of Games Played</th>
          </tr>
        </thead>

        {teams && teams.map(team => {
          return (

              <thead key={team.id}>
                <tr>
                <Link to={'/team/' + team.id}>
                    <th>{team.name}</th>
                </Link>
                    <th>{team.location}</th>
                    <th>{team.ranking}</th>
                    <th>{team.gamesPlayed}</th>
                </tr>
              </thead>
          )
        })}

      </table>
    </div>

  )
}

export default TeamTable
