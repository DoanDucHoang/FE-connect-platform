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

export default function ModalProduct({ props }) {
  console.log('🚀 ~ file: modalProduct.jsx:17 ~ ModalProduct ~ props:', props);
  const data = props || [];
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
              {data.map(item => (
                <Row key={item.id}>
                  <Col span={10} className="member__services_image">
                    {/* <h5>{translateServicePicture(language)}</h5> */}
                    <label htmlFor="image">
                      {/* {translatePreferred(language)} */}
                    </label>
                    <input
                      // onChange={e => handelChangeService(e, item)}
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
                        // onChange={e => handelChangeService(e, item)}
                        type="text"
                        defaultValue={`${item.product_name}`}
                        name="product_name"
                        required
                      />
                      <h5>{t('Service Name (English)')}</h5>
                      <input
                        // onChange={e => handelChangeService(e, item)}
                        type="text"
                        defaultValue={`${item.product_name_EN}`}
                        name="product_name_EN"
                        required
                      />
                      <h5>{t('Service Name (Japanese)')}</h5>
                      <input
                        // onChange={e => handelChangeService(e, item)}
                        type="text"
                        defaultValue={`${item.product_name_JP}`}
                        name="product_name_JP"
                        required
                      />
                    </div>
                    <div className="member__services_content_url">
                      <h5>URL :</h5>
                      <input
                        // onChange={e => handelChangeService(e, item)}
                        defaultValue={`${item.product_url}`}
                        type="text"
                        name="product_url"
                      />
                    </div>
                    <div className="member__services_content_description">
                      <h5>{t('Service Description (Vietnamese)')}:</h5>
                      <Editor
                        apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
                        // onEditorChange={(content, editor) => {
                        //   const newServices = services;
                        //   let index = services.findIndex(
                        //     data => data.id === item.id
                        //   );
                        //   newServices[index].product_description = content;
                        //   setServices([...newServices]);
                        // }}
                        initialValue={`${item.product_description}`}
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
                      <h5>{t('Service Description (English)')}:</h5>
                      <Editor
                        apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
                        // onEditorChange={(content, editor) => {
                        //   const newServices = services;
                        //   let index = services.findIndex(
                        //     data => data.id === item.id
                        //   );
                        //   newServices[index].product_description_EN = content;
                        //   setServices([...newServices]);
                        // }}
                        initialValue={`${item.product_description_EN}`}
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
                      <h5>{t('Service Description (Japanese)')}:</h5>
                      <Editor
                        apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
                        // onEditorChange={(content, editor) => {
                        //   const newServices = services;
                        //   let index = services.findIndex(
                        //     data => data.id === item.id
                        //   );
                        //   newServices[index].product_description_JP = content;
                        //   setServices([...newServices]);
                        // }}
                        initialValue={`${item.product_description_JP}`}
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
                    {/* <button onClick={() => handleDeleteService(item)}>
                      {translateDeleteButton(language)}
                    </button> */}
                  </Col>
                </Row>
              ))}
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
