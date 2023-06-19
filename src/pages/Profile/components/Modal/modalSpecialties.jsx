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
import { updateFeatures } from '../../../../store/apiCall';
import { editProfile } from '../../../../store/editSlice';

export default function ModalSpecialties({ props }) {
  const dispatch = useDispatch();
  const data = props || [];
  const user = useSelector(state => state.auth.currentUser);
  const { email, company_name } = user;
  const { t } = useTranslation();
  const [centredModal, setCentredModal] = useState(false);
  const [features, setFeatures] = useState(props);
  const edit = useSelector(state => state.edit.isFetching);

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

  const handleSubmit = () => {
    const data = features;
    updateFeatures(data);
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
                  <Col
                    span={8}
                    className="member__features_content"
                    key={item.id}
                  >
                    <Row align={'middle'}>
                      <span>
                        {/* {translateCompanyFeaturesDesc(language)} {item.id} */}
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
                      defaultValue={`${item.speciality_desc}`}
                      type="text"
                      name="speciality_desc"
                    />
                    <h5>Mô Tả Đặc Trưng (Tiếng Anh)</h5>
                    <input
                      onChange={e => handleChangeFeature(e, item)}
                      className="member__features_input2"
                      defaultValue={`${item.speciality_desc_en}`}
                      type="text"
                      name="speciality_desc_en"
                    />
                    <h5>Mô Tả Đặc Trưng (Tiếng Nhật)</h5>
                    <input
                      onChange={e => handleChangeFeature(e, item)}
                      className="member__features_input2"
                      defaultValue={`${item.speciality_desc_jp}`}
                      type="text"
                      name="speciality_desc_jp"
                    />
                  </Col>
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
