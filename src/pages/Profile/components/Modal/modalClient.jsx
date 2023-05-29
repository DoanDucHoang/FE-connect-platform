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
import { useSelector } from 'react-redux';

export default function ModalClient({ props }) {
  const data = props || [];
  const user = useSelector(state => state.auth.currentUser);
  const { email, company_name } = user;
  const { t } = useTranslation();
  const [centredModal, setCentredModal] = useState(false);

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
                        // onChange={e => handleChangeClient(e, item)}
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
                        // onChange={e => handleChangeClient(e, item)}
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
                        // onChange={e => handleChangeClient(e, item)}
                        name="client_url"
                        className="member__core_input"
                        type="text"
                      />
                      <div className="member__core_title">URL (English)</div>
                      <input
                        // onChange={e => handleChangeClient(e, item)}
                        name="client_url_EN"
                        className="member__core_input"
                        type="text"
                      />
                      <div className="member__core_title">URL (Japan)</div>
                      <input
                        // onChange={e => handleChangeClient(e, item)}
                        name="client_url_JP"
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
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
