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
import { Col, Row } from 'antd';
import CompanyList from './components/CompanyList';
import './index.scss';
import { GridLoader } from 'react-spinners';
import Footer from './../../components/Footer/index';
import { useTranslation } from 'react-i18next';

let PageSize = 2;

const Search = () => {
  const [companys, setCompanys] = useState([]);
  const [title, setTitle] = useState('ALL');
  const [company_name, setCompanyName] = useState('');
  const [category, setCategory] = useState('All');
  const current = 1;
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return companys.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const handleSearch = name => {
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    getCompanyByName({ company_name }).then(data => {
      setCompanys(data);
    });

    if (!company_name) {
      getAll();
    }
  }, [company_name]);

  useEffect(() => {
    getCompanyByCategory({ category }).then(data => {
      setCompanys(data);
    });

    if (!category) {
      getAll();
    }
  }, [category]);

  return (
    <div className="container">
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
          <h2 style={{ marginLeft: '20px', marginTop: '20px' }}>
            {t('Result For')}: {t(`${title}`)}
          </h2>
          <CompanyList companys={companyJP} page="search" />
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Search;
