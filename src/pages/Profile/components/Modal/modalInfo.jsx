import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { useTranslation } from 'react-i18next';
import { Editor } from '@tinymce/tinymce-react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UPLOAD_IMAGE } from '../../../../constant/constant';
import axios from 'axios';
import { updateClient, updateInfo } from '../../../../store/apiCall';
import logoVN from '../../../../assets/logo2.png';
import logoEN from '../../../../assets/logo3.png';
import logoJP from '../../../../assets/logo4.png';
import { editProfile } from '../../../../store/editSlice';

export default function ModalInfo({ props }) {
  //   console.log('🚀 ~ file: modalInfo.jsx:24 ~ ModalInfo ~ props:', props);
  const data = props || [];
  const user = useSelector(state => state.auth.currentUser);
  const edit = useSelector(state => state.edit.isFetching);
  const dispatch = useDispatch();
  const { email, company_name } = user;
  const { t } = useTranslation();
  const [centredModal, setCentredModal] = useState(false);
  const [info, setInfo] = useState(props);
  const checkboxValue = [];

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

  const handleChangeInfo = async (e, data) => {
    let imgUrl = '';
    const newInfo = info;
    if (e.target.name === 'company_logo') {
      const imgUrl = await upload(e.target.files[0]);
      newInfo[0][e.target.name] = imgUrl;
    } else {
      newInfo[0][e.target.name] = e.target.value;
    }
    setInfo([...newInfo]);
  };

  const handleSubmit = () => {
    const data = info;
    updateInfo(data);
  };

  const toggleShow = () => setCentredModal(!centredModal);

  return (
    <>
      <MDBBtn
        onClick={toggleShow}
        style={{ height: '40px', margin: 'auto 10px' }}
      >
        EDIT
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{t('INFO')}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="member__main_info">
                <div className="member__description_title">
                  {t('Company information')} <span className="required">*</span>
                </div>
                <Row>
                  <Col xl={12} lg={12} md={24}>
                    <div className="member__main_info_item">
                      <h5>{t('Establishment')}</h5>
                      <input
                        onChange={handleChangeInfo}
                        name="estalishment"
                        defaultValue={data[0]?.estalishment}
                        type="text"
                        placeholder="2022"
                      />
                    </div>
                    <div className="member__main_info_item">
                      <h5>{t('Employers')}</h5>
                      <input
                        onChange={handleChangeInfo}
                        name="employers"
                        defaultValue={data[0]?.employers}
                        type="number"
                        placeholder="30"
                      />
                    </div>
                    <div className="member__main_info_item">
                      <h5>{t('Request (Vietnamese): ')}</h5>
                      <textarea
                        onChange={handleChangeInfo}
                        name="needs_vn"
                        defaultValue={data[0]?.needs_vn}
                        type="text"
                        placeholder="Tìm khách hàng"
                      />
                      <h5>{t('Request (English): ')}</h5>
                      <textarea
                        onChange={handleChangeInfo}
                        name="needs_en"
                        defaultValue={data[0]?.needs_en}
                        type="text"
                        placeholder="Find customers"
                      />
                      <h5>{t('Request (Japanese): ')}</h5>
                      <textarea
                        onChange={handleChangeInfo}
                        name="needs_jp"
                        defaultValue={data[0]?.needs_jp}
                        type="text"
                        placeholder="Tìm khách hàng"
                      />
                    </div>
                    <div className="member__main_info_item">
                      <h5>{t('Company Logo')}</h5>
                      <label htmlFor="image">
                        {/* {translatePreferred(language)} */}
                      </label>
                      <input
                        id="image"
                        type="file"
                        name="company_logo"
                        accept=".png, .jpeg, .jpg"
                        style={{
                          height: '100%',
                          border: 'none',
                          marginTop: '4px',
                        }}
                        onChange={handleChangeInfo}
                      />
                    </div>
                    <div className="member__main_info_item">
                      <h5>{t('Language Work')} </h5>
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
                      <h5>{t('Type Of Business')}</h5>
                      <select
                        name="ceategory"
                        id=""
                        className="ceategory_member"
                        defaultValue={data[0]?.category}
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
                      <h5>{t('Capital')}</h5>
                      <input
                        onChange={handleChangeInfo}
                        name="capital"
                        defaultValue={data[0]?.capital}
                        type="text"
                        placeholder="100000"
                      />
                    </div>
                    <div className="member__main_info_item">
                      <h5>{t('Address (Vietnamese)')}</h5>
                      <textarea
                        onChange={handleChangeInfo}
                        name="address_vn"
                        defaultValue={data[0]?.address_vn}
                        type="text"
                        placeholder="Q12, TPHCM"
                      />
                      <h5>{t('Address (English)')}</h5>
                      <textarea
                        onChange={handleChangeInfo}
                        name="address_en"
                        defaultValue={data[0]?.address_en}
                        type="text"
                        placeholder="Q12, TPHCM"
                      />
                      <h5>{t('Address (Japanese)')}</h5>
                      <textarea
                        onChange={handleChangeInfo}
                        name="address_jp"
                        defaultValue={data[0]?.address_jp}
                        type="text"
                        placeholder="Q12, TPHCM"
                      />
                    </div>

                    <div className="member__main_info_item">
                      <h5>Link Website:</h5>
                      <input
                        onChange={handleChangeInfo}
                        type="text"
                        defaultValue={data[0]?.info_url}
                        name="info_url"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  handleSubmit();
                  dispatch(editProfile(!edit));
                  toggleShow();
                }}
              >
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
