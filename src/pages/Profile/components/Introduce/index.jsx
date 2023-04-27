import React from 'react';
import { Row } from 'antd';
import Wrapper from '../../../../components/Wrapper';
import style from './index.module.scss';
import { createMarkup } from '../../hooks';

const Introduce = ({ company_description }) => {
  return (
    <Wrapper>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>LỜI GIỚI THIỆU</h1>
      </Row>
      {company_description?.map((item) => (
        <div
          dangerouslySetInnerHTML={createMarkup(item.description)}
          key={item.id}
        />
      ))}
    </Wrapper>
  );
};

export default Introduce;
