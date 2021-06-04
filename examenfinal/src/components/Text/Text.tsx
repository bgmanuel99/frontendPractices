import axios from "axios"
import React, {FC, useEffect, useState} from "react"
import "./Text.css"

interface TextProps {
    character: string;
    token: string;
}

interface CharacterData {
    docs: Array<{
        _id: string;
    }>
}

interface CharacterQuotes {
    docs: Array<{
        dialog: string;
        movie: string;
    }>;
    total: number;
}

interface QuoteMovie {
    docs: Array<{
        name: string;
    }>
}

const Text: FC<TextProps> = (props) => {
    const [data, setData] = useState<CharacterData>()
    const [quotes, setQuotes] = useState<CharacterQuotes>()
    const [movie, setMovie] = useState<QuoteMovie>()
    const [notFound, setNotFound] = useState<boolean>(false)
    const [electedQuoteText, setElectedQuoteText] = useState<string>("")

    useEffect(() => {
        if(props.token) {
            axios.get("https://the-one-api.dev/v2/character?name="+props.character, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((response) => {
                setNotFound(false)
                setData(response.data)
            }).catch(() => {
                setNotFound(true)
            })
        }
    }, [props.character])

    useEffect(() => {
        if(data) {
            axios.get("https://the-one-api.dev/v2/character/"+data?.docs[0]._id+"/quote", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((response) => {
                setQuotes(response.data)
            })
        }
    }, [data])

    useEffect(() => {
        if(quotes) {
            const randomNumber = Math.floor(Math.random() * (quotes.total - 0) + 0)
            console.log(randomNumber)
            const myQuote = quotes.docs && quotes.docs[randomNumber].dialog
            setElectedQuoteText(myQuote)
            axios.get("https://the-one-api.dev/v2/movie/"+quotes?.docs[randomNumber].movie, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((response) => {
                setMovie(response.data)
            })
        }
    }, [quotes])

    if(props.character === ""){
        return (
            <div className="Waiting">
                {props.token === "" && <div className="waitingText">Introduce your token and search for a character</div>}
                {props.token !== "" && <div className="waitingText">Search for a character</div>}
            </div>
        )
    }else if(notFound) return (
        <div className="NotFoundCharacter">
            <div className="GollumPhoto"></div>
            <div className="GollumText">What did you say?</div>
        </div>
    )
    return (
        <div className="Information">
            {movie && <div className="quoteAndMovie">
                <div className="quote">{"Quote: " + electedQuoteText}</div>
                <div className="movie">{"Movie: " + movie.docs[0].name}</div>
            </div>}
        </div>
    )
}

export default Text