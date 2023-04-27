import { Radio, message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './index.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { loginCall, registerCall } from '../../store/apiCall';
import { Spin } from 'antd';
import { useFormik } from 'formik';

const Auth = () => {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({});
  const [value, setValue] = useState('Japan');
  const { isFetching, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = e => {
    setValue(e.target.value);
  };

  const handleSignIn = e => {
    e.preventDefault();
    loginCall(data, dispatch);
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
      errors.company_name = 'Vui lòng nhập trường này';
    }
    if (!values.user_name) {
      errors.user_name = 'Vui lòng nhập trường này';
    }
    if (!values.phone) {
      errors.phone = 'Vui lòng nhập trường này';
    }
    if (!values.password) {
      errors.password = 'Vui lòng nhập trường này';
    } else if (values.password.length < 6) {
      errors.password = 'Mật khẩu từ 6 kí tự trở lên';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Vui lòng nhập trường này';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Mật khẩu nhập lại không chính xác';
    }
    if (!values.email) {
      errors.email = 'Vui lòng nhập trường này';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Email không hợp lệ';
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
      const { confirmpassword, ...data } = values;
      registerCall({ ...data, country: value }, dispatch, navigate, success);
    },
  });

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
          <form onSubmit={formik.handleSubmit}>
            <h1>Create Account</h1>
            {/* <div className={style.social_container}></div> */}
            <span>or use your email for registration</span>
            <input
              onChange={formik.handleChange}
              value={formik.values.company_name}
              name="company_name"
              type="text"
              placeholder="Name Company"
            />
            {formik.errors.company_name ? (
              <div className={style.error__form}>
                {formik.errors.company_name}
              </div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              type="email"
              placeholder="Email"
            />
            {formik.errors.email ? (
              <div className={style.error__form}>{formik.errors.email}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.user_name}
              name="user_name"
              type="text"
              placeholder="Username"
            />
            {formik.errors.user_name ? (
              <div className={style.error__form}>{formik.errors.user_name}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              type="text"
              placeholder="Phone"
            />
            {formik.errors.phone ? (
              <div className={style.error__form}>{formik.errors.phone}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
              placeholder="Password"
            />
            {formik.errors.password ? (
              <div className={style.error__form}>{formik.errors.password}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Comfirm password"
            />
            {formik.errors.confirmPassword ? (
              <div className={style.error__form}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
            <Radio.Group
              onChange={onChange}
              value={value}
              style={{ marginBottom: '10px' }}
            >
              <Radio value="Japan">Japan</Radio>
              <Radio value="Viet Nam">Viet Nam</Radio>
            </Radio.Group>
            {error && (
              <div className={style.error__form}>
                Thông tin tài khoản không hợp lệ
              </div>
            )}
            <button type="submit">
              {isFetching ? <Spin indicator={antIcon} /> : 'Sign Up'}
            </button>
          </form>
        </div>
        <div className={`${style.form_container} ${style.sign_in_container}`}>
          {/* LOGIN */}
          <form>
            <h1>Sign in</h1>
            <div className={style.social_container}></div>
            <span>or use your account</span>
            <input
              onChange={e => setData({ ...data, email: e.target.value })}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={e => setData({ ...data, password: e.target.value })}
              type="password"
              placeholder="Password"
            />
            {/* <a href='/'>Forgot your password?</a> */}
            {error && (
              <div className={style.error__form}>
                Tài khoản hoặc mật khẩu không chính xác
              </div>
            )}
            <button onClick={handleSignIn}>
              {isFetching ? <Spin indicator={antIcon} /> : 'Sign in'}
            </button>
          </form>
        </div>
        <div className={style.overlay_container}>
          <div className={style.overlay}>
            <div className={`${style.overlay_panel} ${style.overlay_left}`}>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => setToggle(!toggle)}
                className={style.ghost}
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div className={`${style.overlay_panel} ${style.overlay_right}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                onClick={() => setToggle(!toggle)}
                className={style.ghost}
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
