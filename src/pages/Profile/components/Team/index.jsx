import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import style from './index.module.scss';
import Wrapper from '../../../../components/Wrapper';
import { useTranslation } from 'react-i18next';
import ModalCoreMember from '../Modal/modalCoreMember';
import { useSelector } from 'react-redux';

const Team = ({ company_core_members }) => {
  const { t } = useTranslation();
  const user = useSelector(state => state.auth.currentUser);
  const data = company_core_members || [];
  const [lang, setLang] = useState('');
  useEffect(() => {
    setLang(localStorage.getItem('lang') || 'en');
  }, [localStorage.getItem('lang')]);

  return (
    <Wrapper className={style.wrapper}>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>{t('CORE MEMBERS')}</h1>
        {user.company_name === data[0]?.company_name ? (
          <ModalCoreMember props={company_core_members} />
        ) : (
          ''
        )}
      </Row>
      <Row gutter={[16, 16]} justify={'center'}>
        {company_core_members?.map(item => (
          <Col
            xl={6}
            lg={8}
            md={12}
            sm={24}
            className={style.container}
            key={item.id}
          >
            <div className={style.box}>
              <img src={item.member_picture} alt="" height={280} width={280} />
              <div className={style.content}>
                <h3>{item.member_name}</h3>
                {lang === 'vn' ? (
                  <h6>
                    {item.member_position} <br /> {item.member_desc}
                  </h6>
                ) : lang === 'jp' ? (
                  <h6>
                    {item.member_position_JP} <br /> {item.member_desc_JP}
                  </h6>
                ) : (
                  <h6>
                    {item.member_position_EN} <br /> {item.member_desc_EN}
                  </h6>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

export default Team;
