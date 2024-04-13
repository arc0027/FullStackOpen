import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('promise fulfilled')
        setAllCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    const filterValue = event.target.value
    setNewFilter(filterValue)
    
    if (filterValue) {
      const regex = new RegExp(filterValue, 'i')
      const filteredCountries = allCountries.filter(country => country.name.common.match(regex))
      setCountries(filteredCountries)
    }
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Content countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App