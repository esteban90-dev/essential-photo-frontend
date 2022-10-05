import React, { useEffect } from 'react';
import './AdminImages.css';
import AdminLayout from '../Layouts/AdminLayout';
import plusIcon from '../images/plus-icon.svg';
import DragDrop from '../Components/DragDrop';
import {BASE_URL, POST_IMAGES_ENDPOINT, IMAGES_INDEX_ENDPOINT_ALL_IMAGES, VALID_UPLOAD_FILE_TYPES} from '../settings';
import useCallAPI from '../CustomHooks/useCallAPI';

export default function AdminImages() { 
  const {data, isLoading, updateDataItem, setFetchParameters} = useCallAPI();
  const fileInputEl = React.useRef(null);

  function handleClick(event) {
    fileInputEl.current.click();
  }

  function handleChange(event) {
    const files = [...event.target.files];

    // remove any non-image files
    const imageFiles = files.filter(file => {
      return VALID_UPLOAD_FILE_TYPES.includes(file.type);
    });

    // build a formData object for each file
    const formDatas = imageFiles.map(file => {
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

  useEffect(() => {
    // when page first loads, fetch photos from backend
    setFetchParameters({
      url: `${BASE_URL}${IMAGES_INDEX_ENDPOINT_ALL_IMAGES}`,
      method: 'GET',
      bodies: [],
    });
  }, [setFetchParameters]);

  return (
    <>
      <AdminLayout hasHeader={true}>
        <main className="adminImages">
          <header className="adminImages__header">
            <h3 className="adminImages__title">Images</h3>
            <button className="button" onClick={handleClick}>
              <img src={plusIcon} className="button__icon" alt="this is a plus icon"></img>
              <p>Add Images</p>
            </button>
            <input
              type="file"
              multiple
              ref={fileInputEl}
              className="adminImages__fileInput"
              accept=".png, .jpg, .jpeg"
              onChange={handleChange}
            ></input>
          </header>
          <DragDrop
            images={data}
            isLoading={isLoading}
            setFetchParameters={setFetchParameters}
            updateImage={updateDataItem}
          />
        </main>
      </AdminLayout>
    </>
  )
}