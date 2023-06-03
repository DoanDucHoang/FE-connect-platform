import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Benefit from './components/Benefit';
import Company from './components/Company';
import Donors from './components/Donors';
import Service from './components/Service';
import TimeAddress from './components/TimeAddress';
import { BackTop, Col } from 'antd';
import style from './index.module.scss';
import { useEffect, useState } from 'react';
import { COUNTRY } from '../../constant/constant';
import Navbar from '../../components/Navbar';
import { getAllCompany } from '../../store/apiCall';
import Translate from '../../components/Translate';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CompanyList from '../Search/components/CompanyList';
import { scrollToTop } from '../../helper';
import { HashLoader } from 'react-spinners';

const Home = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset !== 0 ? true : false);
    return () => (window.onscroll = null);
  };
  const [companys, setCompanys] = useState([]);

  const companyVN = companys
    ? companys.filter(item => {
        return item.country === 'Viet Nam';
      })
    : [];
  const companyJP = companys
    ? companys.filter(item => {
        return item.country === 'Japan';
      })
    : [];

  useEffect(() => {
    setIsLoading(false);
    getAllCompany()
      .then(data => {
        setCompanys(data);
        setIsLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
    scrollToTop();
  }, []);

  return (
    <div className="container_bm">
      {!isLoading && (
        <div
          className="loading"
          style={{
            position: 'fixed',
            top: '0',
            width: '100vw',
            zIndex: '1000',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: '0.5',
            bottom: '0',
          }}
        >
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
      <Translate />
      <Navbar />
      <Header props="home" />
      <Benefit />
      <TimeAddress />
      <Donors />
      <Service />
      {/* <Company companys={companyVN} title={COUNTRY.VN} /> */}
      {/* <Company companys={companyJP} title={COUNTRY.JP} /> */}
      <h1 className="title">
        {t('Representative Company In')} <span>{t(`Japan`)}</span>
      </h1>
      <Col xl={24} lg={21}>
        <CompanyList companys={companyJP} page="home" />
      </Col>

      <div className={style.btncontainer} style={{ textAlign: 'center' }}>
        <Link to={'/bm1/search'}>
          <button className={style.btn}>
            {t('Register Business Matching')}
          </button>
        </Link>
      </div>
      <Footer />
      <div className={isScrolled ? style.backtop : style.hidden}>
        <BackTop />
        <span className={style.animation}></span>
      </div>
    </div>
  );
};

export default Home;
