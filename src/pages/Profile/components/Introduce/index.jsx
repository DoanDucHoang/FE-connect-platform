import React from 'react';
import { Row } from 'antd';
import Wrapper from '../../../../components/Wrapper';
import style from './index.module.scss';
import { createMarkup } from '../../hooks';
import { useTranslation } from 'react-i18next';

const Introduce = ({ company_description }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>{t('INTRODUCTION')}</h1>
      </Row>
      {company_description?.map(item => (
        <div
          dangerouslySetInnerHTML={createMarkup(item.descriptionJP)}
          key={item.id}
        />
      ))}
    </Wrapper>
  );
};

export default Introduce;
