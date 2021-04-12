import React, {FC, useEffect, useState} from "react"
import "./Text.css"
import axios from "axios"

interface TextProps {
    filter: string;
    page: number;
}

const Text: FC<TextProps> = (props) => {
    const [data, setData] = useState<Array<any>>([])
    const [finalData, setFinalData] = useState<Array<Array<any>>>([])
    const [info, setInfo] = useState<any>()
    const [charging, setCharging] = useState<boolean>(true)
    var [next, setNext] = useState<number>(1)

    useEffect(() => {
        axios.get("http://openlibrary.org/search.json?q=the+lord+of+the+rings&page="+next).then((response) => {
            setInfo(response.data)
        })
    }, [next])

    useEffect(() => {
        if(info != null) chargeAllData()
    }, [info])

    const chargeAllData = () => {
        setData([...data,...info.docs])
        if(info.start < 400) setNext(next+=1)
        else divideData()
    }

    const divideData = () => {
        var newData: Array<Array<any>> = []
        var auxData: Array<any> = []
        let j = 0;
        for(let i = 0; i < data.length; i++) {
            if(j > 15){
                j = 0
                newData.push(auxData)
                auxData = []
            }else {
                auxData.push(data[i])
                j++
            }
        }
        setFinalData(newData)
        setCharging(false)
    }
    
    if(charging) return <div className="textContainer firstWords">...charging the data</div>
    else return (
        <div className="textContainer">
            {props.filter!="" && finalData[props.page].map((obj: any, index: number) => {
                if(obj.title.includes(props.filter)) {
                    const amazon = obj.id_amazon && obj.id_amazon[0]
                    const isbn = obj.isbn && obj.isbn[0]
                    return (
                        <div className="objectContainer">
                            <img className="photo" src={"http://covers.openlibrary.org/b/isbn/"+isbn+"-S.jpg"} alt="Este libro no tiene imagen"/>
                            <div className="objTitle">{obj.title}</div>
                            <div className="objAuthor">{obj.author_name}</div>
                            <div className="year">{obj.publish_year && obj.publish_year[0]}</div>
                            <a className="amazon" target="_blank" href={"https://www.amazon.es/dp/"+amazon}>Comprar en amazon</a>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Text