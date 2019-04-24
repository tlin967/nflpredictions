import React from 'react'


const HomeTable = function() {

  return (
    //drop down table that will hold all possible home teams
      <div class="input-field" classname="home-team container">
        <select class="browser-default" name="hometeam">
          <option value="" disabled selected>Choose Home Team</option>
          <option value="1">San Francisco - 49er's</option>
          <option value="2">Oakland - Raiders</option>
          <option value="3">Green Bay - Packers</option>
        </select>
      </div>
  )
}

export default HomeTable
