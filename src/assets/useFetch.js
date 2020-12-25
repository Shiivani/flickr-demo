const fetchData = async (url, method) => {
    let response;
  try {
    response = await fetch(url)
    const res = await response.json()
    return res
  } catch (e) {
    console.log(e)
  }
  return
}

export {fetchData}

