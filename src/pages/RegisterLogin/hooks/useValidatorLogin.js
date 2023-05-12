import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { resetError } from '../../../store/authSlice';

const useValidatorLogin = () => {
   const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCheck1, setIsCheck1] = useState(false);
  const [isCheck2, setIsCheck2] = useState(false);
  var emailError = '';
  var passwordError = '';

  if (!email) {
    emailError = `${t('Please enter your email')}`;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    emailError = `${t('Invalid email')}`;
  }
  if (!password) {
    passwordError = `${t('Please enter a password')}`;
  } else if (password.length < 6) {
    passwordError =`${t('Password 6 characters or more')}`;
  }

  const changeEmail = (value, dispatch) => {
    setEmail(value);
    setIsCheck1(true);
    dispatch(resetError());
  };

  const changePassword = (value, dispatch) => {
    setPassword(value);
    setIsCheck2(true);
    dispatch(resetError());
  };

  return {
    email,
    password,
    changeEmail,
    changePassword,
    emailError,
    passwordError,
    isCheck1,
    isCheck2,
  };
};

export default useValidatorLogin;
