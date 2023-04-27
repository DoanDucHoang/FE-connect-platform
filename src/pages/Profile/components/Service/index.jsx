import { Col, Row } from 'antd';
import style from './index.module.scss';
import Wrapper from '../../../../components/Wrapper';

const Service = ({ company_specialties }) => {
  return (
    <Wrapper>
      <Row justify={'center'}>
        <h1 className={style.h1_title}>ĐẶC TRƯNG CÔNG TY</h1>
      </Row>
      <Row gutter={[16, 16]} justify={'center'}>
        {company_specialties?.map(item => (
          <Col xl={8} lg={8} sm={8} xs={24} key={item.id}>
            <div className={style.box}>
              {/* <i className="far fa-comment-alt"></i> */}
              <img src={item.speciality_picture} alt="" />
              <h3>{item.speciality_desc}</h3>
            </div>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

export default Service;
