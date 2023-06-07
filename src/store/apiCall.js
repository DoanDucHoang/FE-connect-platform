import { DOMAIN } from '../constant/constant';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutUser,
  registerSuccess,
} from './authSlice';
import axios from 'axios';

export const loginCall = async (data, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${DOMAIN}auth/login`, data);
    await dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const registerCall = async (data, dispatch, navigate, success) => {
  dispatch(loginStart());
  try {
    await axios.post(`${DOMAIN}auth/register`, data);
    await dispatch(registerSuccess());
    await success();
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logout = dispatch => {
  dispatch(logoutUser());
};

export const pushInfoCompany = async (data, navigate) => {
  try {
    const res = await axios.post(`${DOMAIN}profile/updateprofile`, data);
    res && navigate('');
  } catch (error) {
    console.log(error);
  }
};

export const updateIntroduce = async data => {
  try {
    const res = await axios.put(`${DOMAIN}getcompany/update_introduce`, data);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async data => {
  try {
    const res = await axios.put(`${DOMAIN}getcompany/update_product`, data);
  } catch (error) {
    console.log(error);
  }
};

export const updateInfo = async data => {
  try {
    const res = await axios.put(`${DOMAIN}getcompany/update_info`, data);
  } catch (error) {
    console.log(error);
  }
};

export const updateFeatures = async data => {
  try {
    const res = await axios.put(`${DOMAIN}getcompany/update_specialties`, data);
  } catch (error) {
    console.log(error);
  }
};

export const updateCompanyName = async data => {
  try {
    const res = await axios.put(
      `${DOMAIN}getcompany/update_company_name`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateCoreMember = async data => {
  try {
    const res = await axios.put(`${DOMAIN}getcompany/update_core_member`, data);
  } catch (error) {
    console.log(error);
  }
};

export const updateClient = async data => {
  try {
    const res = await axios.put(`${DOMAIN}getcompany/update_client`, data);
  } catch (error) {
    console.log(error);
  }
};

export const pushSlotBooking = async data => {
  try {
    const res = await axios.post(`${DOMAIN}booking`, data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllCompany = async () => {
  try {
    const res = await axios.get(`${DOMAIN}getcompany/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCompannyJapanProfile = async data => {
  try {
    const res = await axios.post(
      `${DOMAIN}getcompany/allcompanyjapan/pages=`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async data => {
  try {
    const res = await axios.get(`${DOMAIN}getcompany/${data}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFourJapanCompany = async () => {
  try {
    const res = await axios.post(`${DOMAIN}getcompany/japancompany`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFourVietNamCompany = async () => {
  try {
    const res = await axios.post(`${DOMAIN}getcompany/vietnamcompany`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyByName = async data => {
  try {
    const res = await axios.post(`${DOMAIN}getcompany/searchcompanyname`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyByCategory = async data => {
  try {
    const res = await axios.post(
      `${DOMAIN}getcompany/searchcompanycategory`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
