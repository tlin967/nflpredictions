

import React from 'react'

const Footer = function(props) {

  return (
    //used materialize css library for these classes
    <footer class="page-footer red darken-2 z-depth 5">
     <div class="container">
       <div class="row">
         <div class="col l6 s12">
           <h5 class="black-text">Footer Content</h5>
           <p class="black-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
         </div>
         <div class="col l4 offset-l2 s12">
           <h5 class="black-text">Links</h5>
           <ul>
             <li><a class="black-text text-lighten-3" href="#!">Link 1</a></li>
             <li><a class="black-text text-lighten-3" href="#!">Link 2</a></li>
             <li><a class="black-text text-lighten-3" href="#!">Link 3</a></li>
             <li><a class="black-text text-lighten-3" href="#!">Link 4</a></li>
           </ul>
         </div>
       </div>
     </div>

     <div class="footer-copyright">
       <div class="container black-text text-lighten-3">
       © 2018 Copyright Text
       <a class="black-text text-lighten-4 right" href="#!">More Links</a>
       </div>
     </div>
   </footer>


  )
}


export default Footer
