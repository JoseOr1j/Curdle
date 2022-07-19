// download dszna (ES7+ extension to use rfce to make auto import functions)
import React, {useContext, useCallback, useEffect} from 'react';
import {AppContext} from '../App';
import Key from "./Key";

function Keyboard() {
  const { onEnter, onDelete, onSelectLetter, disabledLetters } = useContext(AppContext);
  //Each row of the keyboard is represented as an array
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];//Each line for each row of the keyboard




  const handleKeyboard = useCallback((event) =>  {
    if (event.key === "Enter" ){
      onEnter();
    }
    else if(event.key ==="Backspace"){
      onDelete();
    }
    else{
      keys1.forEach((key) => {
        if (event.key.toLowerCase()===key.toLowerCase()){
          onSelectLetter(key)
        }
      })
      keys2.forEach((key) => {
        if (event.key.toLowerCase()===key.toLowerCase()){
          onSelectLetter(key)
        }
      })
      keys3.forEach((key) => {
        if (event.key.toLowerCase()===key.toLowerCase()){
          onSelectLetter(key)
        }
      })
    }
  })




  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard])
  
  return (
    <div className = "keyboard" onKeyDown = {handleKeyboard}>
      <div className = "line1">
        {keys1.map((key) => {
        return <Key keyVal = {key} disabled = {disabledLetters.includes(key)} />;
      })}
      </div>
      <div className = "line2">
      {keys2.map((key) => {
        return <Key keyVal = {key} disabled = {disabledLetters.includes(key)} />; 
      })}
      </div>
      <div className = "line3">
        <Key keyVal = {"ENTER"} bigKey/>
      {keys3.map((key) => {
        return <Key keyVal = {key} disabled = {disabledLetters.includes(key)} />;
      })}
      <Key keyVal = {"DELETE"} bigKey/>
      </div>
    </div>
  )
}

export default Keyboard
