import React, {FC, useState, useEffect} from "react"
import "./Text.css"
import {useQuery, gql} from "@apollo/client"

const CITIES = gql`
    query getCities($city: String){
        cities(where: {name: {eq: $city}}){
            name
            country{
                name
            }
            population
            timeZone{
                name
            }
        }
    }
`

interface ICities {
    cities: Array<{
        name: string;
        country: {
            name: string;
        }
        population: number;
        timeZone: {
            name: string
        }
    }>
}

interface TextProps {
    newCity: string;
    changeCountry: Function;
}

const Text: FC<TextProps> = (props) => {

    const [city, setCity] = useState<string>("")

    const {data, loading, error} = useQuery<ICities>(CITIES, {
        variables: {
            city,
        }
    })

    useEffect(() => {
        setCity(props.newCity)
    }, [props.newCity])

    if(loading) return <div className="dataContainer">Charging cities</div>
    if(error) {
        console.log(error)
        return <div className="dataContainer">There has been an error, ay</div>
    }
    return (
        <div className="dataContainer">
            {city !== "" && <div className="city">City</div>}
            <div className="cityData">
                {(city !== "" && data?.cities !== undefined) && data?.cities.map((thisCity: any) => {
                    return <div className="thisCity">
                        <div className="cityName">{"Name: " + thisCity.name}</div>
                        <div className="countryName" onClick={(e) => {
                            props.changeCountry(thisCity.country.name)
                        }}>{<u>{"Country: " + thisCity.country.name}</u>}</div>
                        <div className="population">{thisCity.population? "Population: " + thisCity.population : "null"}</div>
                        <div className="timeZone">{thisCity.timeZone? "TimeZone: " + thisCity.timeZone.name : "null"}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Text