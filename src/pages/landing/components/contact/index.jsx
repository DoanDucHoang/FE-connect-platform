import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import './index.scss';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div className="contact_container">
      <div className="contact_button">
        <button className="button_left">{t('Member Register')}</button>
        <button className="button_right">{t('Register For Consultation')}</button>
      </div>

      <div className="contact_text">
        <i className="fas fa-envelope mrr-10"></i>
        <span>anken@vietjapan.co</span>
      </div>
    </div>
  );
};

export default Contact;
