import React, {FC, useEffect, useState} from "react"
import "./Text.css"
import axios from "axios"

interface TextProps {
    url: string;
    filter: string;
    order: string;
}

const Text: FC<TextProps> = (props) => {
    const [info, setInfo] = useState<any>()
    const [data, setData] = useState<Array<any>>([])
    const [auxData, setAuxData] = useState<Array<any>>([])
    const [internalUrl, setInternalUrl] = useState<string>("")
    const [changeUrl, setChangeUrl] = useState<boolean>(true)
    const [charging, setCharging] = useState<boolean>(true)

    useEffect(() => {
        if(props.url !== "" && changeUrl){
            axios.get(props.url).then((response) => {
                setInfo(response.data)
            })
            setChangeUrl(false)
            setCharging(true)
            setData([])
            setAuxData([])
        }else if(!changeUrl) {
            axios.get(internalUrl).then((response) => {
                setInfo(response.data)
            })
        }
    }, [props.url, internalUrl])

    useEffect(() => {
        if(props.url !== "") chargeAllData()
    }, [info])

    useEffect(() => {
        if(props.url !== "") {
            if(props.order === "ascAlphaOrder") {
                if(auxData.length === 0) setAuxData(data)
                if(props.url.split("/")[4] === "people" || props.url.split("/")[4] === "planets") {
                    const titles: Array<string> = data.map((obj) => obj.name)
                    const sortTitles: Array<string> = titles.sort()
                    const parsedData: Array<any> = sortTitles.map((title: string, index: number) => {
                        return data.find((obj) => title === obj.name)
                    })
                    setData(parsedData)
                }else if(props.url.split("/")[4] === "films") {
                    const titles: Array<string> = data.map((obj) => obj.title)
                    const sortTitles: Array<string> = titles.sort()
                    const parsedData: Array<any> = sortTitles.map((title: string, index: number) => {
                        return data.find((obj) => title === obj.title)
                    })
                    setData(parsedData)
                }
            }else if(props.order === "descAlphaOrder") {
                if(auxData.length === 0) setAuxData(data)
                if(props.url.split("/")[4] === "people" || props.url.split("/")[4] === "planets") {
                    const titles: Array<string> = data.map((obj) => obj.name)
                    const sortTitles: Array<string> = titles.sort()
                    const parsedData: Array<any> = sortTitles.map((title: string, index: number) => {
                        return data.find((obj) => title === obj.name)
                    })
                    setData(parsedData.reverse())
                }else if(props.url.split("/")[4] === "films") {
                    const titles: Array<string> = data.map((obj) => obj.title)
                    const sortTitles: Array<string> = titles.sort()
                    const parsedData: Array<any> = sortTitles.map((title: string, index: number) => {
                        return data.find((obj) => title === obj.title)
                    })
                    setData(parsedData.reverse())
                }
            }else if(props.order === "normal") {
                if(auxData.length !== 0) setData(auxData)
            }
        }
    }, [props.order])

    const chargeAllData = () => {
        setData([...data,...info.results])
        if(info.next) setInternalUrl(info.next)
        else {
            setChangeUrl(true)
            setCharging(false)
        }
    }

    if(data.length === 0) return <div className="textContainer firstWords">Choose the data you wanna show</div>
    return (
        <div className="textContainer">
            {charging && "...Charging the data"}
            {!charging && data.map((obj: any, index: number) => {
                if(props.url.split("/")[4] === "people") {
                    if(obj.name && obj.name.includes(props.filter)) {
                        return (
                            <div className="objectContainer" key={index}>
                                <div className="objName">{obj.name}</div>
                                <div className="objText">
                                    {obj.height + " centimeters tall, " + obj.mass + " of mass, " + obj.hair_color + " hair color, " + obj.skin_color + " skin color, " + 
                                    obj.eye_color + " eye color, " + obj.birth_year + " is its birth year, and " + obj.gender + " gender."}
                                </div>
                            </div>
                        )
                    }
                }else if(props.url.split("/")[4] === "planets") {
                    if(obj.name && obj.name.includes(props.filter)) {
                        return (
                            <div className="objectContainer" key={index}>
                                <div className="objName">{obj.name}</div>
                                <div className="objText">
                                    {"Its rotation period is " + obj.rotation_period + ", with an orbital period of " + obj.orbital_period + ", a diameter of " + obj.diameter + 
                                    ", " + obj.climate + " climate, a gravity of " + obj.gravity + ", " + obj.terrain + " terrain, a surface water of " + obj.surface_water + 
                                    ", and a population of " + obj.population + " people."}
                                </div>
                            </div>
                        )
                    }
                }else if(props.url.split("/")[4] === "films") {
                    if(obj.title && obj.title.includes(props.filter)){
                        return (
                            <div className="filmContainer" key={index}>
                                <div className="objName">{obj.title}</div>
                                <div className="objText">
                                    {"The director of the film is " + obj.director + ", the producers are " + obj.producer + ", and the release date was " + obj.release_date + "."}
                                </div>
                                <div className="opening">{"Opening"}</div>
                                <div className="openingText">{obj.opening_crawl}</div>
                            </div>
                        )
                    }
                }
            })}
        </div>
    )
}

export default Text