import React, {useState, useEffect, FC} from 'react'
import './App.css'
import Text from "./components/Text/Text"

function App() {

    const [bookName, setBookName] = useState<string>("")
    const [bookValue, setBookValue] = useState<string>("")
    const [authorName, setAuthorName] = useState<string>("")
    const [authorValue, setAuthorValue] = useState<string>("")
    const [showPages, setShowPages] = useState<boolean>(false)
    var [page, setPage] = useState<number>(0)
    const [numberOfPages, setNumberOfPages] = useState<number>(0)
    const [fileAndColumnsGrid, setFileAndColumnsGrid] = useState<number>(1)
    const [fileGrid, setFileGrid] = useState<number>(0)
    const [sortAZ, setSortAZ] = useState<number>(0)
    const [sortZA, setSortZA] = useState<number>(0)
    const [sortUp, setSortUp] = useState<number>(0)
    const [sortDown, setSortDown] = useState<number>(0)
    const [typeOfGrid, setTypeOfGrid] = useState<number>(0)
    const [typeOfSort, setTypeOfSort] = useState<string>("normal")
    const [resetData, setResetData] = useState<boolean>(false)

    const showPagesButton = (show: boolean) => {
        setShowPages(show)
    }

    const changePage = (newPage: number) => {
        if(newPage === -1 && page !== 0) setPage(page += newPage)
        else if(newPage === 1 && page !== (numberOfPages-1)) setPage(page += newPage)
    }

    const changeNumberOfPages = (newNumberOfPages: number) => {
        setNumberOfPages(newNumberOfPages)
    }

    const changeResetData = () => {
        setResetData(false)
    }

    return (
        <div className="App">
            <div className="filter">
                <button className="filesAndColumns" value={fileAndColumnsGrid} onClick={(e) => {
                    setFileGrid(0)
                    setFileAndColumnsGrid(1)
                    setTypeOfSort("normal")
                    setSortAZ(0)
                    setSortZA(0)
                    setSortUp(0)
                    setSortDown(0)
                    setTypeOfGrid(0)
                }}>
                    <div className="filesAndColumnsGrid"></div>
                </button>
                <button className="files" value={fileGrid} onClick={(e) => {
                    setFileGrid(1)
                    setFileAndColumnsGrid(0)
                    setTypeOfSort("normal")
                    setTypeOfGrid(1)
                }}>
                    <div className="filesGrid"></div>
                </button>
                {fileGrid === 1 && <button className="sortAZ" value={sortAZ} onClick={(e) => {
                    setSortAZ(1)
                    setSortZA(0)
                    setSortUp(0)
                    setSortDown(0)
                    setTypeOfSort("sortAZ")
                }}>
                    <div className="sortAZIcon"></div>
                </button>}
                {fileGrid === 1 && <button className="sortZA" value={sortZA} onClick={(e) => {
                    setSortAZ(0)
                    setSortZA(1)
                    setSortUp(0)
                    setSortDown(0)
                    setTypeOfSort("sortZA")
                }}>
                    <div className="sortZAIcon"></div>
                </button>}
                {fileGrid === 1 && <button className="sortUp" value={sortUp} onClick={(e) => {
                    setSortAZ(0)
                    setSortZA(0)
                    setSortUp(1)
                    setSortDown(0)
                    setTypeOfSort("sortUp")
                }}>
                    <div className="sortUpIcon"></div>
                </button>}
                {fileGrid === 1 && <button className="sortDown" value={sortDown} onClick={(e) => {
                    setSortAZ(0)
                    setSortZA(0)
                    setSortUp(0)
                    setSortDown(1)
                    setTypeOfSort("sortDown")
                }}>
                    <div className="sortDownIcon"></div>
                </button>}
                <input className="inputBook" type="text" placeholder="Find a book by name..." value={bookValue} onChange={(e) => {
                    if(authorValue === "") setBookValue(e.target.value)
                }}/>
                <input className="inputAuthor" type="text" placeholder="Find a book by author..." value={authorValue} onChange={(e) => {
                    if(bookValue === "") setAuthorValue(e.target.value)
                }}/>
                <button className="findBook" onClick={(e) => {
                    setResetData(true)
                    if(bookValue !== "") {
                        setAuthorName("")
                        setBookName(bookValue)
                    }else if(authorValue !== ""){
                        setBookName("")
                        setAuthorName(authorValue)
                    }
                    setBookValue("")
                    setAuthorValue("")
                    setPage(0)
                }}>Find</button>
                {showPages && <div className="prev" onClick={(e) => changePage(-1)}>Prev</div>}
                {showPages && <p className="pageNumber">{page+1}</p>}
                {showPages && <div className="next" onClick={(e) => changePage(1)}>Next</div>}
            </div>
            <Text bookName={bookName} authorName={authorName} page={page} showPageButtons={showPagesButton} changeNumberOfPages={changeNumberOfPages}
            typeOfGrid={typeOfGrid} typeOfSort={typeOfSort} resetData={resetData} changeResetData={changeResetData}></Text>
        </div>
    );
}

export default App;
