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
import { updateClient } from '../../../../store/apiCall';
import { editProfile } from '../../../../store/editSlice';

export default function ModalClient({ props }) {
  const data = props || [];
  const dispatch = useDispatch();
  const edit = useSelector(state => state.edit.isFetching);
  const user = useSelector(state => state.auth.currentUser);
  const { email, company_name } = user;
  const { t } = useTranslation();
  const [centredModal, setCentredModal] = useState(false);
  const [clients, setClients] = useState(props);

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

  const handleSubmit = () => {
    const data = clients;
    updateClient(data);
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
              <MDBModalTitle>{t('MAIN SERVICES')}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Row>
                {data.map(item => (
                  <Row gutter={16} key={item.id}>
                    <Col span={7}>
                      <div className="member__core_title">
                        {/* {translateCompanyClientsName(language)} */}
                        Client Company Name
                      </div>
                      <input
                        onChange={e => handleChangeClient(e, item)}
                        defaultValue={`${item.client_name}`}
                        name="client_name"
                        className="member__core_input"
                        type="text"
                      />
                    </Col>
                    <Col span={7}>
                      <div className="member__core_title">
                        {/* {translateCompanyClientsLogo(language)} */}
                      </div>
                      <label htmlFor="clientImage">
                        {/* {translatePreferred(language)} */}
                      </label>
                      <input
                        onChange={e => handleChangeClient(e, item)}
                        id="clientImage"
                        type="file"
                        name="client_logo"
                        accept=".png, .jpeg, .jpg"
                      />
                      {item.client_logo && (
                        <img
                          className="core__img"
                          src={item.client_logo}
                          alt=""
                        />
                      )}
                    </Col>
                    <Col span={7}>
                      <div className="member__core_title">URL (Viet Nam)</div>
                      <input
                        onChange={e => handleChangeClient(e, item)}
                        name="client_url"
                        defaultValue={`${item.client_url}`}
                        className="member__core_input"
                        type="text"
                      />
                      <div className="member__core_title">URL (English)</div>
                      <input
                        onChange={e => handleChangeClient(e, item)}
                        name="client_url_EN"
                        defaultValue={`${item.client_url_EN}`}
                        className="member__core_input"
                        type="text"
                      />
                      <div className="member__core_title">URL (Japan)</div>
                      <input
                        onChange={e => handleChangeClient(e, item)}
                        name="client_url_JP"
                        defaultValue={`${item.client_url_JP}`}
                        className="member__core_input"
                        type="text"
                      />
                    </Col>
                    <Col
                      //   onClick={() => handleDeleteClient(item)}
                      span={3}
                      className="delete_button"
                    >
                      {/* <button>{translateDeleteButton(language)}</button> */}
                    </Col>
                  </Row>
                ))}
              </Row>
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
