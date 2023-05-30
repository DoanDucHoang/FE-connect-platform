import React, { useEffect, useState } from 'react';
import { Button, Row } from 'antd';
import Wrapper from '../../../../components/Wrapper';
import ModalIntroduce from '../Modal/modalIntroduce.jsx';
import style from './index.module.scss';
import { createMarkup } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Introduce = ({ company_description }) => {
  const { t } = useTranslation();
  const data = company_description || [];
  const user = useSelector(state => state.auth.currentUser);
  const [lang, setLang] = useState('');
  useEffect(() => {
    setLang(localStorage.getItem('lang') || 'en');
  }, [localStorage.getItem('lang')]);

  return (
    <Wrapper>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>{t('INTRODUCTION')}</h1>
        {user.company_name === data[0]?.company_name ? (
          <ModalIntroduce props={company_description} email={user.email} />
        ) : (
          ''
        )}
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
