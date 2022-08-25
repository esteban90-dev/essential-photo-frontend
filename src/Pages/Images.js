import React, { useEffect } from 'react';
import VisitorLayout from '../Layouts/VisitorLayout';
import useCallAPI from '../CustomHooks/useCallAPI';
import {BASE_URL, IMAGES_INDEX_ENDPOINT} from '../settings';

export default function Images() {
  const {data, isLoading, setFetchParameters} = useCallAPI();

  const images = data.map(image => {
    return (
      <div className="images__imageContainer" key={image.id}>
        <img
          src={image.thumbnail_url}
          className="images__image"
          alt=""
        ></img>
      </div>
    );
  });

  useEffect(() => {
    // on initial page load, fetch index of photos
    setFetchParameters({
      url: `${BASE_URL}${IMAGES_INDEX_ENDPOINT}`,
      method: 'GET',
      bodies: [],
    });
  }, []);

  return (
    <VisitorLayout>
      <main className="images">
        {images}
      </main>
    </VisitorLayout>
  );
}