import React, { useEffect } from 'react';
import AdminHeader from '../Components/AdminHeader';
import plusIcon from '../images/plus-icon.svg';
import DragDrop from '../Components/DragDrop';
import {BASE_URL, POST_IMAGES_ENDPOINT} from '../settings';

export default function AdminImages() {
  const [files, setFiles] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fileInputEl = React.useRef(null);

  function handleClick(event) {
    fileInputEl.current.click();
  }

  function handleChange(event) {
    setFiles([...event.target.files]);

    // reset file input value
    event.target.value = null;
  }

  useEffect(() => {
    // whenever the files array changes, post them to the server
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

      // save images
      const parsedResponse = await response.json();
      setImages(prevImages => {
        const tempImages = prevImages.slice(0);
        tempImages.push(parsedResponse);
        return tempImages;
      })
    }

    if (files.length > 0) {
      // set loading state
      console.log('begin loading');
      setIsLoading(true);

      // assemble files as formData
      const formDatas = files.map(file => {
        const formData = new FormData();
        formData.append('image', file);
        return formData;
      });

      // submit post request to api for each formData
      const promises = formDatas.map(formData => {
        return callAPI(`${BASE_URL}${POST_IMAGES_ENDPOINT}`, 'POST', formData);
      });

      // once fetches are done, clear files and loading states
      Promise.all(promises).then(() => {
        console.log('loading done');
        setIsLoading(false);
        setFiles([]);
      });
    }

  }, [files])

  return (
    <>
      <AdminHeader />
      <div className="admin__pageContainer">
        <main className="adminimages__container">
          <header className="adminimages__header">
            <h3 className="adminimages__title">Images</h3>
            <button className="button" onClick={handleClick}>
              <img src={plusIcon} className="button__icon" alt="this is a plus icon"></img>
              <p>Add Images</p>
            </button>
            <input
              type="file"
              multiple
              ref={fileInputEl}
              className="adminimages__fileInput"
              accept=".png, .jpg, .jpeg"
              onChange={handleChange}
            ></input>
          </header>
          <DragDrop images={images} isLoading={isLoading}/>
        </main>
      </div>
    </>
  )
}