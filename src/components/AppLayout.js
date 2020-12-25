import React, {useState} from 'react'
import {fetchData} from '../assets/useFetch'
import {Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'

const AppLayout = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [searchSuggestion, setSearchSuggestion] = useState([]);

  const inputHandler = async (event) => {
    if (event.type === 'click') {
      event.preventDefault();
    }
    if (event.key === 'Enter' || event.type === 'click') {
      setSearchSuggestion([])
      const value = inputValue
      props.delayedQuery(value)
    }
  }
  const searchHandler = async (event) => {
    const value = event.target.value
    setInputValue(value)
    const searchUrl = `https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=709fcc16e682c7769f50ad7e15a754f1&text=${value.trim()}&per_page=5&page=1&format=json&nojsoncallback=1`
    const searchResponse = await fetchData(searchUrl, 'GET')
    setSearchSuggestion(value && searchResponse && searchResponse['groups'] && searchResponse['groups']['group'] ? searchResponse['groups']['group']: [])
  }
  const groupHandler = async (value) => {
    setInputValue(value)
    const searchUrl = `https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=709fcc16e682c7769f50ad7e15a754f1&text=${value.trim()}&per_page=5&page=1&format=json&nojsoncallback=1`
    const searchResponse = await fetchData(searchUrl, 'GET')
    setSearchSuggestion(value && searchResponse && searchResponse['groups'] && searchResponse['groups']['group'] ? searchResponse['groups']['group']: [])
  }
  let group;
  if (props.inputResponse.length) { 
    group=<div className="group-name">Groups</div>
  } else {
    group=<div className="group-name"></div>
  }
  return (
    <div className="group-container">
      <div className="search-wrapper">
        <div className="input-wrapper">
          <input placeholder="Search Group" className="group-input" type="text" onChange={searchHandler} value={inputValue} onKeyDown={inputHandler} />
          <ul>{searchSuggestion.map((group, index) => {
            return <li onClick={() => groupHandler(group.name)} key={'search' + index.toString()}>{group.name}</li>
          })}</ul>
        </div>
        <Button variant="primary" onClick={inputHandler}>Search</Button>
      </div>
      {group}
      <CardColumns>{props.inputResponse.map((group, index) => {
        if (group.iconserver != 0) {
          return (
            <Link key={'link' + index.toString()} to={`/gallery/${group?.nsid}`}>
            <Card key={'wrapper' + index.toString()}>
              <Card.Img className="card-image-group" variant="top" alt="profile-icon" src={`https://live.staticflickr.com/${group.iconserver}/buddyicons/${group.nsid}_r.jpg`}/>
              <Card.Body key={'card-body' + index.toString()}>
                <Card.Title title={group.name} key={'name' + index.toString()}>Group Name: {group.name}</Card.Title>
                <Card.Text key={'count' + index.toString()}>Photos: {group.pool_count}</Card.Text>
                <Card.Text key={'memb' + index.toString()}>Members: {group.members}</Card.Text>
              </Card.Body>
            </Card>
            </Link>
          )
        }
      })}</CardColumns>

    </div>
  )
}

export {AppLayout}