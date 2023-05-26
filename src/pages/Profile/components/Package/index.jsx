import { Card, Col, Row } from 'antd';
import style from './index.module.scss';
import Wrapper from '../../../../components/Wrapper';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createMarkup } from '../../hooks';
import ReadMore from '../../../../components/ReadMore/ReadMore';

const Package = ({ company_products }) => {
  const { t } = useTranslation();
  const [lang, setLang] = useState('');
  useEffect(() => {
    setLang(localStorage.getItem('lang') || 'en');
  }, [localStorage.getItem('lang')]);

  return (
    <Wrapper>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>{t('MAIN SERVICES')}</h1>
      </Row>
      <Row gutter={[32, 32]} justify={'center'}>
        {company_products?.map(item => (
          <Col xl={12} xs={24} key={item.id}>
            <Card
              hoverable
              cover={
                <img alt="example" src={item.product_picture} height={300} />
              }
            >
              <div className={style.content}>
                {lang === 'vn' ? (
                  <>
                    <h3>{item.product_name}</h3>
                    <div
                      dangerouslySetInnerHTML={createMarkup(
                        item.product_description
                      )}
                    />
                  </>
                ) : lang === 'jp' ? (
                  <>
                    <h3>{item.product_name_JP}</h3>
                    <div
                      dangerouslySetInnerHTML={createMarkup(
                        item.product_description_JP
                      )}
                    />
                  </>
                ) : (
                  <>
                    <h3>{item.product_name_EN}</h3>
                    <div
                      dangerouslySetInnerHTML={createMarkup(
                        item.product_description_EN
                      )}
                    />
                  </>
                )}

                {/* <ReadMore>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.product_description_JP,
                    }}
                  />
                </ReadMore> */}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

export default Package;
