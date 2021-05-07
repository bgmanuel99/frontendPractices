import React, {useState} from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Filter from "./components/Filter/Filter"
import Text from "./components/Text/Text"
import Country from "./components/Country/Country"

const client = new ApolloClient({
  uri: "",
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
      <Text newCity={city} changeCountry={changeCountry}></Text>
      <Country newCountry={country} changeCity={changeCity}></Country>
    </ApolloProvider>
  );
}

export default App;
