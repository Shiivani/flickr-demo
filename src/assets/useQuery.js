

import { useState, useEffect } from "react";
export const useQuery = (
    url
  ) => {
  const [dataObj, setDataObj] = useState();
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const executeQuery = async () => {
    setLoading(true);
    let response;
    try {
      response = await fetch(url);
      if (response) {
        const res = await response.json();
        setLoading(false);
        setData(res);
      }
    } catch (e) {
      setLoading(false);
        console.log("error")
    }
  };
  useEffect(() => {
    function execute() {
      if (dataObj) {
        executeQuery();
      }
    }
    execute();
  }, [dataObj, setDataObj]);
  return {
    dataObj: {
      loading: loading,
      data: data
    },
    setState: setDataObj
  };
  }