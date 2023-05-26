import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import Wrapper from '../../../../components/Wrapper';
import style from './index.module.scss';
import { createMarkup } from '../../hooks';
import { useTranslation } from 'react-i18next';

const Introduce = ({ company_description }) => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('');
  useEffect(() => {
    setLang(localStorage.getItem('lang') || 'en');
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
    console.log('object');
  }, [localStorage.getItem('lang')]);

  return (
    <Wrapper>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>{t('INTRODUCTION')}</h1>
      </Row>
      {lang === 'vn' ? (
        <>
          {company_description?.map(item => (
            <div
              dangerouslySetInnerHTML={createMarkup(item.description)}
              key={item.id}
            />
          ))}
        </>
      ) : lang === 'jp' ? (
        <>
          {company_description?.map(item => (
            <div
              dangerouslySetInnerHTML={createMarkup(item.descriptionJP)}
              key={item.id}
            />
          ))}
        </>
      ) : (
        <>
          {company_description?.map(item => (
            <div
              dangerouslySetInnerHTML={createMarkup(item.descriptionEN)}
              key={item.id}
            />
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default Introduce;
