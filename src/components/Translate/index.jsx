import React, { useEffect, useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import logoVN from '../../assets/logo2.png';
import logoEN from '../../assets/logo3.png';
import logoJP from '../../assets/logo4.png';
import { useTranslation } from 'react-i18next';
import './index.scss';

const Translate = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('');
  const handleChangeInfo = e => {
    localStorage.setItem('lang', e.target.value);
    setLang(localStorage.getItem('lang') || 'en');
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  };

  useEffect(() => {
    setLang(localStorage.getItem('lang') || 'en');
  }, []);

  return (
    <div className="translate_container">
      <div className="translate_left"></div>
      <div className="translate_right">
        <div className="flag_country">
          <input
            type="radio"
            value="vn"
            id="vn"
            name="language"
            checked={lang === 'vn'}
            onChange={handleChangeInfo}
          />
          <label htmlFor="vn">
            <div className="flag_icon">
              <img src={logoVN} alt="" />
            </div>
          </label>
        </div>
        <div className="flag_country">
          <input
            type="radio"
            value="en"
            id="en"
            name="language"
            checked={lang === 'en'}
            onChange={handleChangeInfo}
          />
          <label htmlFor="en">
            <div className="flag_icon">
              <img src={logoEN} alt="" />
            </div>
          </label>
        </div>
        <div className="flag_country">
          <input
            type="radio"
            value="jp"
            id="jp"
            name="language"
            checked={lang === 'jp'}
            onChange={handleChangeInfo}
          />
          <label htmlFor="jp">
            <div className="flag_icon">
              <img src={logoJP} alt="" />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Translate;
