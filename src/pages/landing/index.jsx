import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import { BackTop, Col, Row } from 'antd';
//import Wrapper from '../../components/Wrapper';
import Translate from '../../components/Translate';
//import banner from '../../assets/banner_platform.png';
import './index.scss';
//import image from '../../assets/voducthang.png';
import { Link } from 'react-router-dom';
import SlideImage from './components/slideImage';
import Contact from './components/contact';
import FindPartner from './components/FindPartner';
//import Clients from './components/Clients';
import Service from '../Home/components/Service';
import Footer from '../../components/Footer';
import { useTranslation } from 'react-i18next';
import {
  getFourJapanCompany,
  getFourVietNamCompany,
} from '../../store/apiCall';
import Company from '../Home/components/Company/index.jsx';
import { COUNTRY } from '../../constant/constant';
import bannerBM from '../../assets/posterVJBC.png';
import style from './index.scss';
import CompanyList from '../Search/components/CompanyList';

const Landing = () => {
  const isScrolled = false;
  const { t } = useTranslation();
  const [japanCompanys, setJapanCompanys] = useState([]);
  const [vietNamCompanys, setVietNamCompanys] = useState([]);

  useEffect(() => {
    getFourJapanCompany()
      .then(data => {
        setJapanCompanys(data);
      })
      .catch(err => {
        console.log(err);
      });

    getFourVietNamCompany()
      .then(data => {
        setVietNamCompanys(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Home_container">
      {/* <div className="header_top">
        <div className="header_top_container">
          <div className="row">
            <div className="left_row"></div>
            <div className="right_row">
              
            </div>
          </div>
        </div>
      </div> */}
      <Translate />
      <Navbar />
      <Header props="landing" />
      <div className="events_matching_container">
        <h3 className="matching_title" id="events">
          {t('Upcoming Business Matching Events')}
        </h3>
        <Row gutter={[32, 32]} justify={'center'}>
          <Col md={10} xs={12}>
            <Link to="/bm1">
              <div className="event_matching_content">
                <img src={bannerBM} alt="" />
              </div>
            </Link>
          </Col>
        </Row>
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title" id="members">
          {t('Prominent Partners')}
        </h3>
        <h1 className="title">
          {t('Representative Company In')} <span>{t(`Japan`)}</span>
        </h1>
        <Col xl={24} lg={21}>
          <CompanyList companys={japanCompanys} page="landing" />
        </Col>
        <h1 className="title">
          {t('Representative Company In')} <span>{t(`Viet Nam`)}</span>
        </h1>
        <Col xl={24} lg={21}>
          <CompanyList companys={vietNamCompanys} page="landing" />
        </Col>
        {/* <Row gutter={[32, 32]} justify={'center'}>
          <Company companys={japanCompanys} title={COUNTRY.JP} />
        </Row> */}
        {/* <Row gutter={[32, 32]} justify={'center'}>
          <Company companys={vietNamCompanys} title={COUNTRY.VN} />
        </Row> */}
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title" id="professional">
          {t('EXPERTS SUPPORTING US')}
        </h3>
        <SlideImage props={'professional'} />
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title" id="contact">
          {t('Please contact us')}
        </h3>
        <Contact />
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">
          {t('Search for partners by keyword')}
        </h3>
        <FindPartner />
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">
          {t('Search for partners by industry')}
        </h3>
        <Service />
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title" id="client">
          {t('Our partners and customers')}
        </h3>
        <SlideImage props={'partner'} />
      </div>

      <Footer />
      <div className={isScrolled ? style.backtop : style.hidden}>
        <BackTop />
        <span className={style.animation}></span>
      </div>
    </div>
  );
};

export default Landing;
