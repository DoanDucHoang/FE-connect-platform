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
import Alert from 'react-bootstrap/Alert';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';
import axios from 'axios';
import { DOMAIN } from '../../../../constant/constant';
import { useEffect } from 'react';
import { Checkbox, message } from 'antd';
import { pushSlotBooking } from '../../../../store/apiCall';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../../../constant/ROUTES';

export default function Modal({ props }) {
  const { t } = useTranslation();
  const [listBooking, setListBooking] = useState([]);
  const [listBookingVN, setListBookingVN] = useState([]);
  const [centredModal, setCentredModal] = useState(false);
  const [typeAlert, setTypeAlert] = useState({
    type: '',
    header: '',
    message: '',
    link: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [pending, setPending] = useState(true);
  const [slotBooking, setSlotBooking] = useState([]);
  const user = useSelector(state => state.auth.currentUser);
  //const { email, company_name } = user;
  const toggleShow = () => setCentredModal(!centredModal);

  const handleAlert = slotBooking => {
    if (slotBooking > 1) {
      setTypeAlert({
        type: 'danger',
        header: 'Đặt Lịch Thất Bại',
        message: 'Chỉ chọn được 1 slot, không thể chọn 2 slot trở lên',
      });
      setShowAlert(!showAlert);
    } else if (slotBooking == 1) {
      setTypeAlert({
        type: 'success',
        header: 'Đặt Lịch Thành Công',
        message: 'Xem tất cả các lịch đã booking',
        link: 'Lịch cá nhân',
      });
      setShowAlert(!showAlert);
    } else {
      setTypeAlert({
        type: 'warning',
        header: 'Bạn Chưa Chọn Slot',
        message: 'Hãy chọn 1 slot bất kỳ phù hợp',
      });
      setShowAlert(!showAlert);
    }
  };

  const handleChange = (
    e,
    slot,
    ID,
    nameBooked,
    nameBooking,
    startTime,
    endTime
  ) => {
    let index = slotBooking.findIndex(item => item.id === ID);
    if (!user) {
      <Navigate to={ROUTES.LOGIN} />;
    } else {
      if (e.target.checked) {
        nameBooking = user?.company_name;
        slotBooking.push({
          company_ID: ID,
          slot_booking: slot,
          start_time_booking: startTime,
          end_time_booking: endTime,
          company_name_booked: nameBooked,
          company_name_booking: nameBooking,
        });
      } else {
        slotBooking.splice(index, 1);
      }
    }
  };

  const handleBooking = slotNum => {
    try {
      if (slotNum == 1) {
        pushSlotBooking(slotBooking);
      }
      //window.location.reload();
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getCalendarBooking();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  });

  const getCalendarBooking = async () => {
    const res = await axios.get(`${DOMAIN}booking/${props.company_ID}`);
    const bookingVN = await axios.get(
      `${DOMAIN}booking/vietnam/${user.company_name}`
    );
    setListBooking(res.data);
    setListBookingVN(bookingVN.data);
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
        row.company_name_booking != null ||
        Object.values(listBookingVN).find(
          index => index.slot_booking == row.slot_booking
        ) ||
        Object.values(listBookingVN).find(
          index => index.company_name_booked == row.company_name_booked
        ) ? (
          <div style={{ display: 'flex' }}> </div>
        ) : (
          <div style={{ display: 'flex' }}>
            {' '}
            <Checkbox
              onChange={e =>
                handleChange(
                  e,
                  row.slot_booking,
                  row.company_ID,
                  row.company_name_booked,
                  row.company_name_booking,
                  row.start_time_booking,
                  row.end_time_booking
                )
              }
            />
          </div>
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

  // const rowDisabledCriteria = row => row.isOutOfStock;

  useEffect(() => {
    const timeShow = setTimeout(() => setShowAlert(false), 5000);
    return () => {
      clearTimeout(timeShow);
    };
  }, [showAlert]);

  const conditionalRowStyles = [
    {
      when: row =>
        row.company_name_booking != null &&
        Object.values(listBookingVN).find(
          index => index.slot_booking != row.slot_booking
        ),
      style: {
        backgroundColor: 'orange',
        fontWeight: '700',
        color: '#000000',
      },
    },
    {
      when: row =>
        Object.values(listBookingVN).find(
          index => index.slot_booking == row.slot_booking
        ) && row.company_name !== listBookingVN[0].company_name_booking,
      style: {
        backgroundColor: 'red',
        fontWeight: '700',
        color: '#000000',
      },
    },
  ];

  return (
    <>
      <MDBBtn
        onClick={toggleShow}
        style={{ width: '100px', padding: '4px 14px 3px', height: '100%' }}
      >
        {t('Booking')}
      </MDBBtn>

      {showAlert && (
        <div
          style={{
            position: 'fixed',
            top: 10,
            right: 0,
            zIndex: 9999,
            width: '50%',
          }}
        >
          <Alert
            variant={typeAlert.type}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>{typeAlert.header}</Alert.Heading>
            {typeAlert.message}&nbsp;
            <Alert.Link href="/">{typeAlert.link}</Alert.Link>{' '}
          </Alert>
        </div>
      )}

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                Đặt Lịch Với Công Ty {props?.company_name}
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <img
                src={props?.company_logo}
                alt=""
                style={{ width: '200px' }}
              />
              <DataTable
                columns={columns}
                theme="solarized"
                conditionalRowStyles={conditionalRowStyles}
                customStyles={customStyles}
                data={Object.values(listBooking)}
                progressPending={pending}
                // selectableRows
                // selectableRowDisabled={rowDisabledCriteria}
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
                <p>{`: Slot Bạn Đã Chọn`} </p>
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
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn
                onClick={event => {
                  handleAlert(slotBooking.length);
                  handleBooking(slotBooking.length);
                }}
              >
                Đặt Lịch
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
