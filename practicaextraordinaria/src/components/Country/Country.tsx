import React, {FC, useState, useEffect} from "react"
import "./Country.css"
import {useQuery, gql} from "@apollo/client"
import axios from "axios"

const COUNTRY = gql`
    query getCountry($country: String){
        countries(where: {name: {eq: $country}}){
            name
            continent{
                name
            }
            capital{
                name
            }
            languages{
                name
            }
            currencies{
                name
            }
            population
            alpha2Code
        }
    }
`

interface ICountry {
    countries: Array<{
        name: string,
        continent: {
            name: string;
        },
        capital: {
            name: string;
        },
        languages: Array<{
            name: string;
        }>,
        currencies: Array<{
            name: string;
        }>,
        population: number,
        alpha2Code: string;
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

interface TextProps {
    newCountry: string;
    changeCity: Function;
}

const Country: FC<TextProps> = (props) => {

    const [country, setCountry] = useState<string>("")
    const [allWeather, setAllWeather] = useState<IWeather[]>([])

    const {data, loading, error} = useQuery<ICountry>(COUNTRY, {
        variables: {
            country,
        }
    })

    useEffect(() => {
        setCountry(props.newCountry)
        setAllWeather([])
    }, [props.newCountry])

    useEffect(() => {
        if(data) {
            for(var i = 0; i < data.countries.length; i++) {
                axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + data.countries[i].capital.name + "&appid={insert_api_key}").then((response) => {
                    if(allWeather.length === 0) setAllWeather([response.data])
                    else setAllWeather([...allWeather, response.data])
                })
            }
        }
    }, [data])

    if(loading) return <div className="countryContainer">Charging cities</div>
    if(error) {
        console.log(error)
        return <div className="countryContainer">There has been an error, ay</div>
    }
    return (
        <div className="countryContainer">
            {country !== "" && <div className="country">Country</div>}
            <div className="countryData">
                {(country !== "" && data?.countries !== undefined) && data?.countries.map((thisCountry: any, index: number) => {
                    var srcCountry = "https://www.countryflags.io/" + thisCountry.alpha2Code + "/flat/32.png"
                    return <div className="thisCountry">
                        <div>{"Name: " + thisCountry.name}</div>
                        <div>{thisCountry.continent? "Continent: " + thisCountry.continent.name : "null"}</div>
                        <div className="capital" onClick={(e) => {
                            props.changeCity(thisCountry.capital.name)
                        }}>{thisCountry.capital? "Capital: " + thisCountry.capital.name : "null"}</div>
                        <div>{thisCountry.languages? "Languages: " + thisCountry.languages.map((language: any) => {
                            return language.name
                        }) : "null"}</div>
                        <div>{thisCountry.currencies? "Currencies: " + thisCountry.currencies.map((currence: any) => {
                            return currence.name
                        }) : "null"}</div>
                        <div>{thisCountry.population? "Population: " + thisCountry.population : "null"}</div>
                        <img src={srcCountry} alt="No flag" />
                        {allWeather.length === data.countries.length && <div>Metereology in the capital
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

export default Country