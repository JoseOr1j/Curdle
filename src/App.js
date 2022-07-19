/*App*/
import './App.css';
import Board5 from "./components/Board5";
import Board6 from "./components/Board6";
import Board7 from "./components/Board7";
import Keyboard from "./components/Keyboard";
import Auth from "./components/auth";
import { boardDefault, generateWordSet } from "./Words";
import { createContext, useEffect, useState } from "react";
import GameOver from './components/GameOver';
import { useUserContext } from './context/userContext';
import { logout } from "./firebase";
import enterword from './classes/custwords';
import handle from './classes/stats-handler';
import LeaderBoard from './components/Leaderboard';
import CustomHistory from './components/CustomHistory';
import Stats from './components/Stats';
import { db } from './firebase';
// ./'Words' it gives me an error so I changed it

export const AppContext = createContext();

// dynamic word size variable
window.wordSize = window.location.pathname.split('/')[1];
if (window.wordSize === '') {
  window.wordSize = 5;
}
console.log(window.wordSize);

function App() {
  const { user, loading, error, logoutUser } = useUserContext();
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessed: false
  });
  const [displayLeaderBoard, setDisplayLeaderBoard] = useState({ displayLeaderBoard: false, });
  const [displayStats, setDisplayStats] = useState({ displayStats: false, });
  const [displayBoard, setDisplayBoard] = useState({ displayBoard: true });
  const [displayInputField, setDisplayInputField] = useState({ displayInputField: false });
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const {collection, getDocs, query, where} = require('firebase/firestore');

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    })
  }, [])

  const handleLeaderBoardButtonClick = () => {
    setDisplayLeaderBoard({ displayLeaderBoard: !displayLeaderBoard.displayLeaderBoard });
    setDisplayStats({ displayStats: false });
    setDisplayInputField({ displayInputField: false });
    console.log(displayLeaderBoard);
    console.log(displayStats);
    console.log(displayBoard);
    if (!displayLeaderBoard.displayLeaderBoard)
      setDisplayBoard({ displayBoard: false });
    else
      setDisplayBoard({ displayBoard: true });
  }
  const handleStatButtonClick = () => {
    setDisplayLeaderBoard({ displayLeaderBoard: false });
    setDisplayStats({ displayStats: !displayStats.displayStats });
    setDisplayInputField({ displayInputField: false });
    if (!displayStats.displayStats)
      setDisplayBoard({ displayBoard: false });
    else
      setDisplayBoard({ displayBoard: true });
  }

  const handleInputFieldButtonClick = () => {
    setDisplayLeaderBoard({ displayLeaderBoard: false });
    setDisplayStats({ displayStats: false });
    setDisplayInputField({ displayInputField: !displayInputField.displayInputField });
    if (!displayInputField.displayInputField)
      setDisplayBoard({ displayBoard: false });
    else
      setDisplayBoard({ displayBoard: true });
  }

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > window.wordSize - 1) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  }

  const onEnter = () => {
    console.log(correctWord);
    if (currAttempt.letterPos != window.wordSize) return;

    let currWord = "";
    for (let i = 0; i < window.wordSize; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word Not Found");
      return;
    }
    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessed: true })
      handle(user.uid, true, user.displayName);
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessed: false })
      handle(user.uid, false, user.displayName);
    }
    console.log(gameOver);
  };

  function renderBoard() {
    if (window.wordSize == 5)
      return <Board5 />;
    if (window.wordSize == 6)
      return <Board6 />;
    if (window.wordSize == 7)
      return <Board7 />;
    return null;
  }
  const board_name = renderBoard();

  async function handleLogout() {

    try {
      await logout();
    } catch {
      alert("Error!");
    }

  }

  // async function handleSubmit(submission) {
  //   enterword(user.uid, "lakes");
  //   return;
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.length != 5 && name.length != 6 && name.length != 7) {
      alert("Please enter a word that is 5, 6, or 7 letters in length");
    }
    else {
      enterword(user.uid, name);
      console.log("SUCCESS");
    }
  }

  const getCustom = async(event) => {
    event.preventDefault();
    if (code.length != 5)
    {
      alert("Please enter a valid code.");
    }
    else
    {
      const wordsRef = collection(db, "customwords");
      const q = query(wordsRef, where("hashid", "==", code));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
      {
          alert("Please enter a valid code.");
      }
      else
      {
          querySnapshot.forEach((w) => {
              const word = w.data()['word'];
              const board_size = word.length;
              setDisplayInputField({ displayInputField: !displayInputField.displayInputField });
              setDisplayBoard({ displayBoard: true });
              window.wordSize = board_size;
              setCorrectWord(word);
              console.log(word);
              generateWordSet().then((words) => {
                setWordSet(words.wordSet);
              });
          });
      }
    }
  }

  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? <>
        <nav>
          <div class="btn-toolbar">
            <div class="btn-group">
              <button3 class="fancy-btn btn-1" onClick={handleLogout}><span>Log Out</span></button3>
              {displayInputField.displayInputField ? <button3 class="fancy-btn btn-0" onClick={handleInputFieldButtonClick}>X</button3>
                : <button3 class="fancy-btn btn-2" onClick={handleInputFieldButtonClick}><span>Custom</span></button3>}
              <h2 class="divider">
                {user.displayName}'s Curdle
              </h2>
            </div>

            <div class="btn-group btn-group-style-2">
              {displayLeaderBoard.displayLeaderBoard ? <button3 class="fancy-btn btn-0" onClick={handleLeaderBoardButtonClick}>X</button3>
                : <button3 class="fancy-btn btn-2" onClick={handleLeaderBoardButtonClick}><span>Leaderboard</span></button3>}
              {displayStats.displayStats ? <button3 class="fancy-btn btn-0" onClick={handleStatButtonClick}>X</button3>
                : <button3 class="fancy-btn btn-2" onClick={handleStatButtonClick}><span>Stats</span></button3>}
            </div>
          </div>
        </nav>
        <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters, setGameOver, gameOver }}>
          <div className="game">

            {displayBoard.displayBoard ? <div class="btn-group">
              <a href="http://localhost:3000/5">
                <button2>5 Letter</button2>
              </a>
              <a href="http://localhost:3000/6">
                <button2>6 Letter</button2>
              </a>
              <a href="http://localhost:3000/7">
                <button2>7 Letter</button2>
              </a>
            </div> : null}

            {displayLeaderBoard.displayLeaderBoard ? <LeaderBoard /> : null}
            {displayStats.displayStats ? <Stats uid={user.uid} /> : null}
            {displayBoard.displayBoard ? board_name : null}
            {displayBoard.displayBoard ? (gameOver.gameOver ? <GameOver /> : <Keyboard />) : null}
            {/* Submit custom words text field */}
            {displayInputField.displayInputField ? <form onSubmit={handleSubmit}>
              <br></br>
              <label>
                <input
                  placeholder="5-7 Letter Word"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <input type="submit" />
            </form>
              : null}
            {/* Enter game code text field */}
            {displayInputField.displayInputField ? <form onSubmit={getCustom}>
              <br></br>
              <br></br>
              <br></br>
              <label>
                <input
                  placeholder="Enter your code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </label>
              <input type="submit" />
            </form>
              : null}
            {displayInputField.displayInputField ? <CustomHistory uid = {user.uid}/> : null}
          </div>
        </AppContext.Provider></>
        : <Auth />} </>}
    </div>
  );

}
export default App;
