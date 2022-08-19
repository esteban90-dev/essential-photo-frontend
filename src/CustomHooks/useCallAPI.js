import React from 'react';

// use this hook to call the API 
// this will handle tokens for you
// the request(s) will be initiated once setFetchParameters is called
// the resulting data will be placed in the data state variable
// isLoading can be used for loading status
// setFetchParameters.bodies is an array that can accept one or more request bodies
// a request will be generated for each body to permit batch requests (for example, 
// uploading multiple images at once)

export default function useCallAPI() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fetchParameters, setFetchParameters] = React.useState({
    url: '',
    method: '',
    bodies: [],
  });

  React.useEffect(() => {
    async function callAPI(url, method, body) {
      const response = await fetch(url, {
        method: method,
        headers: {
          'access-token': sessionStorage.getItem('access-token'),
          'client': sessionStorage.getItem('client'),
          'uid': sessionStorage.getItem('uid'),
        },
        body: body,
      });

      // update tokens if response sends new ones
      const accessToken = response.headers.get('access-token');
      const clientToken = response.headers.get('client');
      const uidToken = response.headers.get('uid');

      if (accessToken) {
        sessionStorage.setItem('access-token', accessToken);
      }

      if (clientToken) {
        sessionStorage.setItem('client', clientToken);
      }

      if (uidToken) {
        sessionStorage.setItem('uid', uidToken);
      }

      // save data
      const parsedResponse = await response.json();
      setData(prevData => {
        const tempData = prevData.slice(0);
        tempData.push(parsedResponse);
        return tempData;
      })
    }

    if (fetchParameters.url && fetchParameters.method && fetchParameters.bodies.length > 0) {
      // set loading state
      setIsLoading(true);

      // submit request to api for each body
      const promises = fetchParameters.bodies.map(body => {
        return callAPI(fetchParameters.url, fetchParameters.method, body);
      });

      // once all fetches are done, set loading state to false
      Promise.all(promises)
      .then(() => {
        setIsLoading(false);
      });
    }

  }, [fetchParameters]);

  return {data, isLoading, setFetchParameters}
}