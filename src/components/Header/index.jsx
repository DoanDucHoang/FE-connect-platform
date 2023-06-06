import React from 'react';
import bannerHome from '../../assets/logobanner.png';
import bannerBM from '../../assets/posterVJBC.png';
import style from './index.module.scss';

const Header = props => {
  return (
    <div className={style.wrapper}>
      {props.props === 'landing' ? (
        <img src={bannerHome} alt="banner" />
      ) : (
        <img src={bannerBM} alt="banner" />
      )}
    </div>
  );
};

export default Header;
