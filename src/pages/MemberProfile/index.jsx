import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import './index.scss';
import { Col, Row } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import { pushInfoCompany } from '../../store/apiCall';
import { useNavigate } from 'react-router-dom';
import { UPLOAD_IMAGE } from '../../constant/constant';
//import { Radio } from 'antd';
import {
  //translateSelectLanguage,
  //translateProfile,
  //translateObligatory,
  //translateInfoCompany,
  translateEstablishment,
  translateEmployee,
  //translateRequest,
  translateCompanyLogo,
  translatePreferred,
  translateLanguageWork,
  translateTypeOfBusiness,
  translateCapital,
  //translateAddress,
  translateAssociationlogo,
  translateDescription,
  translateServices,
  //translateName,
  //translateServiceName,
  //translateServiceDescription,
  translateServicePicture,
  translateDeleteButton,
  translateAddButton,
  translateCompanyFeatures,
  translateCompanyFeaturesDesc,
  translateCompanyCoreMembers,
  translateFullName,
  //translatePosition,
  translateMemberPicture,
  //translateMemberDescription,
  translateCompanyClients,
  translateCompanyClientsName,
  translateCompanyClientsLogo,
  translateSubmitButton,
} from '../../constant/language.js';
import { useTranslation } from 'react-i18next';

import axios from 'axios';

