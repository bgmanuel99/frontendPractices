import React, {useState} from 'react';
import './App.css';
import ElectionMenu from "./components/ElectionMenu/ElectionMenu"
import FilterMenu from "./components/FilterMenu/FilterMenu"
import Text from "./components/Text/Text"

function App() {
  const [url, setUrl] = useState<string>("")
  const [order, setOrder] = useState<string>("normal")
  const [filter, setFilter] = useState<string>("")

  const changeData = (newUrl: string) => {
        setUrl(newUrl)
  }

  const changeFilter = (newFilter: string) => {
      setFilter(newFilter)
  }

  const changeOrder = (newOrder: string) => {
      setOrder(newOrder)
  }

  return (
    <div className="App">
        <ElectionMenu changeData={changeData}></ElectionMenu>
        <FilterMenu changeFilter={changeFilter} changeOrder={changeOrder}></FilterMenu>
        <Text url={url} filter={filter} order={order}></Text>
    </div>
  );
}

export default App;
