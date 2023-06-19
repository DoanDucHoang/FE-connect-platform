import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import './index.scss';
import { Col, Row } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import { pushInfoCompany } from '../../store/apiCall';
import { useLocation, useNavigate } from 'react-router-dom';
import { UPLOAD_IMAGE } from '../../constant/constant';
import logoVN from '../../assets/logo2.png';
import logoEN from '../../assets/logo3.png';
import logoJP from '../../assets/logo4.png';
import { Button, Checkbox, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Translate from '../../components/Translate';
import { storage } from '../../firebase';

const MemberProfile = () => {
  const { t } = useTranslation();

  const upload = async file => {
    const imgUrl = file;
    const res = await axios.get(`${UPLOAD_IMAGE}s3Url`);
    await fetch(res.data.url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/png',
      },
      body: imgUrl,
    });
    return res.data.url.split('?')[0];
  };

  const user = useSelector(state => state.auth.currentUser);
  const navigate = useNavigate();
  let { state } = useLocation();
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

  const handleChangeInfo = async e => {
    const { name, value } = e.target;
    if (e.target.name === 'language') {
      if (e.target.checked) {
        setInfo({ ...info, languages: [...checkboxValue, e.target.value] });
      } else {
        let index = checkboxValue.indexOf(e.target.id);
        checkboxValue.splice(index, 1);
      }
    } else if (e.target.name === 'company_logo') {
      const imgUrl = await upload(e.target.files[0]);
      setInfo({ ...info, [name]: imgUrl });
    } else {
      setInfo({ ...info, [name]: value });
    }
  };

  const handelChangeService = async (e, data) => {
    let imgUrl = '';
    const newServices = services;
    let index = newServices.findIndex(item => item.id === data.id);
    if (e.target.name === 'product_picture') {
      const imgUrl = await upload(e.target.files[0]);
      newServices[index][e.target.name] = imgUrl;
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
      const imgUrl = await upload(e.target.files[0]);
      newfeatures[index][e.target.name] = imgUrl;
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
      const imgUrl = await upload(e.target.files[0]);
      newCore[index][e.target.name] = imgUrl;
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
      const imgUrl = await upload(e.target.files[0]);
      newClients[index][e.target.name] = imgUrl;
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

  const handleSubmit = event => {
    event.preventDefault();
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
    // console.log(data);
  };

  return (
    <div className="member__wrapper">
      <Translate />
      <Navbar />
      <form onSubmit={handleSubmit}>
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
                  <h5>{t('Years Of Establishment')}</h5>
                  <input
                    onChange={handleChangeInfo}
                    name="estalishment"
                    type="text"
                    placeholder="2022"
                    required
                  />
                </div>
                <div className="member__main_info_item">
                  <h5>{t('Number Of Employees')}</h5>
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
                  <h5>{t(`Company's Logo`)}</h5>
                  <label htmlFor="image">
                    {t('Preferred: ( .jpg, .jpeg, .png)')}
                  </label>
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
                  <h5>{t('Language Can Work')} </h5>
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
                          <img src={logoVN} alt="" />
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
                          <img src={logoEN} alt="" />
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
                          <img src={logoJP} alt="" />
                        </div>
                        <div className="title">Japan</div>
                      </label>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl={12} lg={12} md={24}>
                <div className="member__main_info_item">
                  <h5>{t('Type Of Business:')}</h5>
                  <select
                    name="ceategory"
                    id=""
                    className="ceategory_member"
                    onChange={handleChangeInfo}
                  >
                    <option value="Du lịch, giải trí và thiết kế">
                      Du lịch, giải trí và thiết kế
                    </option>
                    <option value="Ngành thực phẩm & dịch vụ">
                      Ngành thực phẩm & dịch vụ
                    </option>
                    <option value="Kinh doanh theo xu hướng">
                      Kinh doanh theo xu hướng
                    </option>
                    <option value="Liên quan đến CNTT">
                      Liên quan đến CNTT
                    </option>
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
                  <h5>{t('Company Capital Amount:')}</h5>
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
                  <h5>{t('Association logo:')}</h5>
                  <label htmlFor="image">
                    {t('Preferred: ( .jpg, .jpeg, .png)')}
                  </label>
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
              {t('Company Description:')}
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
              {t('Company Services:')} <span className="required">*</span>
            </div>
            {services.map(item => (
              <Row key={item.id}>
                <Col span={10} className="member__services_image">
                  <h5>{t('Service Picture:')}</h5>
                  <label htmlFor="image">
                    {t('Preferred: ( .jpg, .jpeg, .png)')}
                  </label>
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
                    {t('Delete')}
                  </button>
                </Col>
              </Row>
            ))}
            <button className="member__button" onClick={addNewService}>
              {t('Add New')}
            </button>
          </div>

          <div className="member__features">
            <div className="member__description_title">
              {t('Company Features')} <span className="required">*</span>
            </div>
            <Row>
              {features.map(item => (
                <Col
                  span={8}
                  className="member__features_content"
                  key={item.id}
                >
                  <Row align={'middle'}>
                    <span>
                      {t('Feature')} {item.id}
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
              {t('Company Core Members')} <span className="required">*</span>
            </div>
            {core.map(item => (
              <Row gutter={16} style={{ marginBottom: '10px' }} key={item.id}>
                <Col span={7}>
                  <div className="member__core_title">{t('Full Name')}</div>
                  <input
                    onChange={e => handleChangeCore(e, item)}
                    className="member__core_input"
                    type="text"
                    name="member_name"
                  />
                  <div className="member__core_title">
                    Chức Vụ (Tiếng Việt):{' '}
                  </div>
                  <input
                    onChange={e => handleChangeCore(e, item)}
                    className="member__core_input"
                    type="text"
                    name="member_position"
                  />
                  <div className="member__core_title">
                    Chức Vụ (Tiếng Anh):{' '}
                  </div>
                  <input
                    onChange={e => handleChangeCore(e, item)}
                    className="member__core_input"
                    type="text"
                    name="member_position_EN"
                  />
                  <div className="member__core_title">
                    Chức Vụ (Tiếng Nhật):{' '}
                  </div>
                  <input
                    onChange={e => handleChangeCore(e, item)}
                    className="member__core_input"
                    type="text"
                    name="member_position_JP"
                  />
                </Col>
                <Col span={7}>
                  <div className="member__core_title">
                    {t('Member Picture')}
                  </div>
                  <label htmlFor="coreImage">
                    {t('Preferred: ( .jpg, .jpeg, .png)')}
                  </label>
                  <input
                    onChange={e => handleChangeCore(e, item)}
                    id="coreImage"
                    type="file"
                    name="member_picture"
                    accept=".png, .jpeg, .jpg"
                  />
                  {item.member_picture && (
                    <img
                      className="core__img"
                      src={item.member_picture}
                      alt=""
                    />
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
                  <button>{t('Delete')}</button>
                </Col>
              </Row>
            ))}
            <button className="member__button" onClick={addNewMember}>
              {t('Add New')}
            </button>
          </div>

          <div className="member__clients">
            <div className="member__description_title">
              {t('Company Main Clients')} <span className="required">*</span>
            </div>
            {clients.map(item => (
              <Row gutter={16} key={item.id}>
                <Col span={7}>
                  <div className="member__core_title">
                    {t('Client Company Name')}
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
                    {t('Client Company Logo')}
                  </div>
                  <label htmlFor="clientImage">
                    {t('Preferred: ( .jpg, .jpeg, .png)')}
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
                  <button>{t('Delete')}</button>
                </Col>
              </Row>
            ))}
            <button className="member__button" onClick={addNewClient}>
              {t('Add New')}
            </button>
          </div>
          {/* <Button className="member__button_submit" type="submit">
            <span>{translateSubmitButton(language)}</span>
          </Button> */}
          <input type="submit" value={t('Update')} />
        </div>
      </form>
    </div>
  );
};

export default MemberProfile;
