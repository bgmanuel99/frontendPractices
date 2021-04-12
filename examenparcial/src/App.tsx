import React, {useState} from 'react'
import './App.css'
import Filter from "./components/Filter/Filter"
import Text from "./components/Text/Text"

function App() {
  const [filter, setFilter] = useState<string>("")
  var [page, setPage] = useState<number>(0)
  
  const changeOnFilter = (newFilter: string) => {
    setFilter(newFilter)
  }

  const changePrev = (prev: number) => {
    if(page !== 0) setPage(page += prev)
  }

  const changeNext = (next: number) => {
    setPage(page += next)
  }

  return (
    <div className="App">
      <Filter changeOnFilter={changeOnFilter} changeNext={changeNext} changePrev={changePrev}></Filter>
      <Text filter={filter} page={page}></Text>
    </div>
  )
}

export default App;
