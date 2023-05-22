import { Col, Row } from 'antd';
import Container from '../../../../components/Container';
import style from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Service = () => {
  const { t } = useTranslation();
  return (
    <Container>
      {/* <Row justify={'center'}>
        <h1 className={style.service__title}>
          {t('GROUPS OF BUSINESS PARTICIPANTS')}
        </h1>
      </Row> */}
      <div className={style.wrapper}>
        <Row gutter={[32, 32]}>
          <Col xl={6} lg={12} md={12} xs={24}>
            <div className={style.service__box}>
              <div className={style.icon}>
                <span className="test">
                  <i className="fas fa-plane-departure"></i>
                  {/* <i className="fas fa-building"></i> */}
                </span>
              </div>
              <div className={style.service__content}>
                <h3 className={style.title}>
                  {t('Travel, Entertainment and Design')}
                </h3>
                <p className={style.para}>
                  {t(
                    'Legal, accounting, sales support, etc. for Japanese investors'
                  )}
                </p>
              </div>
            </div>
          </Col>
          <Col xl={6} lg={12} md={12} xs={24}>
            <div className={style.service__box}>
              <div className={style.icon}>
                <span className="test">
                  <FontAwesomeIcon icon={faUtensils} />
                  {/* <i className="fab fa-dev"></i> */}
                </span>
              </div>
              <div className={style.service__content}>
                <h3 className={style.title}>
                  {t('Food and service industry')}
                </h3>
                <p className={style.para}>
                  {t(
                    'System introduction, WEB, application development, DX service'
                  )}
                </p>
              </div>
            </div>
          </Col>
          <Col xl={6} lg={12} md={12} xs={24}>
            <div className={style.service__box}>
              <div className={style.icon}>
                <span className="test">
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                  {/* <i className="fas fa-user"></i> */}
                </span>
              </div>
              <div className={style.service__content}>
                <h3 className={style.title}>{t('Trend-Following Business')}</h3>
                <p className={style.para}>
                  {t(
                    'Introduce Japanese-speaking Vietnamese locals and human resources in Japan'
                  )}
                </p>
              </div>
            </div>
          </Col>
          <Col xl={6} lg={12} md={12} xs={24}>
            <div className={style.service__box}>
              <div className={style.icon}>
                <span className="test">
                  <i className="fab fa-dev"></i>
                  {/* <i className="fas fa-book-open"></i> */}
                </span>
              </div>
              <div className={style.service__content}>
                <h3 className={style.title}>
                  {t('Related to Information Technology')}
                </h3>
                <p className={style.para}>
                  {t(
                    'Having a Japanese language education center for children and adults'
                  )}{' '}
                </p>
              </div>
            </div>
          </Col>
          <Col xl={6} lg={12} md={12} xs={24}>
            <div className={style.service__box}>
              <div className={style.icon}>
                <span className="test">
                  <FontAwesomeIcon icon={faGears} />
                  {/* <i className="fas fa-plane-departure"></i> */}
                </span>
              </div>
              <div className={style.service__content}>
                <h3 className={style.title}>
                  {t('Regarding Technical Interns')}
                </h3>
                <p className={style.para}>
                  {t(
                    'Japanese-speaking Japan-Vietnam sightseeing and rental car services'
                  )}{' '}
                </p>
              </div>
            </div>
          </Col>
          <Col xl={6} lg={12} md={12} xs={24}>
            <div className={style.service__box}>
              <div className={style.icon}>
                <span className="test">
                  <FontAwesomeIcon icon={faSchool} />
                  {/* <i className="fas fa-cut"></i> */}
                </span>
              </div>
              <div className={style.service__content}>
                <h3 className={style.title}>{t('Education and Care')}</h3>
                <p className={style.para}>
                  {t('Machining plastics, CNC accessories, jewelry, etc.')}
                </p>
              </div>
            </div>
          </Col>
          <Col xl={6} lg={12} md={12} xs={24}>
            <div className={style.service__box}>
              <div className={style.icon}>
                <span className="test">
                  <FontAwesomeIcon icon={faGlobe} />
                  {/* <i className="fas fa-tshirt"></i> */}
                </span>
              </div>
              <div className={style.service__content}>
                <h3 className={style.title}>{t('Expansion to Vietnam')}</h3>
                <p className={style.para}>
                  {t(
                    'Clothing design and production services for domestic and overseas markets'
                  )}{' '}
                </p>
              </div>
            </div>
          </Col>
          <Col xl={6} lg={12} md={12} xs={24}>
            <div className={style.service__box}>
              <div className={style.icon}>
                <span className="test">
                  <i className="fas fa-industry"></i>
                </span>
              </div>
              <div className={style.service__content}>
                <h3 className={style.title}>{t('Others')}</h3>
                <p className={style.para}>
                  {t(
                    'Support in industrial zones, consulting and provision of fisheries and agricultural products, etc.'
                  )}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Service;
