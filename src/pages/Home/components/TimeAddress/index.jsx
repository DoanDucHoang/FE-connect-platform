import React from 'react';
import Container from '../../../../components/Container';
import { Col, Row } from 'antd';
import style from './index.module.scss';
import useTimer from './hooks/useTimer';
import { useTranslation } from 'react-i18next';

const TimeAddress = () => {
  const timeArray = useTimer('2023-06-08T23:59:59');
  const { t, i18n } = useTranslation();

  return (
    <div className={style.wrapper}>
      <Container>
        <Row
          style={{
            marginBottom: '30px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Col md={8} sm={24} className={style.timeAddress__container}>
            <Row>
              <Col span={5} className={style.timeAddress__icon}>
                <img
                  src="https://bm3.bnihcmc6.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faward.b74daf12.png&w=64&q=75"
                  alt=""
                />
              </Col>
              <Col span={19} className={style.timeAddress__info}>
                <h3>{t('TIME')}</h3>
                <p>{t('07:00 AM - 05:00 PM, Thursday, 11/8/2022')}</p>
                <p>{t('07:00 AM - 09:00 PM, Friday, 12/08/2022')}</p>
              </Col>
            </Row>
          </Col>
          <Col
            md={8}
            sm={24}
            className={style.timeAddress__container}
            style={{
              borderRight: '2px solid #4e6e6f',
              borderLeft: '2px solid #4e6e6f',
            }}
          >
            <Row>
              <Col span={5} className={style.timeAddress__icon}>
                <img
                  src="https://bm3.bnihcmc6.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flocation.9a5ecc41.png&w=640&q=75"
                  alt=""
                />
              </Col>
              <Col span={19} className={style.timeAddress__info}>
                <h3>{t('ADDRESS')}</h3>
                <p>
                  {t('ADORA Convention Center Nguyen Kiem, City. Ho Chi Minh')}
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={8} sm={24} className={style.timeAddress__container}>
            <Row>
              <Col span={5} className={style.timeAddress__icon}>
                <img
                  src="https://bm3.bnihcmc6.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbooks-stack-of-three.fef6b428.png&w=64&q=75"
                  alt=""
                />
              </Col>
              <Col span={19} className={style.timeAddress__info}>
                <h3>{t('Facebook Event')}</h3>
                <p>{t('07:00 AM - 05:00 PM, Thursday, 11/8/2022')}</p>
                <p>{t('07:00 AM - 09:00 PM, Friday, 12/08/2022')}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={24}>
          {timeArray.map(item => (
            <Col className="gutter-row" md={6} xs={12} key={item.title}>
              <div className={style.timeAddress__countdown}>
                <h1>{item.time}</h1>
                <span>{t('date', { item })}</span>
              </div>
            </Col>
          ))}
          {/* <FlipClock
            type="countdown"
            count_to="2023-06-08 00:00:00"
            className={style.timeAddress__countdown}
          /> */}
        </Row>
        <a className={style.linklogin} href="/">
          {t('REGISTRATION')}
        </a>
      </Container>
    </div>
  );
};

export default TimeAddress;
