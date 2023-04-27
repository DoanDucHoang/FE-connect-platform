import { Card, Col, Row } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import style from './index.module.scss';
import Container from '../../../../components/Container';
import ReadMore from '../../../../components/ReadMore/ReadMore';
import benefit1 from '../../../../assets/benefit1.jpg';
import benefit2 from '../../../../assets/benefit2.jpg';
import common from '../../../../assets/common.jpg';
import { useTranslation } from 'react-i18next';

const Benefit = () => {
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <h3 className={style.benefit__title}>
        {t('BENEFITS OF JOINING')} <span>BUSINESS MATCHING</span>
      </h3>
      <Row gutter={16}>
        <Col className="gutter-row" xs={24} lg={8}>
          <Card
            hoverable
            className={style['benefit__card--item']}
            cover={<img alt="example" src={benefit1} />}
          >
            <h3>
              <span>
                <CaretRightOutlined />
              </span>
              {t('BUSINESS CONNECTION')}
            </h3>
            <ReadMore>
              {t(
                'Helping business owners promote their brands and exchange trade and connect business cooperation opportunities in the BNI CEO community At the same time, creating a personal brand for Business Owners - Secret Decide to have unlimited marketing resources.'
              )}
            </ReadMore>
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} lg={8}>
          <Card
            hoverable
            className={style['benefit__card--item']}
            cover={<img alt="example" src={benefit2} />}
          >
            <h3>
              <span>
                <CaretRightOutlined />
              </span>
              {t('COMPANION')}
            </h3>
            <ReadMore>
              {t(
                'Only available at Chapters of BNI HCM Central 6. Business Owner Professionals are trained under Power Team by Coaches The best business comes from ActionCOACH CBD Firm, helping to develop Developing a solid foundation for the business, improving leadership capacity effective leadership, management, strategy and business operations.'
              )}
            </ReadMore>
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} lg={8}>
          <Card
            hoverable
            className={style['benefit__card--item']}
            cover={<img alt="example" src={common} />}
          >
            <h3>
              <span>
                <CaretRightOutlined />
              </span>
              {t('CATCH THE TREND')}
            </h3>
            <ReadMore>
              {t(
                'Practical application according to the digital economy and the digital era, updated add the latest knowledge, skills and trends in both Vietnam and World.'
              )}
            </ReadMore>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Benefit;
