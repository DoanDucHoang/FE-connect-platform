import React, { useState } from 'react';
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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Modal from '../Modal';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { useEffect } from 'react';
import { getAllCompannyJapanProfile } from '../../../../store/apiCall';
import { scrollToTopSearch } from '../../../../helper';
let numPages = 6;

function CompanyList({ companys, page, category }) {
  console.log('🚀 ~ file: index.jsx:32 ~ CompanyList ~ companys:', companys);
  const { t } = useTranslation();
  const location = useLocation();
  const currentPage = location.search.charAt(location.search.length - 1);
  const user = useSelector(state => state.auth.currentUser);
  const [pages, setPages] = useState({ minValue: 0, maxValue: numPages });
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();

  const getData = value => {
    getAllCompannyJapanProfile({
      pages: (value - 1) * numPages,
      limit: numPages,
    }).then(data => {
      setData(data);
      setLoading(false);
    });
  };

  const handlePagination = value => {
    setLoading(true);
    getData(value);
    setPages({ minValue: (value - 1) * numPages, maxValue: value * numPages });
    setCurrent(value);
    scrollToTopSearch();
    navigate(`?pages=${value}`);
  };

  useEffect(() => {
    setCurrent(1);
    setLoading(false);
    setPages({ minValue: 0, maxValue: numPages });
    if (page === 'search') {
      getData(currentPage);
      setCurrent(currentPage);
    } else if (page === 'home') {
      getData(1);
    } else {
      setData(companys);
    }
  }, [companys]);

  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-0">
        {loading ? (
          <div
            className="spinner"
            style={{
              width: '100vw',
              height: '50vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SyncLoader
              color="#d63636"
              loading={true}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
              style={{ textAlign: 'center' }}
            />
          </div>
        ) : (
          <>
            {companys?.map(item => (
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
                          <MDBCardImage
                            src={item.company_logo}
                            // className="w-100"
                            style={{ width: '100px' }}
                          />
                          <Link to={`/profile/${item.company_ID}`} state={item}>
                            <div
                              className="mask"
                              style={{
                                backgroundColor: 'rgba(251, 251, 251, 0.15)',
                              }}
                            ></div>
                          </Link>
                        </MDBRipple>
                        <MDBRipple
                          rippleColor="light"
                          rippleTag="div"
                          className="rounded"
                        >
                          <img src={logo1} alt="" style={{ width: '50px' }} />

                          {item.country === 'Japan' ? (
                            <img src={logo4} alt="" style={{ width: '50px' }} />
                          ) : (
                            <img src={logo2} alt="" style={{ width: '50px' }} />
                          )}
                        </MDBRipple>
                      </MDBCol>

                      <MDBCol md="6">
                        <h5 className="text-truncate mb-4 mb-md-0">
                          {item.company_name}
                        </h5>

                        <div className="mt-1 mb-0 small">
                          <div style={{ display: 'flex' }}>
                            <span className="text-primary"> • </span> &nbsp;
                            <p className="text-truncate mb-4 mb-md-0">
                              {t('Establishment')}: {item.estalishment}
                            </p>
                          </div>

                          <div style={{ display: 'flex' }}>
                            <span className="text-primary"> • </span> &nbsp;
                            <p className="text-truncate mb-4 mb-md-0">
                              {t('Employers')}: {item.employers}
                            </p>
                          </div>

                          <div style={{ display: 'flex' }}>
                            <span className="text-primary"> • </span> &nbsp;
                            <p className="text-truncate mb-4 mb-md-0">
                              {t('Capital')}: {item.capital}
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
                              <h6 className="mb-1 me-1">
                                {t('Slots Are Empty')}
                              </h6>
                            </div>
                            <div
                              className="text-success"
                              style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                              }}
                            >
                              <p>1</p>
                              <p>2</p>
                              <p>3</p>
                              <p>4</p>
                            </div>
                            <div
                              className="text-success"
                              style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                              }}
                            >
                              <p>5</p>
                              <p>6</p>
                              <p>7</p>
                              <p>8</p>
                            </div>
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
                          {item.country === 'Japan' &&
                          user?.country != 'Japan' &&
                          page !== 'landing' &&
                          user != null ? (
                            <Modal props={item} />
                          ) : (
                            ''
                          )}

                          <Link to={`/profile/${item.company_ID}`} state={item}>
                            <MDBBtn
                              outline
                              color="primary"
                              size="sm"
                              className="mt-2"
                              style={{ width: '100px' }}
                            >
                              {t('Detail')}
                            </MDBBtn>
                          </Link>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </>
        )}

        {page === 'search' ? (
          <Pagination
            current={current}
            total={companys.length}
            defaultPageSize={numPages}
            responsive={true}
            onChange={handlePagination}
            style={{ textAlign: 'center', marginBottom: '10px' }}
          />
        ) : (
          ''
        )}
      </MDBRow>
    </MDBContainer>
  );
}

export default CompanyList;
