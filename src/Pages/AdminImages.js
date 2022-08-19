import React, { useEffect } from 'react';
import AdminHeader from '../Components/AdminHeader';
import plusIcon from '../images/plus-icon.svg';
import DragDrop from '../Components/DragDrop';
import {BASE_URL, POST_IMAGES_ENDPOINT} from '../settings';
import useCallAPI from '../CustomHooks/useCallAPI';

export default function AdminImages() { 
  const {data, isLoading, setFetchParameters} = useCallAPI();
  const fileInputEl = React.useRef(null);

  function handleClick(event) {
    fileInputEl.current.click();
  }

  function handleChange(event) {
    const files = [...event.target.files];

    // build a formData object for each file
    const formDatas = files.map(file => {
      const formData = new FormData();
      formData.append('image', file);
      return formData;
    });

    // initiate file upload
    setFetchParameters({
      url: `${BASE_URL}${POST_IMAGES_ENDPOINT}`,
      method: 'POST',
      bodies: formDatas,
    });

    // reset file input value
    event.target.value = null;
  }

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
          <DragDrop images={data} isLoading={isLoading} setFetchParameters={setFetchParameters}/>
        </main>
      </div>
    </>
  )
}