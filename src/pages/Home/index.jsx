import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Benefit from './components/Benefit';
import Company from './components/Company';
import Donors from './components/Donors';
import Service from './components/Service';
import TimeAddress from './components/TimeAddress';
import { BackTop } from 'antd';
import style from './index.module.scss';
import { useEffect, useState } from 'react';
import { COUNTRY } from '../../constant/constant';
import Navbar from '../../components/Navbar';
import { getAllCompany } from '../../store/apiCall';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset !== 0 ? true : false);
    return () => (window.onscroll = null);
  };
  const [companys, setCompanys] = useState([]);

  const companyVN = companys.filter((item) => {
    return item.country === 'Viet Nam';
  });
  const companyJP = companys.filter((item) => {
    return item.country === 'Japan';
  });

  useEffect(() => {
    getAllCompany()
      .then((data) => {
        setCompanys(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <Benefit />
      <TimeAddress />
      <Donors />
      <Service />
      <Company companys={companyVN} title={COUNTRY.VN} />
      <Company companys={companyJP} title={COUNTRY.JP} />
      <Footer />
      <div className={isScrolled ? style.backtop : style.hidden}>
        <BackTop />
        <span className={style.animation}></span>
      </div>
    </>
  );
};

export default Home;
