import React, { useState } from 'react';
import { Avatar, Col, Drawer, Dropdown, Row } from 'antd';
import style from './index.module.scss';
import './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { logout } from '../../store/apiCall';
import Translate from '../Translate/index.js';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const user = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      key: '1',
      label: (
        <Link to="/profile">
          <UserOutlined style={{ marginRight: '20px' }} />
          {t('Profile')}
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to={`/book/${user ? user.company_name : ''}`}>
          <CalendarOutlined style={{ marginRight: '18px' }} />{' '}
          {t('History Book')}
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <div onClick={() => logout(dispatch)}>
          <LogoutOutlined style={{ marginRight: '18px' }} /> {t('Logout')}
        </div>
      ),
    },
  ];

  return (
    <div className={style.navbar__container}>
      <Row align={'middle'}>
        <Col span={4} className={style.logo}>
          <Link to="/">
            <img
              src="https://lh5.googleusercontent.com/-aE5Q7UG1qQ8/AAAAAAAAAAI/AAAAAAAAAAA/FT52yrqAETQ/s55-p-k-no-ns-nd/photo.jpg"
              alt=""
            />
          </Link>
        </Col>
        <Col span={18} className={style.navbar__menu}>
          <div className={style.navbar__left_menu}>
            <Link to="/">{t('Home')}</Link>
            <Link to="/update_profile">{t('Event')}</Link>
            <Link to="/">About Us</Link>
            <Link to="/">Member List</Link>
            <Link to="/">Hot Deals</Link>
            <Link to="/">News</Link>
            <Link to="/">Contact</Link>
            <button className="button_member_register">Member register</button>
          </div>
          <div className="right_menu">{/* <Translate /> */}</div>
        </Col>
        <Col span={2} className={style.button__login}>
          {user ? (
            <Dropdown
              menu={{
                items,
              }}
            >
              <div onClick={e => e.preventDefault()}>
                <Avatar
                  src="https://res.cloudinary.com/meleegod/image/upload/v1672740725/social_media/noAvatar_csvsho.png"
                  size={40}
                  style={{
                    backgroundColor: '#e1dfdf',
                  }}
                ></Avatar>
              </div>
            </Dropdown>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </Col>
        <Col span={2} offset={18} className={style.menu__mobile}>
          <MenuOutlined onClick={showDrawer} />
        </Col>
        <Drawer
          title="Menu"
          placement="right"
          onClose={onClose}
          open={open}
          className={style.menu__mobile_item}
        >
          <Link to="/">Trang chủ</Link>
          <Link to="/update_profile">Đăng ký sự kiện</Link>

          {!user ? (
            <Link to="/login">
              <span>Login</span>
            </Link>
          ) : (
            <>
              <Link to="/profile">Trang cá nhân</Link>
              <div onClick={() => logout(dispatch)}>
                <LogoutOutlined style={{ marginRight: '18px' }} /> Logout
              </div>
            </>
          )}
        </Drawer>
      </Row>
    </div>
  );
};

export default Navbar;
