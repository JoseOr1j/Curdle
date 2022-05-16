/*App*/
import './App.css';
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import { createContext, useEffect, useState } from "react";
import GameOver from './components/GameOver';
// ./'Words' it gives me an error so I changed it

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false, 
    guessed: false
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    })
  }, []) 
  
  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos >4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos+1});
  }
  
  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++){ 
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word Not Found");
    }

    if(currWord === correctWord ) {
      setGameOver({gameOver: true, guessed: true})
      return;
    }

    if(currAttempt.attempt == 5) 
    {
       setGameOver({gameOver: true, guessed: false})
    }

  };

  
  return (
    <div className="App"> 
    <nav>
      <h1>
        Curdle
      </h1>
    </nav>
    <AppContext.Provider value = {{board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters, setGameOver, gameOver }}>
      <div className = "game"> 
      <Board />
      {gameOver.gameOver ? <GameOver/> : <Keyboard />}
      </div>
    </AppContext.Provider>

    </div>
  );
}

export default App;
