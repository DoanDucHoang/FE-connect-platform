import React, { useState } from 'react';
import Container from '../../../../components/Container';
import { Col, Modal, Row } from 'antd';
import style from './index.module.scss';
import './index.css';
import Model from '../../../../components/Model';
import { Company1 } from '../../../../mock/dummyData';
import { useTranslation } from 'react-i18next';

const Donors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const { t, i18n } = useTranslation();
  const showModal = item => {
    setData(item);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Container>
      <Row justify={'center'} style={{ marginTop: '10px' }}>
        <h1 className={style.donor__title}>
          {t('DONORS')}
          <span>BUSINESS MATCHING 2023</span>
        </h1>
      </Row>
      <Row gutter={[32, 32]}>
        {Company1.map(item => (
          <Col md={6} xs={12} key={item.name}>
            <div className={style.donor__container}>
              <img onClick={() => showModal(item)} src={item.logo} alt="" />
            </div>
          </Col>
        ))}
      </Row>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <Model data={data} />
      </Modal>
    </Container>
  );
};

export default Donors;
