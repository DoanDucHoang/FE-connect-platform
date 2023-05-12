import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import './index.scss';

const FindPartner = () => {
  const { t } = useTranslation();
  return (
    <div className="find_partner_container">
      <div className="find_partner_input">
        <input type="text" placeholder={t('Search your partners...') } />
      </div>
  
      <div className="find_partner_button">
        <button className="button_left">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>{t('Japan')}</span>
        </button>
        <button className="button_right">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>{t('Viet Nam')}</span>
        </button>
      </div>
    </div>
  );
};

export default FindPartner;
