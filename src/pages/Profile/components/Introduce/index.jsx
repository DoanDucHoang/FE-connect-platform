import React, { useEffect, useState } from 'react';
import { Button, Row } from 'antd';
import Wrapper from '../../../../components/Wrapper';
import ModalIntroduce from '../Modal/modalIntroduce.jsx';
import style from './index.module.scss';
import { createMarkup } from '../../hooks';
import { useTranslation } from 'react-i18next';

const Introduce = ({ company_description }) => {
  const { t } = useTranslation();
  const [lang, setLang] = useState('');
  useEffect(() => {
    setLang(localStorage.getItem('lang') || 'en');
  }, [localStorage.getItem('lang')]);

  return (
    <Wrapper>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>{t('INTRODUCTION')}</h1>

        {/* <Button type="primary" size={'default'} style={{ margin: 'auto 10px' }}>
          Edit
        </Button> */}
        <ModalIntroduce props={company_description} />
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
