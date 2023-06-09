import React from 'react';
import './VisitorHeader.css';
import {DOMAIN_NAME, BASE_URL, IMAGES_INDEX_ENDPOINT_PUBLIC_IMAGES_ONLY} from '../settings';

export default function VisitorHeader(props) {
  const [searchText, setSearchText] = React.useState('');
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  function handleChange(event) {
    setSearchText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.setSearchInfoText(searchText);
    setIsFormSubmitted(true);
  }

  React.useEffect(() => {
    if (isFormSubmitted) {
      // clear existing images in state
      props.clearData();

      let url = `${BASE_URL}${IMAGES_INDEX_ENDPOINT_PUBLIC_IMAGES_ONLY}`

      // only 'tags' query parameter if search text isn't blank
      if (searchText) {
        url = url + `?tags=${searchText}`;
      }

      // submit GET request to API
      props.setFetchParameters({
        url: url,
        method: 'GET',
        bodies: [],
      });
    }

    setIsFormSubmitted(false);
  }, [isFormSubmitted])

  console.log('rendered');

  return (
    <header className="visitorHeader">
      <h1 className="visitorHeader__title">{DOMAIN_NAME}</h1>
      <div className="visitorHeader__search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="visitorHeader__input"
            placeholder="Search by tag"
            onChange={handleChange}
            value={searchText}
          ></input>
        </form>
        <p className="visitorHeader__inputInfo">
          SEPARATE TAGS WITH A COMMA
        </p>
      </div>
    </header>
  );
}