import { Radio, message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './index.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { loginCall, registerCall } from '../../store/apiCall';
import { Spin } from 'antd';
import { useFormik } from 'formik';
import useValidatorLogin from './hooks/useValidatorLogin';
import Translate from '../../components/Translate';
import { useTranslation } from 'react-i18next';

const Auth = () => {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState('Japan');
  const { isFetching, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    email,
    password,
    changeEmail,
    changePassword,
    emailError,
    passwordError,
    isCheck1,
    isCheck2,
  } = useValidatorLogin();

  let disabled = true;

  if (email && password && isCheck1 && isCheck2) {
    disabled = false;
  } else {
    disabled = true;
  }

  const onChange = e => {
    setValue(e.target.value);
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const validate = values => {
    const errors = {};
    if (!values.company_name) {
      errors.company_name = `${t('Please fill out this field.')}`;
    }
    if (!values.user_name) {
      errors.user_name = `${t('Please fill out this field.')}`;
    }
    if (!values.phone) {
      errors.phone = `${t('Please fill out this field.')}`;
    }
    if (!values.password) {
      errors.password = `${t('Please fill out this field.')}`;
    } else if (values.password.length < 6) {
      errors.password = 'Mật khẩu từ 6 kí tự trở lên';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = `${t('Please fill out this field.')}`;
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Mật khẩu nhập lại không chính xác';
    }
    if (!values.email) {
      errors.email = `${t('Please fill out this field.')}`;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = `${t('Invalid email')}`;
    }
    return errors;
  };
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Đăng ký thành công',
    });
  };

  const formik = useFormik({
    initialValues: {
      company_name: '',
      user_name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: values => {
      const { confirmPassword, ...data } = values;
      registerCall({ ...data, country: value }, dispatch, navigate, success);
    },
  });

  const handleSignIn = e => {
    e.preventDefault();
    loginCall({ email, password }, dispatch);
  };

  return (
    <div className={style.register__wrapper}>
      {contextHolder}
      <div
        className={
          !toggle
            ? style.container
            : `${style.container} ${style.right_panel_active}`
        }
      >
        <div className={`${style.form_container} ${style.sign_up_container}`}>
          {/* REGISTER */}
          <div>
            <Translate />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <h1>{t('Create Account')}</h1>
            {/* <div className={style.social_container}></div> */}
            <span>{t('or use your email for registration')}</span>
            <input
              onChange={formik.handleChange}
              value={formik.values.company_name}
              onBlur={formik.handleBlur}
              name="company_name"
              type="text"
              placeholder={t('Name Company')}
            />
            {formik.errors.company_name && formik.touched.company_name ? (
              <div className={style.error__form}>
                {formik.errors.company_name}
              </div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              name="email"
              type="email"
              placeholder={t('Email')}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className={style.error__form}>{formik.errors.email}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.user_name}
              onBlur={formik.handleBlur}
              name="user_name"
              type="text"
              placeholder={t('Username')}
            />
            {formik.errors.user_name && formik.touched.user_name ? (
              <div className={style.error__form}>{formik.errors.user_name}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              name="phone"
              type="text"
              placeholder={t('Phone')}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className={style.error__form}>{formik.errors.phone}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
              placeholder={t('Password')}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className={style.error__form}>{formik.errors.password}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              name="confirmPassword"
              type="password"
              placeholder={t('Comfirm Password')}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <div className={style.error__form}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
            <Radio.Group
              onChange={onChange}
              value={value}
              style={{ marginBottom: '10px' }}
            >
              <Radio value="Japan">{t('Japan')}</Radio>
              <Radio value="Viet Nam">{t('Viet Nam')}</Radio>
            </Radio.Group>
            {error && (
              <div className={style.error__form}>
                {t('Invalid account information')}
              </div>
            )}
            <button type="submit">
              {isFetching ? <Spin indicator={antIcon} /> : t('Sign Up')}
            </button>
          </form>
        </div>
        <div className={`${style.form_container} ${style.sign_in_container}`}>
          {/* LOGIN */}
          <div>
            <Translate />
          </div>
          <form>
            <h1>{t('Sign In')}</h1>
            <div className={style.social_container}></div>
            <span>{t('or use your account')}</span>
            <input
              onChange={e => changeEmail(e.target.value, dispatch)}
              value={email}
              name="email"
              type="email"
              placeholder={t('Email')}
            />
            <div className={style.error__form}>
              {isCheck1 ? emailError : ''}
            </div>
            <input
              onChange={e => changePassword(e.target.value, dispatch)}
              value={password}
              name="password"
              type="password"
              placeholder={t('Password')}
            />
            <div className={style.error__form}>
              {isCheck2 ? passwordError : ''}
            </div>
            {error && (
              <div className={style.error__form}>
                {t('Incorrect Email or Password')}
              </div>
            )}
            <button disabled={disabled} type="submit" onClick={handleSignIn}>
              {isFetching ? <Spin indicator={antIcon} /> : t('Sign In')}
            </button>
          </form>
        </div>
        <div className={style.overlay_container}>
          <div className={style.overlay}>
            <div className={`${style.overlay_panel} ${style.overlay_left}`}>
              <h1>{t('Welcome Back!')}</h1>
              <p>
                {t(
                  'To keep connected with us please login with your personal info'
                )}
              </p>
              <button
                onClick={() => setToggle(!toggle)}
                className={style.ghost}
                id="signIn"
              >
                {t('Sign In')}
              </button>
            </div>
            <div className={`${style.overlay_panel} ${style.overlay_right}`}>
              <h1>{t('Hello, Friend!')}</h1>
              <p>
                {t('Enter your personal details and start journey with us')}
              </p>
              <button
                onClick={() => setToggle(!toggle)}
                className={style.ghost}
                id="signUp"
              >
                {t('Sign Up')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
