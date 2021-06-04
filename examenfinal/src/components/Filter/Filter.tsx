import React, {FC, useState} from "react"
import "./Filter.css"

interface FilterProps{
    changeCharacter: Function;
}

const Filter: FC<FilterProps> = (props) => {
    const [character, setCharacter] = useState<string>("")

    return (
        <div className="FilterContainer">
            <input className="InputText" type="text" placeholder="Type the name of a character" value={character} 
            onChange={(e) => setCharacter(e.target.value)}/>
            <button className="search" onClick={() => {
                if(character != "") {
                    props.changeCharacter(character);
                    setCharacter("")
                }
            }}>Find</button>
        </div>
    )
}

export default Filter