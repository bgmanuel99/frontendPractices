import React, {FC, useEffect, useState} from "react"
import "./Filter.css"
import axios from "axios"

interface FilterProps {
    changeOnFilter: Function;
    changeNext: Function;
    changePrev: Function;
}

const Filter: FC<FilterProps> = (props) => {
    return (
        <div className="top">
            <input type="text" className="filter" placeholder="Libro" onChange={(e) => props.changeOnFilter(e.target.value)}/>
            <div className="prev" onClick={(e) => props.changePrev(-1)}>&#10094; Previous page</div>
            <div className="next" onClick={(e) => props.changeNext(1)}>Next page &#10095;</div>
        </div>
    )
}

export default Filter