import React from 'react'

const Logobar = function(props) {

  return (
    //used materialize css library for these classes

    <nav className="nav-wrapper white darken-3">
      <div className = "logo">

        {/*link to the logo*/}
        <img src="../homepage/logo.png" alt="logo" width="350" class=" responsive-img" />

      </div>

    </nav>
  )
}


export default Logobar
