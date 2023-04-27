import { Col, Row } from 'antd';
import Container from '../../../../components/Container';
import style from './index.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper';

import logo1 from '../../../../assets/logo1.png';
import logo2 from '../../../../assets/logo2.png';
import logo3 from '../../../../assets/logo3.png';
import logo4 from '../../../../assets/logo4.png';

const Company = ({ companys, title }) => {
  console.log('🚀 ~ file: index.jsx:21 ~ Company ~ companys:', companys);
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <Row justify={'center'}>
        <h1 className={style.company__title}>
          {t('Representative Company In')} <span>{t(`${title}`)}</span>
        </h1>
      </Row>
      <Swiper
        style={{ zIndex: '0' }}
        slidesPerView={1}
        spaceBetween={8}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        breakpoints={{
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {companys.map(item => (
          <SwiperSlide key={item.id}>
            <Link to={`/profile/${item.company_name}`}>
              <div className={style.container}>
                <Row justify={'space-between'} align={'middle'}>
                  <Col span={12}>
                    <img
                      className={style.banner}
                      src="https://vj-partner.com/uploads/img/general/1638966072-logo-VJP-[306x75].png"
                      alt=""
                    />
                  </Col>
                  <Col span={6}>
                    <img
                      className={style.logo}
                      src="https://investment-day-assets.sgp1.digitaloceanspaces.com/ybahcm/2021/03/23214250/Logo-YBA-2.png"
                      alt=""
                    />
                  </Col>
                </Row>
                <Row className={style.content}>
                  <Col span={14} className={style.content__container}>
                    <h3 className={style.title}>{item.company_name}</h3>
                    <Row className={style.content__top}>
                      <Col xl={12} lg={24}>
                        <Row align={'middle'} className={style.content__item}>
                          <span>{t('Years Of Establishment:')} </span>
                          <p>{item.estalishment}</p>
                        </Row>
                      </Col>
                      <Col xl={12} lg={24}>
                        <Row align={'middle'} className={style.content__item}>
                          <span>{t('Employers')} </span>
                          <p>{item.employers}</p>
                        </Row>
                      </Col>
                    </Row>
                    <Row align={'middle'} className={style.content__item}>
                      <span>{t('Capital')}: </span>
                      <p>$ {item.capital}</p>
                    </Row>
                    <p className={style.addresss}>{item.address}</p>
                    <Row className={style.flag}>
                      <img src={logo1} alt="" />
                      <img src={logo2} alt="" />
                      <img src={logo3} alt="" />
                      <img src={logo4} alt="" />
                    </Row>
                  </Col>
                  <Col span={10} className={style.customer__container}>
                    <div className={style.category}>
                      <span>{t('Category')}:</span>
                      {item.category}
                    </div>
                    <p>Needs</p>
                    <div className={style.customer}>
                      <div className={style.customer__item}>{item.needs}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Company;
