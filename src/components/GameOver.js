import React, { useContext } from 'react'
import { AppContext } from '../App'

function GameOver() {
    const {currAttempt, gameOver, correctWord} = useContext(AppContext);
    return (
        <div class='gameOver'>
            <h3>{gameOver.guessed ? "Correctly Guessed" : "You Failed"}</h3>
            <h1>Correct: {correctWord}</h1>
            {gameOver.guessed && (<h3>You guessed in {currAttempt.attempt} attempts</h3>)}
        </div>

    )
}

export default GameOver