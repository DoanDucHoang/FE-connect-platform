import React from 'react';
import banner from '../../assets/banner_platform.png';
import style from './index.module.scss';

const Header = () => {
  return (
    <div className={style.wrapper}>
      <img src={banner} alt='banner' />
    </div>
  );
};

export default Header;
