import React, {useState, useCallback} from 'react';
import { AppLayout } from '../components/AppLayout';
import {fetchData} from '../assets/useFetch'
import _ from 'lodash';

export default function  HomePage () {

  const [inputResponse, setInputResponse] = useState([]);
  const delayedQuery = useCallback(_.debounce(q => sendQuery(q), 500),[]);
  const sendQuery = async (value) => {
    if (value && value.trim() !== '') {
        const url = `https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=709fcc16e682c7769f50ad7e15a754f1&text=${value.trim()}&per_page=10&page=1&format=json&nojsoncallback=1`
        const response = await fetchData(url, 'GET')
        setInputResponse(response && response['groups'] && response['groups']['group'] ? response['groups']['group']: [])
    }
  }
  return <AppLayout delayedQuery={delayedQuery} inputResponse={inputResponse}/>
}