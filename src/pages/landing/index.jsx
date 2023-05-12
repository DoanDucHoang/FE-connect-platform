import React from 'react';
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
import style from './index.scss';

const Landing = () => {
  const isScrolled = false;
  const { t } = useTranslation();
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
      <Header />
      <div className="events_matching_container">
        <h3 className="matching_title">{t('Upcoming Business Matching Events')}</h3>
        <Row gutter={[32, 32]} justify={'center'}>
          <Col md={10} xs={12}>
            <Link to="/bm1">
              <div className="event_matching_content">
                <img
                  src="https://static.wixstatic.com/media/975df9_b0e31b59afd84fee9b59595633d74f28~mv2.jpg/v1/fill/w_843,h_474,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/975df9_b0e31b59afd84fee9b59595633d74f28~mv2.jpg"
                  alt=""
                />
              </div>
            </Link>
          </Col>
          <Col md={10} xs={12}>
            <div className="event_matching_content">
              <img
                src="https://static.wixstatic.com/media/975df9_b15868cce19c4cf99b6a649b517f302b~mv2.png/v1/fill/w_479,h_270,fp_0.50_0.50,q_95,enc_auto/975df9_b15868cce19c4cf99b6a649b517f302b~mv2.png"
                alt=""
              />
            </div>
          </Col>
          <Col md={10} xs={12}>
            <div className="event_matching_content">
              <img
                src="https://static.wixstatic.com/media/975df9_b0e31b59afd84fee9b59595633d74f28~mv2.jpg/v1/fill/w_843,h_474,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/975df9_b0e31b59afd84fee9b59595633d74f28~mv2.jpg"
                alt=""
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">{t('Prominent Partners')}</h3>
        <Row gutter={[32, 32]} justify={'center'}></Row>
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">{ t('EXPERTS SUPPORTING US')}</h3>
        <SlideImage props={'professional'} />
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">{t('Please contact us')}</h3>
        <Contact />
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">{t('Search for partners by keyword')}</h3>
        <FindPartner />
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">{t('Search for partners by industry')}</h3>
        <Service />
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">
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
