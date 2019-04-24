//create initial state
const initState = {
  teams: [
    {id: '1', teamName: "Oakland Raiders", score:"12-1"},
    {id: '2', teamName: "Greenbay Packers", score:"1-3"},
    {id: '3', teamName: "San Francisco 49ers", score:"11-1"}

  ]
}

//create reducer for authentication, passing in initial state of reducer
const teamReducer = (state = initState, action) => {
  return state
}

export default teamReducer
