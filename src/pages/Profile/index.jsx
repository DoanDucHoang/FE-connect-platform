import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import Navbar from '../../components/Navbar';

const Profile = () => {
  const user = useSelector(state => state.auth.currentUser);
  console.log('🚀 ~ file: index.jsx:23 ~ Profile ~ user:', user.id);
  const { email, company_name } = user;
  const [info, setInfo] = useState({});
  const [slotBooking, setSlotBooking] = useState([]);
  const { username } = useParams();
  console.log('🚀 ~ file: index.jsx:28 ~ Profile ~ username:', username);
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

  const handleClick = () => {
    try {
      pushSlotBooking(slotBooking);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <>
      <Navbar />
      <div className={style.container}>
        <Row justify={'space-between'}>
          <Col span={8}>
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
          <Col span={14}>
            <h3 className={style.title}>
              {{ ...company_info }[0]?.company_name.toUpperCase()}
            </h3>
            <Row>
              <Col xl={12} xs={24}>
                <Row align={'middle'} className={style.content__item}>
                  <span>Establishment: </span>
                  <p>{{ ...company_info }[0]?.estalishment}</p>
                </Row>
              </Col>
              <Col xl={12} xs={24}>
                <Row align={'middle'} className={style.content__item}>
                  <span>Employers: </span>
                  <p>{{ ...company_info }[0]?.employers}</p>
                </Row>
              </Col>
            </Row>
            <Row align={'middle'} className={style.content__item}>
              <span>Capital: </span>
              <p>$ {{ ...company_info }[0]?.capital}</p>
            </Row>
            <p className={style.addresss}>{{ ...company_info }[0]?.address}</p>
            <Row className={style.flag}>
              <img src={logo1} alt="" />
              <img src={logo2} alt="" />
              <img src={logo3} alt="" />
              <img src={logo4} alt="" />
            </Row>
          </Col>
          <Col span={10}>
            <div className={style.category}>
              <span>Category:</span>
              {{ ...company_info }[0]?.category}
            </div>
            <div style={{ marginTop: '20px', fontWeight: '600' }}>Needs :</div>
            <div className={style.customer}>
              <div className={style.customer__item}>
                {{ ...company_info }[0]?.needs}
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
        <Container>
          <Row justify={'center'} className={style.checkbox}>
            <h1 className={style.h1_title}>LỊCH CÓ THỂ HẸN BOOK</h1>
          </Row>
          {slot_booking?.map(item => (
            <Row
              justify={'center'}
              className={style.checkbox}
              key={item.slot_booking}
            >
              <span>Slot {item.slot_booking}</span>
              <span style={{ margin: '0 10px' }}>
                {item.company_name_booking ? (
                  <Checkbox disabled checked />
                ) : (
                  <Checkbox onChange={e => handleChange(e, item)} />
                )}
              </span>
              <span>
                {item.start_time_booking} - {item.end_time_booking}
              </span>
            </Row>
          ))}
          <Row justify={'center'} className={style.checkbox}>
            <button className={style.button} onClick={handleClick}>
              Book
            </button>
          </Row>
        </Container>
      ) : (
        ''
      )}
    </>
  );
};

export default Profile;
