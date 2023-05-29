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

export default function ModalCoreMember({ props }) {
  console.log(
    '🚀 ~ file: modalCoreMember.jsx:18 ~ ModalCoreMember ~ props:',
    props
  );

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
              <MDBModalTitle>{t('CORE MEMBER')}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Row>
                {data.map(item => (
                  <Row
                    gutter={16}
                    style={{ marginBottom: '10px' }}
                    key={item.id}
                  >
                    <Col span={7}>
                      <div className="member__core_title">
                        {/* {translateFullName(language)} */}
                        Full Name
                      </div>
                      <input
                        // onChange={e => handleChangeCore(e, item)}
                        defaultValue={`${item.member_name}`}
                        className="member__core_input"
                        type="text"
                        name="member_name"
                      />
                      <div className="member__core_title">
                        Chức Vụ (Tiếng Việt):{' '}
                      </div>
                      <input
                        // onChange={e => handleChangeCore(e, item)}
                        className="member__core_input"
                        defaultValue={`${item.member_position}`}
                        type="text"
                        name="member_position"
                      />
                      <div className="member__core_title">
                        Chức Vụ (Tiếng Anh):{' '}
                      </div>
                      <input
                        // onChange={e => handleChangeCore(e, item)}
                        className="member__core_input"
                        defaultValue={`${item.member_position_EN}`}
                        type="text"
                        name="member_position_EN"
                      />
                      <div className="member__core_title">
                        Chức Vụ (Tiếng Nhật):{' '}
                      </div>
                      <input
                        // onChange={e => handleChangeCore(e, item)}
                        className="member__core_input"
                        defaultValue={`${item.member_position_JP}`}
                        type="text"
                        name="member_position_JP"
                      />
                    </Col>
                    <Col span={7}>
                      <div className="member__core_title">
                        {/* {translateMemberPicture(language)} */}
                      </div>
                      <label htmlFor="coreImage">
                        {/* {translatePreferred(language)} */}
                      </label>
                      <input
                        // onChange={e => handleChangeCore(e, item)}
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
                        // onChange={e => handleChangeCore(e, item)}
                        name="member_desc"
                        defaultValue={`${item.member_desc}`}
                        id=""
                        cols="42"
                        rows="12"
                      />
                      <div className="member__core_title">
                        Mô Tả Thành Viên (Tiếng Anh):
                      </div>
                      <textarea
                        // onChange={e => handleChangeCore(e, item)}
                        name="member_desc_EN"
                        defaultValue={`${item.member_desc_EN}`}
                        id=""
                        cols="42"
                        rows="12"
                      />
                      <div className="member__core_title">
                        Mô Tả Thành Viên (Tiếng Nhật):
                      </div>
                      <textarea
                        // onChange={e => handleChangeCore(e, item)}
                        name="member_desc_JP"
                        defaultValue={`${item.member_desc_JP}`}
                        id=""
                        cols="42"
                        rows="12"
                      />
                    </Col>
                    <Col
                      //   onClick={() => handleDeleteCore(item)}
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
