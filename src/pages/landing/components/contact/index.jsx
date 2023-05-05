import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const Contact = () => {
  return (
    <div className="contact_container">
      <div className="contact_button">
        <button className="button_left">Đăng ký thành viên</button>
        <button className="button_right">Đăng ký tư vấn</button>
      </div>

      <div className="contact_text">
        <i className="fas fa-envelope mrr-10"></i>
        <span>anken@vietjapan.co</span>
      </div>
    </div>
  );
};

export default Contact;
