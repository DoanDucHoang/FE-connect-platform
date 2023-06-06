import { useEffect, useMemo } from 'react';
import Header from '../../components/Header';
import Translate from '../../components/Translate';
import Company from '../Home/components/Company';
import Navbar from './../../components/Navbar/index';
import SearchInput from './components/SearchInput';
import {
  getAllCompany,
  getCompanyByName,
  getCompanyByCategory,
} from '../../store/apiCall';
import { useState } from 'react';
import { COUNTRY } from '../../constant/constant';
import { Col, Row, Spin } from 'antd';
import CompanyList from './components/CompanyList';
import Spinner from '../../components/Spinner';
import './index.scss';
import { HashLoader } from 'react-spinners';
import Footer from './../../components/Footer/index';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from '../../helper';
import { setLoading } from '../../store/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';

let PageSize = 2;

const Search = () => {
  const [companys, setCompanys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('ALL');
  const [company_name, setCompanyName] = useState('');
  const [category, setCategory] = useState('All');
  const current = 1;
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return companys.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const handleSearch = name => {
    if (!name) {
      getAll();
    }
    setCompanyName(name);
    setTitle(name);
    if (!name) {
      setTitle('ALL');
    }
  };

  const handleCategory = value => {
    setCategory(value);
    setTitle(value);
    if (value === 'All') {
      setCategory('');
      setTitle(t('All'));
    }
  };

  const companyJP = companys
    ? companys.filter(item => {
        return item.country === 'Japan';
      })
    : [];

  const getAll = () => {
    getAllCompany()
      .then(data => {
        setCompanys(data);
        // setIsLoading(false);
        setIsLoading(dispatch(setLoading()));
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAll();
    scrollToTop();
  }, []);

  useEffect(() => {
    setIsLoading(false);
    if (company_name.trim()) {
      getCompanyByName({ company_name }).then(data => {
        setCompanys(data);
        setIsLoading(true);
      });
    }
  }, [company_name]);

  useEffect(() => {
    if (category !== 'All') {
      setIsLoading(false);
      getCompanyByCategory({ category }).then(data => {
        setCompanys(data);
        setIsLoading(true);
      });
    }
  }, [category]);

  return (
    <div className="container">
      {!isLoading && (
        <div className="loading">
          <HashLoader
            color="#d63636"
            loading={true}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
            style={{ textAlign: 'center' }}
          />
        </div>
      )}
      {/* <Spinner isLoading={isLoading} /> */}
      <Translate />
      <Navbar />
      <Header props="landing" />
      <Row>
        <Col xl={7} lg={24} style={{ width: '100%' }}>
          <SearchInput
            handleSearch={handleSearch}
            handleCategory={handleCategory}
          />
        </Col>
        <Col xl={17} lg={12}>
          <h2
            id="#top_search"
            style={{ marginLeft: '20px', marginTop: '20px' }}
          >
            {t('Result For')}: {t(`${title}`)}
          </h2>
          <CompanyList companys={companyJP} page="search" category={category} />
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Search;
