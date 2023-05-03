import React, { useEffect, useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import logoVN from '../../assets/logo2.png';
import logoEN from '../../assets/logo3.png';
import logoJP from '../../assets/logo4.png';
import './index.scss';

const Translate = () => {
  const [lang, setLang] = useState('');
  // const onSelect = code => {
  //   setLang(code);
  //   if (code === 'GB') {
  //     localStorage.setItem('lang', 'en');
  //   } else {
  //     localStorage.setItem('lang', code.toLowerCase());
  //   }
  //   window.location.reload();
  // };

  const handleChangeInfo = e => {
    localStorage.setItem('lang', e.target.value);
    setLang(localStorage.getItem('lang') || 'en');
    window.location.reload();
  };

  useEffect(() => {
    setLang(localStorage.getItem('lang') || 'en');
  }, []);

  return (
    <div className="translate">
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
  );
};

export default Translate;
