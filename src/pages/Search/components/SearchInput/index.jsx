import { useTranslation } from 'react-i18next';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';
import { useState } from 'react';
import { Col, Row } from 'antd';

function SearchInput({ handleSearch, handleCategory }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [activeId, setActiveId] = useState();
  const values = [
    {
      id: 1,
      text: 'Travel, Entertainment and Design',
      textvn: 'Du lịch, giải trí và thiết kế',
    },
    {
      id: 2,
      text: 'Food and service industry',
      textvn: 'Ngành thực phẩm & dịch vụ',
    },
    {
      id: 3,
      text: 'Trend-Following Business',
      textvn: 'Kinh doanh theo xu hướng',
    },
    {
      id: 4,
      text: 'Related to Information Technology',
      textvn: 'Liên quan đến CNTT',
    },
    {
      id: 5,
      text: 'Regarding Technical Interns',
      textvn: 'Liên quan đến thực tập sinh kỹ năng',
    },
    { id: 6, text: 'Education and Care', textvn: 'Giáo dục và chăm sóc' },
    {
      id: 7,
      text: 'Expansion to Vietnam',
      textvn: 'Mở rộng sang Việt Nam',
    },
    { id: 8, text: 'Others', textvn: 'Khác' },
    { id: 9, text: 'All', textvn: 'All' },
  ];

  const handleActiveId = id => {
    setActiveId(id);
  };

  const handleChange = e => {
    setName(e.target.value);
    if (e.target.value === '') {
      setName('');
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleOffCategory = () => {
    setActiveId(0);
  };

  return (
    <div className="container_search">
      <h5>{t('Search For Company Name')}</h5>
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
            placeholder={t('search...')}
            id="search_input"
            className="input-search"
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="search_category">
        <div className="search_category_title">
          <h3>{t('Categoty')}:</h3>
        </div>
        <div className="search_category_content">
          <ul className="category_content">
            {/* <Row> */}
            {values.map(item => (
              // <Col span={1}>
              <li
                key={item.id}
                style={
                  activeId == item.id
                    ? { backgroundColor: '#3b71ca', color: '#fff' }
                    : {}
                }
                onClick={event => {
                  handleCategory(item.textvn);
                  handleActiveId(item.id);
                }}
              >
                {t(`${item.text}`)}
              </li>
              // </Col>
            ))}
            {/* </Row> */}
          </ul>
          {/* <button onClick={handleOffCategory}>Off</button> */}
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
