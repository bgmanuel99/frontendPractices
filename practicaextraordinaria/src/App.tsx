import React, {useState} from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Filter from "./components/Filter/Filter"
import City from "./components/City/City"
import Country from "./components/Country/Country"

const client = new ApolloClient({
  uri: "https://api.everbase.co/graphql?apikey={insert_api_key}",
  cache: new InMemoryCache()
});

function App() {
  const [city, setCity] = useState<string>("")
  const [country, setCountry] = useState<string>("")

  const changeCity = (newCity: string) => {
    setCity(newCity)
  }

  const changeCountry = (newCountry: string) => {
    setCountry(newCountry)
  }

  return (
    <ApolloProvider client={client}>
      <Filter changeCity={changeCity} changeCountry={changeCountry}></Filter>
      <City newCity={city} changeCountry={changeCountry}></City>
      <Country newCountry={country} changeCity={changeCity}></Country>
    </ApolloProvider>
  );
}

export default App;
