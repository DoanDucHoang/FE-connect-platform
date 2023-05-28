import { Button, Card, Col, Row } from 'antd';
import style from './index.module.scss';
import Wrapper from '../../../../components/Wrapper';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createMarkup } from '../../hooks';
import Modal from '../Modal/modalProduct.jsx';
import ReadMore from '../../../../components/ReadMore/ReadMore';
import { useSelector } from 'react-redux';

const Package = ({ company_products }) => {
  const { t } = useTranslation();
  const user = useSelector(state => state.auth.currentUser);
  const data = company_products || [];
  const [lang, setLang] = useState('');
  useEffect(() => {
    setLang(localStorage.getItem('lang') || 'en');
  }, [localStorage.getItem('lang')]);

  return (
    <Wrapper>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>{t('MAIN SERVICES')}</h1>
        {user.company_name === data[0]?.company_name ? (
          <Modal props={company_products} />
        ) : (
          ''
        )}
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
                    <div className={style.more_content}>
                      <div
                        dangerouslySetInnerHTML={createMarkup(
                          item.product_description
                        )}
                      />
                    </div>
                  </>
                ) : lang === 'jp' ? (
                  <>
                    <h3>{item.product_name_JP}</h3>
                    <div className={style.more_content}>
                      <div
                        dangerouslySetInnerHTML={createMarkup(
                          item.product_description_JP
                        )}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h3>{item.product_name_EN}</h3>
                    <div className={style.more_content}>
                      <div
                        dangerouslySetInnerHTML={createMarkup(
                          item.product_description_EN
                        )}
                      />
                    </div>
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
