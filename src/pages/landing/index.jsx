import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import { Col, Row } from 'antd';
import Wrapper from '../../components/Wrapper';
import Translate from '../../components/Translate';
import banner from '../../assets/banner_platform.png';
import './index.scss';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="Home_container">
      <div className="header_top">
        <div className="header_top_container">
          <div className="row">
            <div className="left_row"></div>
            <div className="right_row">
              <Translate />
              <div>hello</div>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
      <Header />
      <div className="events_matching_container">
        <h3 className="matching_title">Các sự kiện kết nối sắp diễn ra</h3>
        <Row gutter={[32, 32]} justify={'center'}>
          <Col md={10} xs={12}>
            <Link to={`http://localhost:3000/bm1`}>
              <div className="event_matching_content">
                <img
                  src="https://static.wixstatic.com/media/975df9_b0e31b59afd84fee9b59595633d74f28~mv2.jpg/v1/fill/w_843,h_474,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/975df9_b0e31b59afd84fee9b59595633d74f28~mv2.jpg"
                  alt=""
                />
              </div>
            </Link>
          </Col>
          <Col md={10} xs={12}>
            <div className="event_matching_content">
              <img
                src="https://static.wixstatic.com/media/975df9_b15868cce19c4cf99b6a649b517f302b~mv2.png/v1/fill/w_479,h_270,fp_0.50_0.50,q_95,enc_auto/975df9_b15868cce19c4cf99b6a649b517f302b~mv2.png"
                alt=""
              />
            </div>
          </Col>
          <Col md={10} xs={12}>
            <div className="event_matching_content">
              <img
                src="https://static.wixstatic.com/media/975df9_b0e31b59afd84fee9b59595633d74f28~mv2.jpg/v1/fill/w_843,h_474,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/975df9_b0e31b59afd84fee9b59595633d74f28~mv2.jpg"
                alt=""
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">Các đối tác nổi bật</h3>
        <Row gutter={[32, 32]} justify={'center'}></Row>
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">Các chuyên gia hỗ trợ chúng tôi</h3>
        <Wrapper>
          <Row gutter={[16, 16]} justify={'center'}>
            <Col xl={6} lg={8} md={12} sm={24}>
              <div className="picture_member">
                <img src="" alt="" height={280} width={280} />
                <div className="info_member">
                  <h3></h3>
                  <h6></h6>
                </div>
              </div>
            </Col>
          </Row>
        </Wrapper>
      </div>
    </div>
  );
};

export default Profile;
