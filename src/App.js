import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState();
  const [range, setRange] = useState(6);
  const [number, setNumber] = useState(false);
  const [Character, setCharacter] = useState(false);
  const passwordRef=useRef(null);

  let passwordCopy =useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);

  },[password])

  let passwordGenerator = useCallback(() => {
    let letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) letter += "0123456789";
    if (Character) letter += "!@#$%&^_+-/|?><*";
    let pass = "";
    for (let i = 0; i < range; i++) {
      pass += letter[Math.floor(Math.random() * letter.length)];
    }
    setPassword(pass);
  }, [range, number, Character, setPassword]);
  
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <>
      <div className="App-header">
        <h1 className="">Password for Length {range}</h1>
        <div>
          <input
            id="password"
            className="button"
            value={password}
            type="text"
            readOnly
          ref={passwordRef}
          />
          <button id="button" onClick={passwordCopy}>Copy</button>
        </div>
        <div>
          <div className="slidecontainer">
           Range : 6 TO 20 <input
              type="range"
              min="6"
              max="20"
              value={range}
              className="slider"
              id="myRange"
              onChange={(e) => setRange(e.target.value)}
            /> 
            {range}
            <input
              type="checkbox"
              value={number}
              onChange={(prevValue) => {
                setNumber((prevValue) => !prevValue);
              }}
            />
            : Number
            <input
              type="checkbox"
              value={Character}
              onChange={(prevValue) => {
                setCharacter((prevValue) => !prevValue);
              }}
            />{" "}
            : Character
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
