import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import background from '../../../../assets/background2.jpg';
import { useTranslation } from 'react-i18next';
import logo1 from '../../../../assets/logo1.png';
import logo2 from '../../../../assets/logo2.png';
import logo3 from '../../../../assets/logo3.png';
import logo4 from '../../../../assets/logo4.png';
//import './ecommerce-category-product.css';
import { SyncLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Modal from '../Modal';

function CompanyList({ companys, page }) {
  const { t } = useTranslation();
  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-0">
        {companys.length ? (
          ''
        ) : (
          <SyncLoader
            color="#cf2030"
            loading={true}
            //cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        {companys.map(item => (
          <MDBCol
            size="6"
            md="6"
            xl={page === 'search' ? '6' : '5'}
            key={item.company_name}
          >
            <MDBCard className="shadow-0 border rounded-3 mt-3 mb-3">
              <MDBCardBody
                style={{
                  backgroundImage: `url(${background})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              >
                <MDBRow>
                  <MDBCol md="6" lg="3" className="mb-4 mb-lg-0">
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom hover-overlay"
                    >
                      <MDBCardImage src={item.company_logo} className="w-100" />
                      <a href={`/profile/${item.company_ID}`}>
                        <div
                          className="mask"
                          style={{
                            backgroundColor: 'rgba(251, 251, 251, 0.15)',
                          }}
                        ></div>
                      </a>
                    </MDBRipple>
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="rounded"
                    >
                      <img src={logo1} alt="" style={{ width: '50px' }} />
                      {/* {item.languages === 'japan' ? (
                          <img src={logo4} alt="" />
                        ) : (
                          ''
                        )} */}
                      <img src={logo4} alt="" style={{ width: '50px' }} />
                      <img src={logo2} alt="" style={{ width: '50px' }} />
                    </MDBRipple>
                  </MDBCol>

                  <MDBCol md="6">
                    <h5 className="text-truncate mb-4 mb-md-0">
                      {item.company_name}
                    </h5>

                    <div className="mt-1 mb-0 small">
                      {/* <span className="text-primary"> • </span>
                      <span>
                        {t('Estalishment')}: {item.estalishment}
                      </span> */}
                      <div style={{ display: 'flex' }}>
                        <span className="text-primary"> • </span> &nbsp;
                        <p className="text-truncate mb-4 mb-md-0">
                          {t('Address')}: {item.estalishment}
                        </p>
                      </div>
                      {/* <span className="text-primary"> • </span>
                      <span className="mb-4 mb-md-0">
                        {t('Employers')}: {item.employers}
                      </span> */}

                      <div style={{ display: 'flex' }}>
                        <span className="text-primary"> • </span> &nbsp;
                        <p className="text-truncate mb-4 mb-md-0">
                          {t('Address')}: {item.employers}
                        </p>
                      </div>
                      {/* <span className="text-primary"> • </span>
                      <span>
                        {t('Capital')}: {item.capital}
                      </span> */}

                      <div style={{ display: 'flex' }}>
                        <span className="text-primary"> • </span> &nbsp;
                        <p className="text-truncate mb-4 mb-md-0">
                          {t('Address')}: {item.capital}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2 small">
                      <div style={{ display: 'flex' }}>
                        <span className="text-primary"> • </span> &nbsp;
                        <p className="text-truncate mb-4 mb-md-0">
                          {t('Address')}: {item.address_en}
                        </p>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <span className="text-primary"> • </span> &nbsp;
                        <p className="text-truncate mb-4 mb-md-0">
                          {t('Category')}: {item.category}
                        </p>
                      </div>
                      {/* <span className="text-primary"> • </span> */}
                      <div style={{ display: 'flex' }}>
                        <span className="text-primary"> • </span> &nbsp;
                        <p className="text-truncate mb-4 mb-md-0">
                          {t('Needs')}:
                        </p>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol
                    md="6"
                    lg="3"
                    className="border-sm-start-none border-start"
                  >
                    {page === 'search' && item.country === 'Japan' ? (
                      <>
                        <div className="d-flex flex-row align-items-center mb-1">
                          <h6 className="mb-1 me-1">Slot Còn Trống</h6>
                        </div>
                        <h6 className="text-success">1 2 3 4</h6>
                        <h6 className="text-success">5 6 7 8</h6>
                      </>
                    ) : (
                      <>
                        <div className="d-flex flex-row align-items-center mb-1">
                          <h6 className="mb-1 me-1"></h6>
                        </div>
                        <h6 className="text-success"></h6>
                        <h6 className="text-success"></h6>
                      </>
                    )}
                    <div className="d-flex flex-column mt-4">
                      {/* <Link to={`/profile/${item.company_ID}`}> */}
                      {/* <MDBBtn
                          color="primary"
                          size="sm"
                          style={{ width: '100px' }}
                        >
                          Đặt Lịch
                        </MDBBtn> */}
                      {item.country === 'Japan' ? <Modal props={item} /> : ''}

                      {/* </Link> */}
                      <Link to={`/profile/${item.company_ID}`}>
                        <MDBBtn
                          outline
                          color="primary"
                          size="sm"
                          className="mt-2"
                          style={{ width: '100px' }}
                        >
                          Chi Tiết
                        </MDBBtn>
                      </Link>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default CompanyList;
