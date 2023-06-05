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
import { useSelector, useDispatch } from 'react-redux';
import { UPLOAD_IMAGE } from '../../../../constant/constant';
import axios from 'axios';
import { updateCoreMember } from '../../../../store/apiCall';
import { editProfile } from '../../../../store/editSlice';

export default function ModalCoreMember({ props }) {
  const dispatch = useDispatch();
  const edit = useSelector(state => state.edit.isFetching);
  const data = props || [];
  const user = useSelector(state => state.auth.currentUser);
  const { email, company_name } = user;
  const { t } = useTranslation();
  const [centredModal, setCentredModal] = useState(false);
  const [core, setCore] = useState(props);

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

  const handleSubmit = () => {
    const data = core;
    // console.log(
    //   '🚀 ~ file: modalCoreMember.jsx:59 ~ handleSubmit ~ data:',
    //   data
    // );

    updateCoreMember(data);
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
                        onChange={e => handleChangeCore(e, item)}
                        defaultValue={`${item.member_name}`}
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
                        defaultValue={`${item.member_position}`}
                        type="text"
                        name="member_position"
                      />
                      <div className="member__core_title">
                        Chức Vụ (Tiếng Anh):{' '}
                      </div>
                      <input
                        onChange={e => handleChangeCore(e, item)}
                        className="member__core_input"
                        defaultValue={`${item.member_position_EN}`}
                        type="text"
                        name="member_position_EN"
                      />
                      <div className="member__core_title">
                        Chức Vụ (Tiếng Nhật):{' '}
                      </div>
                      <input
                        onChange={e => handleChangeCore(e, item)}
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
                        defaultValue={`${item.member_desc}`}
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
                        defaultValue={`${item.member_desc_EN}`}
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