const MemberProfile = () => {
  const { t } = useTranslation();
  //const [file, setFile] = useState(null);

  const upload = async file => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(UPLOAD_IMAGE, formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const user = useSelector(state => state.auth.currentUser);
  const navigate = useNavigate();
  const { email, company_name } = user;
  const [info, setInfo] = useState({});
  const checkboxValue = [];
  const [description, setDescription] = useState();
  const [descriptionEN, setDescriptionEN] = useState();
  const [descriptionJP, setDescriptionJP] = useState();
  const [language, setLanguage] = useState('en');
  const [services, setServices] = useState([
    {
      id: Date.now(),
      product_name: '',
      product_description: '',
      product_picture: '',
      product_url: '',
      email,
      company_name,
    },
  ]);

  const [features, setFeatures] = useState([
    {
      id: 1,
      speciality_picture: '',
      speciality_desc: '',
      email,
      company_name,
    },
    {
      id: 2,
      speciality_picture: null,
      speciality_desc: '',
      email,
      company_name,
    },
    {
      id: 3,
      speciality_picture: null,
      speciality_desc: '',
      email,
      company_name,
    },
  ]);
  const [core, setCore] = useState([
    {
      id: Date.now(),
      member_name: '',
      member_position: '',
      member_picture: null,
      member_desc: '',
      email,
      company_name,
    },
  ]);
  const [clients, setClients] = useState([
    {
      id: Date.now(),
      client_name: '',
      client_logo: null,
      client_url: '',
      email,
      company_name,
    },
  ]);

  const addNewClient = () => {
    if (clients.length < 8) {
      setClients([
        ...clients,
        {
          id: Date.now(),
          client_name: '',
          client_logo: null,
          client_url: '',
          email,
          company_name,
        },
      ]);
    }
  };

  const addNewMember = () => {
    if (core.length < 4) {
      setCore([
        ...core,
        {
          id: Date.now(),
          member_name: '',
          member_position: '',
          member_picture: null,
          member_desc: '',
          email,
          company_name,
        },
      ]);
    }
  };

  const addNewService = () => {
    if (services.length < 4) {
      setServices([
        ...services,
        {
          id: Date.now(),
          product_name: '',
          product_description: '',
          product_picture: null,
          product_url: '',
          email,
          company_name,
        },
      ]);
    }
  };

  const handleChangeInfo = e => {
    const { name, value } = e.target;
    if (e.target.name === 'language') {
      if (e.target.checked) {
        //checkboxValue.unshift(e.target.value);

        setInfo({ ...info, languages: [...checkboxValue, e.target.value] });
        console.log(
          '🚀 ~ file: index.jsx:190 ~ handleChangeInfo ~ info:',
          info
        );
      } else {
        let index = checkboxValue.indexOf(e.target.id);
        checkboxValue.splice(index, 1);
        //setInfo({ ...info, [name]: value });
      }
    } else {
      setInfo({ ...info, [name]: value });
      console.log(name + ': ' + value);
    }
  };

  const handelChangeService = async (e, data) => {
    let imgUrl = '';
    const newServices = services;
    let index = newServices.findIndex(item => item.id === data.id);
    if (e.target.name === 'product_picture') {
      //imgUrl = await upload(services[index].product_picture);
      imgUrl = await upload(e.target.files[0]);
      const imgUrlServices = 'http://localhost:3000/upload/' + imgUrl.filename;
      newServices[index][e.target.name] = imgUrlServices;
    } else {
      newServices[index][e.target.name] = e.target.value;
    }
    setServices([...newServices]);
  };

  const handleDeleteService = data => {
    let index = services.findIndex(item => item.id === data.id);
    services.splice(index, 1);
    setServices([...services]);
  };

  const handleChangeFeature = async (e, data) => {
    let imgUrl = '';
    const newfeatures = features;
    let index = features.findIndex(item => item.id === data.id);
    if (e.target.name === 'speciality_picture') {
      //newfeatures[index][e.target.name] = e.target.files[0];
      imgUrl = await upload(e.target.files[0]);
      const imgUrlFeatures = 'http://localhost:3000/upload/' + imgUrl.filename;
      newfeatures[index][e.target.name] = imgUrlFeatures;
    } else {
      newfeatures[index][e.target.name] = e.target.value;
    }
    setFeatures([...newfeatures]);
  };

  const handleChangeCore = async (e, data) => {
    let imgUrl = '';
    const newCore = core;
    let index = core.findIndex(item => item.id === data.id);
    if (e.target.name === 'member_picture') {
      //newCore[index][e.target.name] = e.target.files[0];
      imgUrl = await upload(e.target.files[0]);
      const imgUrlCores = 'http://localhost:3000/upload/' + imgUrl.filename;
      newCore[index][e.target.name] = imgUrlCores;
    } else {
      newCore[index][e.target.name] = e.target.value;
    }
    setCore([...newCore]);
  };

  const handleDeleteCore = data => {
    let index = core.findIndex(item => item.id === data.id);
    core.splice(index, 1);
    setCore([...core]);
  };

  const handleChangeClient = async (e, data) => {
    let imgUrl = '';
    const newClients = clients;
    let index = clients.findIndex(item => item.id === data.id);
    if (e.target.name === 'client_logo') {
      //newClients[index][e.target.name] = e.target.files[0];
      imgUrl = await upload(e.target.files[0]);
      const imgUrlClients = 'http://localhost:3000/upload/' + imgUrl.filename;
      newClients[index][e.target.name] = imgUrlClients;
    } else {
      newClients[index][e.target.name] = e.target.value;
    }
    setClients([...newClients]);
  };

  const handleDeleteClient = data => {
    let index = clients.findIndex(item => item.id === data.id);
    clients.splice(index, 1);
    setClients([...clients]);
  };

  useEffect(() => {
    setLanguage(localStorage.getItem('lang') || 'en');
  }, []);

  const handleSubmit = () => {
    const data = [
      { ...info, email, company_name },
      {
        description,
        descriptionEN,
        descriptionJP,
        email: email,
        company_name: company_name,
      },
      services,
      features,
      core,
      clients,
    ];
    pushInfoCompany(data, navigate);
    localStorage.setItem('linkWebsite', JSON.stringify(data[0].info_url));
    console.log(data);
  };

  return (
    <div className="member__wrapper">
      <Navbar />
      <div className="member__container">
        <Row className="member__title" justify={'center'} align={'middle'}>
          <Col span={24}>
            <h2>{t('PROFILE')}</h2>
          </Col>
          <Col span={24} className="member__title_required">
            * <span>{t('Obligatory')}</span>
          </Col>
        </Row>

        <div className="member__main_info">
          <div className="member__description_title">
            {t('Company information')} <span className="required">*</span>
          </div>
          <Row>
            <Col xl={12} lg={12} md={24}>
              <div className="member__main_info_item">
                <h5>{translateEstablishment(language)}</h5>
                <input
                  onChange={handleChangeInfo}
                  name="estalishment"
                  type="text"
                  placeholder="2022"
                />
              </div>
              <div className="member__main_info_item">
                <h5>{translateEmployee(language)}</h5>
                <input
                  onChange={handleChangeInfo}
                  name="employers"
                  type="number"
                  placeholder="30"
                />
              </div>
              <div className="member__main_info_item">
                <h5>{t('Request (Vietnamese): ')}</h5>
                <textarea
                  onChange={handleChangeInfo}
                  name="needs_vn"
                  type="text"
                  placeholder="Tìm khách hàng"
                />
                <h5>{t('Request (English): ')}</h5>
                <textarea
                  onChange={handleChangeInfo}
                  name="needs_en"
                  type="text"
                  placeholder="Find customers"
                />
                <h5>{t('Request (Japanese): ')}</h5>
                <textarea
                  onChange={handleChangeInfo}
                  name="needs_jp"
                  type="text"
                  placeholder="Tìm khách hàng"
                />
              </div>
              <div className="member__main_info_item">
                <h5>{translateCompanyLogo(language)}</h5>
                <label htmlFor="image">{translatePreferred(language)}</label>
                <input
                  id="image"
                  type="file"
                  name="company_logo"
                  accept=".png, .jpeg, .jpg"
                  style={{ height: '100%', border: 'none', marginTop: '4px' }}
                  onChange={handleChangeInfo}
                />
              </div>
              <div className="member__main_info_item">
                <h5>{translateLanguageWork(language)} </h5>
                <div className="flag_country_container">
                  <div className="flag_country">
                    <input
                      type="checkbox"
                      value="vietnam"
                      id="vietnam"
                      name="language"
                      onChange={handleChangeInfo}
                    />
                    <label htmlFor="vietnam">
                      <div className="flag_icon">
                        <img
                          src="http://localhost:3000/static/media/logo2.054728c8e7081cf4b673.png"
                          alt=""
                        />
                      </div>
                      <div className="title">Viet Nam</div>
                    </label>
                  </div>
                  <div className="flag_country">
                    <input
                      type="checkbox"
                      value="english"
                      id="english"
                      name="language"
                      onChange={handleChangeInfo}
                    />
                    <label htmlFor="english">
                      <div className="flag_icon">
                        <img
                          src="http://localhost:3000/static/media/logo3.f5dcebd68bc84a60a22d.png"
                          alt=""
                        />
                      </div>
                      <div className="title">English</div>
                    </label>
                  </div>
                  <div className="flag_country">
                    <input
                      type="checkbox"
                      value="japan"
                      id="japan"
                      name="language"
                      onChange={handleChangeInfo}
                    />
                    <label htmlFor="japan">
                      <div className="flag_icon">
                        <img
                          src="http://localhost:3000/static/media/logo4.e589f7cf672eca3ebf6e.png"
                          alt=""
                        />
                      </div>
                      <div className="title">Japan</div>
                    </label>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={12} lg={12} md={24}>
              <div className="member__main_info_item">
                <h5>{translateTypeOfBusiness(language)}</h5>
                {/* <input
                  onChange={handleChangeInfo}
                  name="ceategory"
                  type="text"
                  placeholder="IT"
                /> */}
                <select
                  name="ceategory"
                  id=""
                  className="ceategory_member"
                  onChange={handleChangeInfo}
                >
                  <option value="Du lịch & giải trí & thiết kế">
                    Du lịch & giải trí & thiết kế
                  </option>
                  <option value="Ngành thực phẩm & dịch vụ　">
                    Ngành thực phẩm & dịch vụ　
                  </option>
                  <option value="Kinh doanh theo xu hướng">
                    Kinh doanh theo xu hướng
                  </option>
                  <option value="Liên quan đến CNTT">Liên quan đến CNTT</option>
                  <option value="Liên quan đến thực tập sinh kỹ năng">
                    Liên quan đến thực tập sinh kỹ năng
                  </option>
                  <option value="Giáo dục & chăm sóc">
                    Giáo dục & chăm sóc
                  </option>
                  <option value="Mở rộng sang Việt Nam">
                    Mở rộng sang Việt Nam
                  </option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div className="member__main_info_item">
                <h5>{translateCapital(language)}</h5>
                <input
                  onChange={handleChangeInfo}
                  name="capital"
                  type="text"
                  placeholder="100000"
                />
              </div>
              <div className="member__main_info_item">
                <h5>{t('Address (Vietnamese)')}</h5>
                <textarea
                  onChange={handleChangeInfo}
                  name="address_vn"
                  type="text"
                  placeholder="Q12, TPHCM"
                />
                <h5>{t('Address (English)')}</h5>
                <textarea
                  onChange={handleChangeInfo}
                  name="address_en"
                  type="text"
                  placeholder="Q12, TPHCM"
                />
                <h5>{t('Address (Japanese)')}</h5>
                <textarea
                  onChange={handleChangeInfo}
                  name="address_jp"
                  type="text"
                  placeholder="Q12, TPHCM"
                />
              </div>
              <div className="member__main_info_item">
                <h5>{translateAssociationlogo(language)}</h5>
                <label htmlFor="image">{translatePreferred(language)}</label>
                <input
                  id="image"
                  type="file"
                  name="logo_associations"
                  accept=".png, .jpeg, .jpg"
                  style={{ height: '100%', border: 'none', marginTop: '4px' }}
                  onChange={handleChangeInfo}
                />
              </div>
              <div className="member__main_info_item">
                <h5>Link Website:</h5>
                <input
                  onChange={handleChangeInfo}
                  type="text"
                  name="info_url"
                />
              </div>
            </Col>
          </Row>
        </div>

        <div className="member__description">
          <div className="member__description_title">
            {translateDescription(language)}
            <span className="required">*</span>
            <h5>{t('Company Description (Vietnamese)')}</h5>
          </div>
          <Editor
            apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
            onEditorChange={(content, editor) => {
              setDescription(content);
            }}
            initialValue=""
            init={{
              height: 220,
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
          <div className="member__description_title">
            <h5>{t('Company Description (English)')}</h5>
          </div>
          <Editor
            apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
            onEditorChange={(content, editor) => {
              setDescriptionEN(content);
            }}
            initialValue=""
            init={{
              height: 220,
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
          <div className="member__description_title">
            <h5>{t('Company Description (Japanese)')}</h5>
          </div>
          <Editor
            apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
            onEditorChange={(content, editor) => {
              setDescriptionJP(content);
            }}
            initialValue=""
            init={{
              height: 220,
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </div>

        <div className="member__services">
          <div className="member__description_title">
            {translateServices(language)} <span className="required">*</span>
          </div>
          {services.map(item => (
            <Row key={item.id}>
              <Col span={10} className="member__services_image">
                <h5>{translateServicePicture(language)}</h5>
                <label htmlFor="image">{translatePreferred(language)}</label>
                <input
                  onChange={e => handelChangeService(e, item)}
                  id="image"
                  type="file"
                  name="product_picture"
                  accept=".png, .jpeg, .jpg"
                />
                {item.product_picture && (
                  <img src={item.product_picture} alt="" />
                )}
              </Col>
              <Col span={10} className="member__services_content">
                <div className="member__services_content_name">
                  <h5>{t('Service Name (Vietnamese)')}</h5>
                  <input
                    onChange={e => handelChangeService(e, item)}
                    type="text"
                    name="product_name"
                    required
                  />
                  <h5>{t('Service Name (English)')}</h5>
                  <input
                    onChange={e => handelChangeService(e, item)}
                    type="text"
                    name="product_name_EN"
                    required
                  />
                  <h5>{t('Service Name (Japanese)')}</h5>
                  <input
                    onChange={e => handelChangeService(e, item)}
                    type="text"
                    name="product_name_JP"
                    required
                  />
                </div>
                <div className="member__services_content_url">
                  <h5>URL :</h5>
                  <input
                    onChange={e => handelChangeService(e, item)}
                    type="text"
                    name="product_url"
                  />
                </div>
                <div className="member__services_content_description">
                  <h5>Mô Tả Dịch Vụ (Tiếng Việt)</h5>
                  <Editor
                    apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
                    onEditorChange={(content, editor) => {
                      const newServices = services;
                      let index = services.findIndex(
                        data => data.id === item.id
                      );
                      newServices[index].product_description = content;
                      setServices([...newServices]);
                    }}
                    initialValue=""
                    init={{
                      height: 224,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'code',
                        'help',
                        'wordcount',
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                  />
                </div>
                <div className="member__services_content_description">
                  <h5>Mô Tả Dịch Vụ (Tiếng Anh):</h5>
                  <Editor
                    apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
                    onEditorChange={(content, editor) => {
                      const newServices = services;
                      let index = services.findIndex(
                        data => data.id === item.id
                      );
                      newServices[index].product_description_EN = content;
                      setServices([...newServices]);
                    }}
                    initialValue=""
                    init={{
                      height: 224,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'code',
                        'help',
                        'wordcount',
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                  />
                </div>
                <div className="member__services_content_description">
                  <h5>Mô Tả Dịch Vụ (Tiếng Nhật):</h5>
                  <Editor
                    apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
                    onEditorChange={(content, editor) => {
                      const newServices = services;
                      let index = services.findIndex(
                        data => data.id === item.id
                      );
                      newServices[index].product_description_JP = content;
                      setServices([...newServices]);
                    }}
                    initialValue=""
                    init={{
                      height: 224,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'code',
                        'help',
                        'wordcount',
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                  />
                </div>
              </Col>
              <Col span={4} className="delete_button">
                <button onClick={() => handleDeleteService(item)}>
                  {translateDeleteButton(language)}
                </button>
              </Col>
            </Row>
          ))}
          <button className="member__button" onClick={addNewService}>
            {translateAddButton(language)}
          </button>
        </div>

        <div className="member__features">
          <div className="member__description_title">
            {translateCompanyFeatures(language)}{' '}
            <span className="required">*</span>
          </div>
          <Row>
            {features.map(item => (
              <Col span={8} className="member__features_content" key={item.id}>
                <Row align={'middle'}>
                  <span>
                    {translateCompanyFeaturesDesc(language)} {item.id}
                  </span>
                  <div className="member__features_image">
                    {item.speciality_picture && (
                      <img src={item.speciality_picture} alt="" />
                    )}
                  </div>
                </Row>
                <input
                  onChange={e => handleChangeFeature(e, item)}
                  className="member__features_input1"
                  type="file"
                  name="speciality_picture"
                  accept=".png, .jpeg, .jpg"
                />
                <h5>Mô Tả Đặc Trưng (Tiếng Việt)</h5>
                <input
                  onChange={e => handleChangeFeature(e, item)}
                  className="member__features_input2"
                  type="text"
                  name="speciality_desc"
                />
                <h5>Mô Tả Đặc Trưng (Tiếng Anh)</h5>
                <input
                  onChange={e => handleChangeFeature(e, item)}
                  className="member__features_input2"
                  type="text"
                  name="speciality_desc_en"
                />
                <h5>Mô Tả Đặc Trưng (Tiếng Nhật)</h5>
                <input
                  onChange={e => handleChangeFeature(e, item)}
                  className="member__features_input2"
                  type="text"
                  name="speciality_desc_jp"
                />
              </Col>
            ))}
          </Row>
        </div>

        <div className="member__core">
          <div className="member__description_title">
            {translateCompanyCoreMembers(language)}{' '}
            <span className="required">*</span>
          </div>
          {core.map(item => (
            <Row gutter={16} style={{ marginBottom: '10px' }} key={item.id}>
              <Col span={7}>
                <div className="member__core_title">
                  {translateFullName(language)}
                </div>
                <input
                  onChange={e => handleChangeCore(e, item)}
                  className="member__core_input"
                  type="text"
                  name="member_name"
                />
                <div className="member__core_title">Chức Vụ (Tiếng Việt): </div>
                <input
                  onChange={e => handleChangeCore(e, item)}
                  className="member__core_input"
                  type="text"
                  name="member_position"
                />
                <div className="member__core_title">Chức Vụ (Tiếng Anh): </div>
                <input
                  onChange={e => handleChangeCore(e, item)}
                  className="member__core_input"
                  type="text"
                  name="member_position_EN"
                />
                <div className="member__core_title">Chức Vụ (Tiếng Nhật): </div>
                <input
                  onChange={e => handleChangeCore(e, item)}
                  className="member__core_input"
                  type="text"
                  name="member_position_JP"
                />
              </Col>
              <Col span={7}>
                <div className="member__core_title">
                  {translateMemberPicture(language)}
                </div>
                <label htmlFor="coreImage">
                  {translatePreferred(language)}
                </label>
                <input
                  onChange={e => handleChangeCore(e, item)}
                  id="coreImage"
                  type="file"
                  name="member_picture"
                  accept=".png, .jpeg, .jpg"
                />
                {item.member_picture && (
                  <img className="core__img" src={item.member_picture} alt="" />
                )}
              </Col>
              <Col span={7}>
                <div className="member__core_title">
                  Mô Tả Thành Viên (Tiếng Việt):
                </div>
                <textarea
                  onChange={e => handleChangeCore(e, item)}
                  name="member_desc"
                  id=""
                  cols="42"
                  rows="12"
                />
                <div className="member__core_title">
                  Mô Tả Thành Viên (Tiếng Anh):
                </div>
                <textarea
                  onChange={e => handleChangeCore(e, item)}
                  name="member_desc_EN"
                  id=""
                  cols="42"
                  rows="12"
                />
                <div className="member__core_title">
                  Mô Tả Thành Viên (Tiếng Nhật):
                </div>
                <textarea
                  onChange={e => handleChangeCore(e, item)}
                  name="member_desc_JP"
                  id=""
                  cols="42"
                  rows="12"
                />
              </Col>
              <Col
                onClick={() => handleDeleteCore(item)}
                span={3}
                className="delete_button"
              >
                <button>{translateDeleteButton(language)}</button>
              </Col>
            </Row>
          ))}
          <button className="member__button" onClick={addNewMember}>
            {translateAddButton(language)}
          </button>
        </div>

        <div className="member__clients">
          <div className="member__description_title">
            {translateCompanyClients(language)}{' '}
            <span className="required">*</span>
          </div>
          {clients.map(item => (
            <Row gutter={16} key={item.id}>
              <Col span={7}>
                <div className="member__core_title">
                  {translateCompanyClientsName(language)}
                </div>
                <input
                  onChange={e => handleChangeClient(e, item)}
                  name="client_name"
                  className="member__core_input"
                  type="text"
                />
              </Col>
              <Col span={7}>
                <div className="member__core_title">
                  {translateCompanyClientsLogo(language)}
                </div>
                <label htmlFor="clientImage">
                  {translatePreferred(language)}
                </label>
                <input
                  onChange={e => handleChangeClient(e, item)}
                  id="clientImage"
                  type="file"
                  name="client_logo"
                  accept=".png, .jpeg, .jpg"
                />
                {item.client_logo && (
                  <img className="core__img" src={item.client_logo} alt="" />
                )}
              </Col>
              <Col span={7}>
                <div className="member__core_title">URL (Viet Nam)</div>
                <input
                  onChange={e => handleChangeClient(e, item)}
                  name="client_url"
                  className="member__core_input"
                  type="text"
                />
                <div className="member__core_title">URL (English)</div>
                <input
                  onChange={e => handleChangeClient(e, item)}
                  name="client_url_EN"
                  className="member__core_input"
                  type="text"
                />
                <div className="member__core_title">URL (Japan)</div>
                <input
                  onChange={e => handleChangeClient(e, item)}
                  name="client_url_JP"
                  className="member__core_input"
                  type="text"
                />
              </Col>
              <Col
                onClick={() => handleDeleteClient(item)}
                span={3}
                className="delete_button"
              >
                <button>{translateDeleteButton(language)}</button>
              </Col>
            </Row>
          ))}
          <button className="member__button" onClick={addNewClient}>
            {translateAddButton(language)}
          </button>
        </div>
        <button onClick={handleSubmit} className="member__button_submit">
          <span>{translateSubmitButton(language)}</span>
        </button>
      </div>
    </div>
  );
};

export default MemberProfile;
