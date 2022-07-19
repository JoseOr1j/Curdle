/*Letter component*/
import React, {useContext, useEffect} from 'react';
import {AppContext} from '../App';

function Letter({letterPos, attemptVal}) {
  const{board, correctWord, currAttempt, setDisabledLetters} = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  // accesses each individual letter

  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);

  const letterState = 
    currAttempt.attempt > attemptVal && 
    (correct ? "correct" : almost ? "almost" : "error");

    useEffect(() => {
      if(letter !== "" && !correct && !almost){
        setDisabledLetters((prev) => [...prev, letter]);
      }
    }, [currAttempt.attempt]);

  return <div className = "letter" id={letterState}> {letter}</div>;
  // shows letter text
}

export default Letter;