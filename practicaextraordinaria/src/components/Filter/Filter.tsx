import React, {FC, useState} from "react"
import "./Filter.css"

interface FilterProps {
    changeCountry: Function;
    changeCity: Function;
}

const Filter: FC<FilterProps> = (props) => {
    const [countryValue, setCountryValue] = useState<string>("")
    const [cityValue, setCityValue] = useState<string>("")
    return (
        <div className="FilterContainer">
            <input className="countryInput" type="text" placeholder="Find a country" value={countryValue} onChange={(e) => {
                if(cityValue === "") setCountryValue(e.target.value)
            }}/>
            <input className="cityInput" type="text" placeholder="Find a city" value={cityValue} onChange={(e) => {
                if(countryValue === "") setCityValue(e.target.value)
            }}/>
            <button className="findFilter" onClick={(e) => {
                if(countryValue !== "") {
                    props.changeCountry(countryValue)
                    setCountryValue("")
                }else{
                    props.changeCity(cityValue)
                    setCityValue("")
                }
            }}>Find</button>
        </div>
    )
}

export default Filter