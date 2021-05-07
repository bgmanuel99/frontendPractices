import React, {FC, useState, useEffect} from "react"
import "./Country.css"
import {useQuery, gql} from "@apollo/client"

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
    }>
}

interface TextProps {
    newCountry: string;
    changeCity: Function;
}

const Country: FC<TextProps> = (props) => {

    const [country, setCountry] = useState<string>("")

    const {data, loading, error} = useQuery<ICountry>(COUNTRY, {
        variables: {
            country,
        }
    })

    useEffect(() => {
        setCountry(props.newCountry)
    }, [props.newCountry])

    if(loading) return <div className="countryContainer">Charging cities</div>
    if(error) {
        console.log(error)
        return <div className="countryContainer">There has been an error, ay</div>
    }
    return (
        <div className="countryContainer">
            {country !== "" && <div className="country">Country</div>}
            <div className="countryData">
                {(country !== "" && data?.countries !== undefined) && data?.countries.map((thisCountry: any) => {
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
                    </div>
                })}
            </div>
        </div>
    )
}

export default Country