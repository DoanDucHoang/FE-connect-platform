import { useTranslation } from 'react-i18next';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';
import { useState } from 'react';

function SearchInput({ handleSearch }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');

  const handleChange = e => {
    setName(e.target.value);
    if (e.target.value === '') {
      setName('');
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
  };
  return (
    <div className="container_search">
      <h5>Search For Company Name</h5>
      <form onSubmit={handleSubmit}>
        <div className="search-box">
          <button
            type="submit"
            className="btn-search"
            onClick={event => handleSearch(name)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type="text"
            placeholder="search..."
            id="search_input"
            className="input-search"
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="search_category">
        <div className="search_category_title">
          <h3>Categoty: </h3>
        </div>
        <div className="search_category_content">
          <ul className="category_content">
            <li href="#">{t('Travel, Entertainment and Design')}</li>
            <li href="#">{t('Food and service industry')}</li>
            {/* <li href="#">{t('Trend-Following Business')}</li>
            <li href="#">{t('Related to Information Technology')}</li>
            <li href="#">{t('Regarding Technical Interns')}</li>
            <li href="#">{t('Education and Care')}</li>
            <li href="#">{t('Expansion to Vietnam')}</li>
            <li href="#">{t('Others')}</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
