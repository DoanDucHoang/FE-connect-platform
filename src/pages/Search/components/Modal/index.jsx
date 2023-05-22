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
import DataTable from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';
import axios from 'axios';
import { DOMAIN } from '../../../../constant/constant';
import { useEffect } from 'react';
import { Alert } from 'antd';

export default function Modal({ props }) {
  const { t } = useTranslation();
  const [listBooking, setListBooking] = useState([]);
  const [centredModal, setCentredModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const user = useSelector(state => state.auth.currentUser);

  const toggleShow = () => setCentredModal(!centredModal);

  const handleAlert = () => {
    setShowAlert(!showAlert);
  };

  useEffect(() => {
    getCalendarBooking();
  }, []);

  const getCalendarBooking = async () => {
    if (user.country === 'Japan') {
      const res = await axios.get(`${DOMAIN}booking/${user.id}`);
      setListBooking(res.data);
    } else {
      const res = await axios.get(
        `${DOMAIN}booking/vietnam/${user.company_name}`
      );
      setListBooking(res.data);
    }
  };

  const columns = [
    {
      name: `${t('Slot Number')}`,
      selector: row => row.slot_booking,
      //user.country === 'Japan' ? row.slot_number : row.slot_booking,
      sortable: true,
    },
    {
      name: `${t('Start Time')}`,
      selector: row => row.start_time_booking,
      sortable: true,
    },
    {
      name: `${t('End Time')}`,
      selector: row => row.end_time_booking,
      sortable: true,
    },
    {
      name: `${t('Booking Slot')}`,
      selector: row =>
        user.country === 'Japan' ? (
          <div style={{ display: 'flex' }}>
            {' '}
            <input type="checkbox" />
            <div
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: 'green',
                marginLeft: '10px',
              }}
            ></div>
          </div>
        ) : (
          <a href={row.info_url}>{row.company_name_booked}</a>
        ),
      sortable: true,
      style: {
        color: '#cf2030',
      },
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '40px',
      },
    },
    headCells: {
      style: { fontSize: '19px', color: '#3b71ca' },
    },
    cells: {
      style: {
        fontSize: '15px',
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: row => row.company_name_booking != null,
      style: {
        backgroundColor: '#FFFFFF',
        fontWeight: '700',
        color: '#000000',
      },
    },
  ];

  return (
    <>
      <MDBBtn
        onClick={toggleShow}
        style={{ width: '100px', padding: '4px 14px 3px' }}
      >
        Đặt Lịch
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                Đặt Lịch Với Công Ty {props.company_name}
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <img src={props.company_logo} alt="" style={{ width: '200px' }} />
              <DataTable
                //title={`${t('Appointment Schedule For Japan Company')}`}
                columns={columns}
                theme="solarized"
                conditionalRowStyles={conditionalRowStyles}
                customStyles={customStyles}
                data={Object.values(listBooking)}
                // progressPending={pending}
                progressComponent={
                  <GridLoader
                    color="#cf2030"
                    loading={true}
                    //cssOverride={override}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                }
              />
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'red',
                  }}
                ></div>
                <p>{`: Slot Bạn Đã Chọn (Công Ty Khác)`} </p>
              </div>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'orange',
                  }}
                ></div>
                <p>: Slot Đã có người chọn</p>
              </div>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'green',
                  }}
                ></div>
                <p>: Slot Có thể chọn</p>
              </div>
            </MDBModalBody>
            {showAlert && (
              <Alert
                message="Đặt Lịch Thành Công"
                description={
                  <span>
                    Đã Đặt Lịch Thành Công Nhấn Vào
                    <a href={`/book/${user ? user.id : ''}`}> Đây </a>
                    Để Xem Lịch Đã Đặt
                  </span>
                }
                type="success"
                show-icon
              />
            )}
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleAlert}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
