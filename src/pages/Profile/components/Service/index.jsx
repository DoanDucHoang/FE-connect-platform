import { Button, Col, Row } from 'antd';
import style from './index.module.scss';
import { useTranslation } from 'react-i18next';
import Wrapper from '../../../../components/Wrapper';
import { useEffect, useState } from 'react';
import ModalSpecialties from '../Modal/modalSpecialties';
import { useSelector } from 'react-redux';

const Service = ({ company_specialties }) => {
  const { t } = useTranslation();
  const user = useSelector(state => state.auth.currentUser);
  const data = company_specialties || [];
  const [lang, setLang] = useState('');
  useEffect(() => {
    setLang(localStorage.getItem('lang') || 'en');
  }, [localStorage.getItem('lang')]);

  return (
    <Wrapper>
      <Row justify={'center'} style={{ marginBottom: '20px' }}>
        <h1 className={style.h1_title}>{t('COMPANY FEATURES')}</h1>
        {user.company_name === data[0]?.company_name ? (
          <ModalSpecialties props={company_specialties} />
        ) : (
          ''
        )}
      </Row>
      <Row gutter={[16, 16]} justify={'center'}>
        {company_specialties?.map(item => (
          <Col xl={8} lg={8} sm={8} xs={24} key={item.id}>
            {lang === 'vn' ? (
              <div className={style.box}>
                {/* <i className="far fa-comment-alt"></i> */}
                <img src={item.speciality_picture} alt="" />
                <h3>{item.speciality_desc}</h3>
              </div>
            ) : lang === 'jp' ? (
              <div className={style.box}>
                {/* <i className="far fa-comment-alt"></i> */}
                <img src={item.speciality_picture} alt="" />
                <h3>{item.speciality_desc_jp}</h3>
              </div>
            ) : (
              <div className={style.box}>
                {/* <i className="far fa-comment-alt"></i> */}
                <img src={item.speciality_picture} alt="" />
                <h3>{item.speciality_desc_en}</h3>
              </div>
            )}
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

export default Service;
