import React from 'react';
import { Col, Row } from 'antd';
import style from './index.module.scss';
import Wrapper from '../../../../components/Wrapper';

const Customer = ({ company_main_clients }) => {
  return (
    <Wrapper>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>-KHÁCH HÀNG-</h1>
      </Row>
      <Row justify={'center'} gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {company_main_clients?.map((item) => (
          <Col
            xl={3}
            lg={6}
            md={6}
            sm={12}
            xs={24}
            className={style.container}
            key={item.id}
          >
            <img
              className={style.logo}
              src='https://bm3.bnihcmc6.com/_next/image?url=%2Fvjp.jpg&w=640&q=75'
              alt=''
            />
            <span className={style.tooltiptext}>{item.company_name}</span>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

export default Customer;
