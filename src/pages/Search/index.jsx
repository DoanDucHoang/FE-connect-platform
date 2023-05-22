import { useEffect } from 'react';
import Header from '../../components/Header';
import Translate from '../../components/Translate';
import Company from '../Home/components/Company';
import Navbar from './../../components/Navbar/index';
import SearchInput from './components/SearchInput';
import { getAllCompany, getCompanyByName } from '../../store/apiCall';
import { useState } from 'react';
import { COUNTRY } from '../../constant/constant';
import { Col, Row } from 'antd';
import CompanyList from './components/CompanyList';
import './index.scss';
import { GridLoader } from 'react-spinners';
import Footer from './../../components/Footer/index';

const Search = () => {
  const [companys, setCompanys] = useState([]);
  const [title, setTitle] = useState('ALL');
  const [company_name, setCompanyName] = useState('');
  //console.log('🚀 ~ file: index.jsx:16 ~ Search ~ companys:', companys);
  const handleSearch = name => {
    setCompanyName(name);
    setTitle(name);
    if (!name) {
      setTitle('ALL');
    }
  };

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
    console.log('object');
  }, []);

  //   const handleScroll = () => {
  //     if (window.pageYOffset > 470) {
  //     }
  //   };

  useEffect(() => {
    const list = getCompanyByName({ company_name }).then(data => {
      setCompanys(data);
    });
    if (!company_name) {
      getAll();
    }
  }, [company_name]);

  return (
    <div className="container">
      <Translate />
      <Navbar />
      <Header props="landing" />
      <Row>
        <Col xl={7} lg={24}>
          <SearchInput handleSearch={handleSearch} />
        </Col>
        <Col xl={17} lg={12}>
          <h2>Result For: {title}</h2>
          {/* <Company companys={companys} title={''} /> */}
          <CompanyList companys={companys} page="search" />
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Search;
