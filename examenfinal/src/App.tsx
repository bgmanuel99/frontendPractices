import React, {FC, useState} from "react"
import './App.css';
import Text from "./components/Text/Text"
import Filter from "./components/Filter/Filter"

function App() {
  const [character, setCharacter] = useState<string>("")
  const [token, setToken] = useState<string>("")
  const [tokenValue, setTokenValue] = useState<string>("")

  const changeCharacter = (charac: string) => {
    setCharacter(charac)
  }

  return (
    <div className="App">
      <Filter changeCharacter={changeCharacter}></Filter>
      <Text character={character} token={token}></Text>
      <input className="InputToken" type="text" placeholder="Insert Token" value={tokenValue}
        onChange={(e) => {
          setTokenValue(e.target.value)
      }}/>
      <button className="ButtonToken" onClick={() => {
        if(tokenValue !== "") {
            setToken(tokenValue)
            setTokenValue("")
        }
      }}>Insert</button>
    </div>
  );
}

export default App;
