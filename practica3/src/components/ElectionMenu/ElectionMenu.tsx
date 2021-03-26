import React, {FC} from "react"
import "./ElectionMenu.css"

interface ElectionMenuProps {
    changeData: Function;
}

const ElectionMenu: FC<ElectionMenuProps> = (props) => {
    return (
        <div className="container">
            <div className="options people" onClick={() => props.changeData("https://swapi.dev/api/people/?page=1")}>People</div>
            <div className="options planets" onClick={() => props.changeData("https://swapi.dev/api/planets/?page=1")}>Planets</div>
            <div className="options films" onClick={() => props.changeData("https://swapi.dev/api/films/?page=1")}>Films</div>
        </div>
    )
}

export default ElectionMenu