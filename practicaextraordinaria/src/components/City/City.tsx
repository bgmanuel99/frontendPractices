import React, {FC, useState, useEffect} from "react"
import "./City.css"
import {useQuery, gql} from "@apollo/client"
import axios from "axios"

const CITIES = gql`
    query getCities($city: String){
        cities(where: {name: {eq: $city}}){
            name
            country{
                name
                alpha2Code
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
            alpha2Code: string;
        }
        population: number;
        timeZone: {
            name: string
        }
    }>
}

interface IWeather {
    weather: Array<{
        description: string;
    }>,
    main: {
        temp: number;
    }
}

interface CityProps {
    newCity: string;
    changeCountry: Function;
}

const City: FC<CityProps> = (props) => {

    const [city, setCity] = useState<string>("")
    const [allWeather, setAllWeather] = useState<IWeather[]>([])

    const {data, loading, error} = useQuery<ICities>(CITIES, {
        variables: {
            city,
        }
    })

    useEffect(() => {
        setCity(props.newCity)
        setAllWeather([])
    }, [props.newCity])

    useEffect(() => {
        if(data) {
            for(var i = 0; i < data.cities.length; i++) {
                axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + data.cities[i].name + "&appid={insert_api_key}").then((response) => {
                    if(allWeather.length === 0) setAllWeather([response.data])
                    else setAllWeather([...allWeather, response.data])
                })
            }
        }
    }, [data])

    if(loading) return <div className="dataContainer">Charging cities</div>
    if(error) {
        console.log(error)
        return <div className="dataContainer">There has been an error, ay</div>
    }
    return (
        <div className="dataContainer">
            {city !== "" && <div className="city">City</div>}
            <div className="cityData">
                {(city !== "" && data?.cities !== undefined) && data?.cities.map((thisCity: any, index: number) => {
                    var srcCountry = "https://www.countryflags.io/" + thisCity.country.alpha2Code + "/flat/64.png"
                    return <div className="thisCity">
                        <div className="cityName">{"Name: " + thisCity.name}</div>
                        <div className="countryName" onClick={(e) => {
                            props.changeCountry(thisCity.country.name)
                        }}>{<u>{"Country: " + thisCity.country.name}</u>}</div>
                        <div className="population">{thisCity.population? "Population: " + thisCity.population : "null"}</div>
                        <div className="timeZone">{thisCity.timeZone? "TimeZone: " + thisCity.timeZone.name : "null"}</div>
                        <img src={srcCountry} alt="No flag"/>
                        {allWeather.length === data.cities.length && <div>Metereology in the city
                            <div>{"Actual temperature: " + allWeather[index].main.temp}</div>
                            <div>{allWeather[index].weather.length !== 0 && allWeather[index].weather.map((weather: any) => {
                                return <div>{"Weather description: " + weather.description}</div>
                            })}</div>
                        </div>}
                    </div>
                })}
            </div>
        </div>
    )
}

export default City