import React, {FC, useState, useEffect} from "react"
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    </ApolloProvider>
  );
}

export default App;
