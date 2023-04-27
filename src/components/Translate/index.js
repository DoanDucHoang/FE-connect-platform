import React, { useEffect, useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
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
            <img
              src="http://localhost:3000/static/media/logo2.054728c8e7081cf4b673.png"
              alt=""
            />
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
            <img
              src="http://localhost:3000/static/media/logo3.f5dcebd68bc84a60a22d.png"
              alt=""
            />
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
            <img
              src="http://localhost:3000/static/media/logo4.e589f7cf672eca3ebf6e.png"
              alt=""
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default Translate;
