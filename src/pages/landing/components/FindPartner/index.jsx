import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const FindPartner = () => {
  return (
    <div className="find_partner_container">
      <div className="find_partner_input">
        <input type="text" />
      </div>
      <div className="find_partner_button">
        <button className="button_left">Tìm Đối Tác Nhật</button>
        <button className="button_right">Tìm Đối Tác Việt Nam</button>
      </div>
    </div>
  );
};

export default FindPartner;
