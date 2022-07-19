/*Board*/
import React from 'react';
import Letter from "./Letter";

// if issue of ../ appears just change the dots bc of the file hierarchy

function Board7() 
{
return (
    <div className = "board">
  <div className="row">
      <Letter letterPos = {0} attemptVal = {0}/>
      <Letter letterPos = {1} attemptVal = {0}/>
      <Letter letterPos = {2} attemptVal = {0}/>
      <Letter letterPos = {3} attemptVal = {0}/>
      <Letter letterPos = {4} attemptVal = {0}/>
      <Letter letterPos = {5} attemptVal = {0}/>
      <Letter letterPos = {6} attemptVal = {0}/>
    </div>

  <div className="row"> 
      <Letter letterPos = {0} attemptVal = {1}/>
      <Letter letterPos = {1} attemptVal = {1}/>
      <Letter letterPos = {2} attemptVal = {1}/>
      <Letter letterPos = {3} attemptVal = {1}/>
      <Letter letterPos = {4} attemptVal = {1}/>
      <Letter letterPos = {5} attemptVal = {1}/>
      <Letter letterPos = {6} attemptVal = {1}/>{""}
  </div>

  <div className="row"> 
      <Letter letterPos = {0} attemptVal = {2}/>
      <Letter letterPos = {1} attemptVal = {2}/>
      <Letter letterPos = {2} attemptVal = {2}/>
      <Letter letterPos = {3} attemptVal = {2}/>
      <Letter letterPos = {4} attemptVal = {2}/>
      <Letter letterPos = {5} attemptVal = {2}/>
      <Letter letterPos = {6} attemptVal = {2}/>
    </div>

  <div className="row"> 
      <Letter letterPos = {0} attemptVal = {3}/>
      <Letter letterPos = {1} attemptVal = {3}/>
      <Letter letterPos = {2} attemptVal = {3}/>
      <Letter letterPos = {3} attemptVal = {3}/>
      <Letter letterPos = {4} attemptVal = {3}/>
      <Letter letterPos = {5} attemptVal = {3}/>
      <Letter letterPos = {6} attemptVal = {3}/>
    </div>

  <div className="row"> 
      <Letter letterPos = {0} attemptVal = {4}/>
      <Letter letterPos = {1} attemptVal = {4}/>
      <Letter letterPos = {2} attemptVal = {4}/>
      <Letter letterPos = {3} attemptVal = {4}/>
      <Letter letterPos = {4} attemptVal = {4}/>
      <Letter letterPos = {5} attemptVal = {4}/>
      <Letter letterPos = {6} attemptVal = {4}/>
    </div>

  <div className="row"> 
      <Letter letterPos = {0} attemptVal = {5}/>
      <Letter letterPos = {1} attemptVal = {5}/>
      <Letter letterPos = {2} attemptVal = {5}/>
      <Letter letterPos = {3} attemptVal = {5}/>
      <Letter letterPos = {4} attemptVal = {5}/>
      <Letter letterPos = {5} attemptVal = {5}/>
      <Letter letterPos = {6} attemptVal = {5}/>
  </div>

  </div>
);

}

export default Board7;

/*
["w", "o", "r", "d", "l", "e"] matrix board structure 
*/