import React from 'react';
import { Col, Row } from 'antd';
import style from './index.module.scss';
import Wrapper from '../../../../components/Wrapper';
import { useTranslation } from 'react-i18next';

const Customer = ({ company_main_clients }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>{t('COSTUMERS')}</h1>
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
            <img className={style.logo} src={item.client_logo} alt="" />
            <span className={style.tooltiptext}>{item.client_name}</span>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

export default Customer;
