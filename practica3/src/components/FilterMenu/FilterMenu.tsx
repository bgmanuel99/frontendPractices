import React, {FC} from "react"
import "./FilterMenu.css"

interface FilterMenuProps {
    changeOrder: Function;
    changeFilter: Function;
}

const FilterMenu: FC<FilterMenuProps> = (props) => {
    return (
        <div className="filterMenuContainer">
            <input type="text" className="filter" placeholder="Filter by name" onChange={(e) => props.changeFilter(e.target.value)}></input>
            <div className="apiNormalResponse" onClick={() => props.changeOrder("normal")}>API normal response</div>
            <div className="descAlphaOrder" onClick={() => props.changeOrder("descAlphaOrder")}>Descending alphabetical order</div>
            <div className="ascAlphaOrder" onClick={() => props.changeOrder("ascAlphaOrder")}>Ascending alphabetical order</div>
        </div>
    )
}

export default FilterMenu