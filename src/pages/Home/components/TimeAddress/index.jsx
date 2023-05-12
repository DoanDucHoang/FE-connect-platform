import React from 'react';
import Container from '../../../../components/Container';
import { Col, Row } from 'antd';
import style from './index.module.scss';
//import useTimer from './hooks/useTimer';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { useTranslation } from 'react-i18next';
import Radium, { StyleRoot } from 'radium';

const TimeAddress = () => {
  //const timeArray = useTimer('2023-06-08T23:59:59');
  const { t } = useTranslation();
  //const [windowSize, setWindowSize] = useState(window.innerWidth);

  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     setWindowSize(window.innerWidth);
  //   };

  //   window.addEventListener('resize', handleWindowResize);

  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize);
  //   };
  //   console.log("🚀 ~ file: index.jsx:14 ~ TimeAddress ~ windowSize:", windowSize);
  // }, [window.innerWidth]);

  const styleFlipclock = {
    width: 140,
    height: 160,
    fontSize: 120,
    color: '#ffff',
    marginTop: '30px',

    '@media (maxWidth: 400px)': {
      display: 'none',
    },
  };

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

        {/* {timeArray.map(item => (
            <Col className="gutter-row" md={6} xs={12} key={item.title}>
              <div className={style.timeAddress__countdown}>
                <h1>{item.time}</h1>
                <span>{t(`${item.title}`)}</span>
              </div>
            </Col>
          ))} */}
        {/* <FlipClock
            type="countdown"
            count_to="2023-06-08 00:00:00"
            className={style.timeAddress__countdown}
          /> */}
        <div
          className="flipclock_container"
          style={{ justifyContent: 'center' }}
        >
          <StyleRoot>
            <FlipClockCountdown
              className="flipclock"
              to="2023-06-08T23:59:59"
              labels={[
                `${t('DAYS')}`,
                `${t('HOURS')}`,
                `${t('MINUTES')}`,
                `${t('SECONDS')}`,
              ]}
              labelStyle={{
                fontSize: 25,
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
              digitBlockStyle={
                // width: 140,
                // height: 160,
                // fontSize: 120,
                // color: '#f7f300',
                // marginTop: '30px',
                styleFlipclock
              }
              dividerStyle={{ height: 1 }}
              separatorStyle={{ color: 'white', size: '15px' }}
              duration={0.7}
              style={{ justifyContent: 'center' }}
            ></FlipClockCountdown>
          </StyleRoot>
        </div>

        <a className={style.linklogin} href="/">
          {t('REGISTRATION')}
        </a>
      </Container>
    </div>
  );
};

export default Radium(TimeAddress);
