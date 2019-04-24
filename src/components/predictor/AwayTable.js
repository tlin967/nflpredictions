import React from 'react'

const AwayTable = function() {
  return (
    //drop down table that will hold all away teams
    <div class="input-field" classname="away-team container">
      <select class="browser-default" name="awayteam">
        <option value="" disabled selected>Choose Away Team</option>
        <option value="1">San Francisco - 49er's</option>
        <option value="2">Oakland - Raiders</option>
        <option value="3">Green Bay - Packers</option>
      </select>
    </div>

  )
}

export default AwayTable
