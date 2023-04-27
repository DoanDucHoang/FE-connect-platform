import React from 'react';
import { Col, Row } from 'antd';
import style from './index.module.scss';
import Wrapper from '../../../../components/Wrapper';

const Team = ({ company_core_members }) => {
  return (
    <Wrapper className={style.wrapper}>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>NHÂN SỰ CHỦ CHỐT</h1>
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
                <h6>
                  {item.member_position} <br /> {item.member_desc}
                </h6>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

export default Team;
