import React, { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Package from './components/Package';
import style from './index.module.scss';
import { Checkbox, Col, Row } from 'antd';
import Service from './components/Service';
import Team from './components/Team';
import Customer from './components/Customer';
import Container from '../../components/Container';
import Introduce from './components/Introduce';
import { pushSlotBooking } from '../../store/apiCall.js';

import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';
import logo3 from '../../assets/logo3.png';
import logo4 from '../../assets/logo4.png';
import { getCompany } from '../../store/apiCall';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar';
import Translate from '../../components/Translate';
import Footer from '../../components/Footer';
import Modal from '../Search/components/Modal';
import ModalIntroduce from './components/Modal/modalIntroduce';
import ModalInfo from './components/Modal/modalInfo';

const Profile = () => {
  const user = useSelector(state => state.auth.currentUser);
  //const [lang, setLang] = useState();
  const { t } = useTranslation();
  const { email, company_name } = user;
  const [info, setInfo] = useState({});
  const [slotBooking, setSlotBooking] = useState([]);
  let { state } = useLocation();
  const { username } = useParams();
  const [queryParameters] = useSearchParams();

  const {
    company_core_members,
    company_description,
    company_info,
    company_main_clients,
    company_products,
    company_specialties,
    slot_booking,
  } = info;

  useEffect(() => {
    username
      ? getCompany(username)
          .then(data => {
            setInfo(data);
          })
          .catch(err => {
            console.log(err);
          })
      : getCompany(user.id)
          .then(data => {
            setInfo(data);
          })
          .catch(err => {
            console.log(err);
          });
  }, [user.company_name, username]);

  const handleChange = (e, data) => {
    let index = slotBooking.findIndex(item => item.id === data.id);
    if (e.target.checked) {
      data.company_name_booking = company_name;
      slotBooking.push(data);
    } else {
      slotBooking.splice(index, 1);
    }
  };

  return (
    <>
      <Translate />
      <Navbar />
      <div className={style.container}>
        <Row justify={'space-between'}>
          <Col span={8}>
            <img
              className={style.banner}
              src={{ ...company_info }[0]?.company_logo}
              alt=""
            />
          </Col>
          <Col
            span={6}
            style={{
              textAlign: 'center',
              display: 'block',
              alignContent: 'center',
              alignSelf: 'center',
            }}
          >
            {user.company_name === { ...company_info }[0]?.company_name
              ? // <ModalInfo props={company_info} />
                ''
              : ''}
          </Col>
        </Row>
        <Row className={style.content}>
          <Col span={14}>
            <h3 className={style.title}>
              {{ ...company_info }[0]?.company_name.toUpperCase()}
            </h3>
            <Row>
              <Col xl={12} xs={24}>
                <Row align={'middle'} className={style.content__item}>
                  <span>{t('Establishment')}: </span>
                  <p>{{ ...company_info }[0]?.estalishment}</p>
                </Row>
              </Col>
              <Col xl={12} xs={24}>
                <Row align={'middle'} className={style.content__item}>
                  <span>{t('Employers')}: </span>
                  <p>{{ ...company_info }[0]?.employers}</p>
                </Row>
              </Col>
            </Row>
            <Row align={'middle'} className={style.content__item}>
              <span>{t('Capital')}: </span>
              <p>$ {{ ...company_info }[0]?.capital}</p>
            </Row>
            <p className={style.addresss}>
              {{ ...company_info }[0]?.address_jp}
            </p>
            <Row className={style.flag}>
              <img src={logo1} alt="" />
              {{ ...company_info }[0]?.languages === 'japan' ? (
                <img src={logo4} alt="" />
              ) : (
                ''
              )}
              {/* <img src={logo1} alt="" />
              <img src={logo2} alt="" />
              <img src={logo3} alt="" />
              <img src={logo4} alt="" /> */}
            </Row>
          </Col>
          <Col span={10}>
            <div className={style.category}>
              <span>{t('Category')}:</span>
              {{ ...company_info }[0]?.category}
            </div>
            <div style={{ marginTop: '20px', fontWeight: '600' }}>
              {t('Needs')} :
            </div>
            <div className={style.customer}>
              <div className={style.customer__item}>
                {{ ...company_info }[0]?.needs_jp}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Introduce company_description={company_description} />
      <Package company_products={company_products} />
      <Service company_specialties={company_specialties} />
      <Team company_core_members={company_core_members} />
      <Customer company_main_clients={company_main_clients} />
      {{ ...company_info }[0]?.country != 'Viet Nam' ? (
        <Container id="booking">
          <Row justify={'center'} className={style.checkbox}>
            <h1 className={style.h1_title}>{t('BOOKING RIGHT HERE')}</h1>
          </Row>
          <Row justify={'center'} className={style.checkbox}>
            <div style={{ height: '50px' }}>
              <Modal props={state} />
            </div>
          </Row>
        </Container>
      ) : (
        ''
      )}
      <Footer />
    </>
  );
};

export default Profile;
