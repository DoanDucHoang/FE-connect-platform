import React from 'react';
import { Col, Row } from 'antd';
import style from './index.module.scss';
import Wrapper from '../../../../components/Wrapper';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import ModalClient from '../Modal/modalClient';
import { useSelector } from 'react-redux';

const Customer = ({ company_main_clients }) => {
  const { t } = useTranslation();
  const user = useSelector(state => state.auth.currentUser);
  const data = company_main_clients || [];
  return (
    <Wrapper>
      <Row justify={'center'} style={{ marginBottom: '20px' }}>
        <h1 className={style.h1_title}>{t('COSTUMERS')}</h1>
        {user.company_name === data[0]?.company_name ? (
          <ModalClient props={company_main_clients} />
        ) : (
          ''
        )}
      </Row>
      <Row justify={'center'} gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {company_main_clients?.map(item => (
          <Col
            xl={3}
            lg={6}
            md={6}
            sm={12}
            xs={24}
            className={style.container}
            key={item.id}
            style={{ textAlign: 'center', alignItems: 'center' }}
          >
            <a href={item.client_url} target="_blank">
              <img className={style.logo} src={item.client_logo} alt="" />
              <span className={style.tooltiptext}>{item.client_name}</span>
            </a>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

export default Customer;
