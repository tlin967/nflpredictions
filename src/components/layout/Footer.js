

import React from 'react'

const Footer = function(props) {

  return (
    //used materialize css library for these classes
    <footer class="page-footer darken-2 z-depth 5">
     <div class="container">
       <div class="row">
         <div class="col l6 s12">
           <h5 class="black-text"><strong>About Us</strong></h5>
           <p class="black-text text-lighten-4">NFL Predictions is a community based resource, tasked to provide the community and fanatics-alike, information on the upcoming NFL seasons.</p>
         </div>
         <div class="col l4 offset-l2 s12">
           <h5 class="black-text"><strong>Links</strong></h5>
           <ul>
             <li><a class="black-text text-lighten-3" href="/">Home</a></li>
             <li><a class="black-text text-lighten-3" href="/predictor">Predictor</a></li>
             <li><a class="black-text text-lighten-3" href="/signup">Sign Up</a></li>
           </ul>
         </div>
       </div>
     </div>

     <div class="footer-copyright">
       <div class="container black-text text-lighten-3">
       © 2018 NFL Predictions
       </div>
     </div>
   </footer>


  )
}


export default Footer
