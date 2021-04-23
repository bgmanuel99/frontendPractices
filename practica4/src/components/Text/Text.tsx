import React, {FC, useState, useEffect} from "react"
import axios from "axios"
import "./Text.css"
import ClipLoader from "react-spinners/ClipLoader"

interface TextProps {
    bookName: string;
    authorName: string;
    showPageButtons: Function;
    changeNumberOfPages: Function;
    page: number;
    typeOfGrid: number;
    typeOfSort: string;
    resetData: boolean;
    changeResetData: Function;
}

interface Book {
    title: string;
    author_name: string[];
    publish_year: number[];
    isbn: string[];
    id_amazon: string[];
}

interface Info {
    numFound: number;
    start: number;
    docs: Book[];
}

const Text: FC<TextProps> = (props) => {

    const [info, setInfo] = useState<Info>()
    const [data, setData] = useState<Book[]>([])
    const [auxData, setAuxData] = useState<Book[]>([])
    const [finalData, setFinalData] = useState<Book[][]>([])
    var [page, setPage] = useState<number>(1)
    const [charging, setCharging] = useState<boolean>(false)
    const [resetPage, setResetPage] = useState<boolean>(true)
    const [gridClass, setGridClass] = useState<string>("textContainer")
    const [reSort, setResort] = useState<boolean>(false)

    useEffect(() => {
        if(props.bookName !== ""){
            if(resetPage) {
                setResetPage(false)
                setPage(1)
            }
            setCharging(true)
            props.showPageButtons(false)
            var nextPage: string = ""
            for(var i = 0; i < props.bookName.length; i++) {
                if(props.bookName.charAt(i) !== " ") nextPage += props.bookName.charAt(i)
                else nextPage += "+"
            }
            axios.get("http://openlibrary.org/search.json?q="+nextPage+"&page="+page).then((response) => {
                setInfo(response.data)
            })
        }
    }, [props.bookName, page])

    useEffect(() => {
        if(props.authorName !== "") {
            if(resetPage) {
                setResetPage(false)
                setPage(1)
            }
            setCharging(true)
            props.showPageButtons(false)
            var separateAuthorName: string = ""
            for(var i = 0; i < props.authorName.length; i++) {
                if(props.authorName.charAt(i) !== " ") separateAuthorName += props.authorName.charAt(i)
                else separateAuthorName += "+"
            }
            axios.get("http://openlibrary.org/search.json?author="+separateAuthorName+"&page="+page).then((response) => {
                setInfo(response.data)
            })
        }
    }, [props.authorName, page])

    useEffect(() => {
        if(info !== null) chargeData()
    }, [info])

    const chargeData = () => {
        const newData: Book[] = data
        info?.docs.forEach((book: Book) => {
            newData?.push(book)
        })

        setData(newData)
        if(Math.ceil(info?.numFound!/100) > page) setPage(page+=1)
        else {
            if(auxData?.length === 0) setAuxData(data)
            setResort(!reSort)
        }
    }

    useEffect(() => {
        if(data.length !== 0){
            if(props.typeOfSort === "normal") {
                if(auxData.length !== 0) setData(auxData)
            }else if(props.typeOfSort === "sortAZ") {
                const titles: string[] = data.map((book: any) => {
                    if(book) return book.title
                })
                const sortTitles: string[] = titles.sort()
                const parsedTitles: Book[] = sortTitles.map((title: string) => data.find((book: any) => {
                    if(book) return title === book.title
                })!)
                setData(parsedTitles)
            }else if(props.typeOfSort === "sortZA") {
                const titles: string[] = data.map((book: any) => {
                    if(book) return book.title
                })
                const sortTitles: string[] = titles.sort().reverse()
                const parsedTitles: Book[] = sortTitles.map((title: string) => data.find((book: any) => {
                    if(book) return title === book.title
                })!)
                setData(parsedTitles)
            }else if(props.typeOfSort === "sortUp") {
                const years: number[] = data.map((book: any) => {
                    if(book && book.publish_year) return book.publish_year[0]
                })
                const sortYears: number[] = years.sort()
                const parsedYears: Book[] = sortYears.map((year: number) => data.find((book: any) => {
                    if(book && book.publish_year) return year === book.publish_year[0]
                })!)
                setData(parsedYears)
            }else if(props.typeOfSort === "sortDown") {
                const years: number[] = data.map((book: any) => {
                    if(book && book.publish_year) return book.publish_year[0]
                })
                const sortYears: number[] = years.sort().reverse()
                const parsedYears: Book[] = sortYears.map((year: number) => data.find((book: any) => {
                    if(book && book.publish_year) return year === book.publish_year[0]
                })!)
                setData(parsedYears)
            }
            divideData()
        }
    }, [props.typeOfSort, reSort])

    const divideData = () => {
        if(data?.length !== 0) {
            var newData: Book[][] = []
            var auxData: Book[] = []
    
            var j = 0;
            for(var i = 0; i < data.length; i++) {
                if(j > 19) {
                    j = 0
                    newData.push(auxData)
                    auxData = []
                }
    
                auxData.push(data[i])
                j++
                if(i === data.length-1) newData.push(auxData)
            }
    
            setFinalData(newData)
            props.changeNumberOfPages(newData.length)
            props.changeResetData()
            setResetPage(true)
            setCharging(false)
            props.showPageButtons(true)
        }
    }

    useEffect(() => {
        if(props.typeOfGrid === 0) {
            setResort(!reSort)
            setGridClass("textContainer")
        }else if(props.typeOfGrid === 1) {
            setResort(!reSort)
            setGridClass("columnTextContainer")
        }
    }, [props.typeOfGrid])

    useEffect(() => {
        setResort(!reSort)
    }, [props.typeOfSort])

    useEffect(() => {
        if(props.resetData){
            setData([])
            setAuxData([])
        }
    }, [props.resetData])

    if(charging) return <div className="clipLoader"><ClipLoader/></div>
    else return (
        <div className={gridClass}>
            {(finalData?.length !== 0) && finalData![props.page].map((book: any) => {
                if(book) {
                    const isbn: string | undefined = book.isbn ? book.isbn[0] : undefined
                    const year: number | undefined = book.publish_year ? book.publish_year[0] : undefined
                    const amazon: string | undefined = book.id_amazon ? book.id_amazon[0] : undefined
                    return (
                        <div className="bookContainer">
                            <div className="coverAndName">
                                <img className="cover" src={"http://covers.openlibrary.org/b/isbn/"+isbn+"-S.jpg"} alt="Este libro no tiene imagen"/>
                                <div className="title">{book.title}</div>
                            </div>
                            <div className="information">
                                <div className="author">{"Author: " + book.author_name}</div>
                                <div className="year">{"Year of publish: " + year}</div>
                                <a className="amazon" target="_blank" href={"https://www.amazon.es/dp/"+amazon}>Comprar en amazon</a>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Text