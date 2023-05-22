import React, { useEffect, useState } from 'react';
import image1 from '../../../../assets/voducthang.png';
import image2 from '../../../../assets/FushimiKiyoshi.jpg';
import image3 from '../../../../assets/YokoyamaKazuhisa.jpg';
import image4 from '../../../../assets/AkiraOoka.jpg';
import image5 from '../../../../assets/MochizukiGinko.jpg';
import image6 from '../../../../assets/InoueTadasu.jpg';
import './index.scss';

const SlideImage = props => {
  return (
    <div className="slide_container" id="professional">
      {props.props === 'professional' ? (
        <div className="slide_track">
          {/* image */}{' '}
          <div className="slide_image">
            <img src={image1} alt="" />
          </div>
          <div className="slide_image">
            <img src={image2} alt="" />
          </div>
          <div className="slide_image">
            <img src={image3} alt="" />
          </div>
          <div className="slide_image">
            <img src={image4} alt="" />
          </div>
          <div className="slide_image">
            <img src={image5} alt="" />
          </div>
          <div className="slide_image">
            <img src={image6} alt="" />
          </div>
          {/* duplicate image */}{' '}
          <div className="slide_image">
            <img src={image1} alt="" />
          </div>
          <div className="slide_image">
            <img src={image2} alt="" />
          </div>
          <div className="slide_image">
            <img src={image3} alt="" />
          </div>
          <div className="slide_image">
            <img src={image4} alt="" />
          </div>
          <div className="slide_image">
            <img src={image5} alt="" />
          </div>
          <div className="slide_image">
            <img src={image6} alt="" />
          </div>
        </div>
      ) : (
        <div className="slide_track">
          {/* image */}{' '}
          <div className="slide_image client">
            <a href="https://athlsolutions.com/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1646719172-athl.png"
                alt=""
              />
            </a>
          </div>
          <div className="slide_image client">
            <a href="https://lansium.com/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1647833443-lansium.png"
                alt=""
              />
            </a>
          </div>
          <div className="slide_image client">
            <a href="https://posapp.vn/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1647833219-1647509661-popapps.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="slide_image client">
            <a href="https://www.hurryupsolutions.com/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1647250696-22.png"
                alt=""
              />
            </a>
          </div>
          <div className="slide_image client">
            <a href="https://vmarketing.vn/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1647250592-vivas.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="slide_image client">
            <a href="https://inbachvuong.com/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1647250557-logo-01.jpg"
                alt=""
              />
            </a>
          </div>
          {/* duplicate image */}{' '}
          <div className="slide_image client">
            <a href="https://athlsolutions.com/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1646719172-athl.png"
                alt=""
              />
            </a>
          </div>
          <div className="slide_image client">
            <a href="https://lansium.com/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1647833443-lansium.png"
                alt=""
              />
            </a>
          </div>
          <div className="slide_image client">
            <a href="https://posapp.vn/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1647833219-1647509661-popapps.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="slide_image client">
            <a href="https://www.hurryupsolutions.com/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1647250696-22.png"
                alt=""
              />
            </a>
          </div>
          <div className="slide_image client">
            <a href="https://vmarketing.vn/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1647250592-vivas.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="slide_image client">
            <a href="https://inbachvuong.com/">
              <img
                src="https://vj-digital.com/uploads/img/sponsors/1647250557-logo-01.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideImage;
