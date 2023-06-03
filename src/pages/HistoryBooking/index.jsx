import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import { DOMAIN } from '../../constant/constant';
import './index.scss';
import Translate from '../../components/Translate';
import GridLoader from 'react-spinners/GridLoader';

createTheme(
  'solarized',
  {
    text: {
      primary: '#000000',
      secondary: '#2aa198',
    },
    background: {
      default: '#E7E7E7',
    },
    context: {
      background: '#cf2030',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
  },
  'dark'
);

const customStyles = {
  rows: {
    style: {
      minHeight: '60px',
    },
  },
  headCells: {
    style: { fontSize: '19px', color: '#cf2030' },
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

const HistoryBooking = () => {
  const { t } = useTranslation();
  const [listBooking, setListBooking] = useState([]);
  const [selectRows, setSelectRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [pending, setPending] = useState(true);
  const user = useSelector(state => state.auth.currentUser);

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

  const handleRowSelected = useCallback(state => {
    setSelectRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = async () => {
      setToggleCleared(!toggleCleared);
      selectRows.map(
        async item =>
          await axios
            .delete(`${DOMAIN}booking/${item.id}`)
            .then(getCalendarBooking())
      );
    };

    return (
      <button className="booking_delete_button" onClick={handleDelete}>
        Delete
      </button>
    );
  }, [selectRows]);

  const columns = [
    {
      name: `${t('Slot Number')}`,
      selector: row =>
        user.country === 'Japan' ? row.slot_number : row.slot_booking,
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
      name: `${t('Matching Company')}`,
      selector: row =>
        user.country === 'Japan' ? (
          row.company_name_booking
        ) : (
          <a href={row.info_url}>{row.company_name_booked}</a>
        ),
      sortable: true,
      style: {
        color: '#cf2030',
      },
    },
  ];

  useEffect(() => {
    getCalendarBooking();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  });

  return (
    <div>
      <Translate />
      <Navbar />
      {user.country === 'Japan' ? (
        <DataTable
          title={`${t('Appointment Schedule For Japan Company')}`}
          columns={columns}
          theme="solarized"
          conditionalRowStyles={conditionalRowStyles}
          customStyles={customStyles}
          data={Object.values(listBooking)}
          progressPending={pending}
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
      ) : (
        <DataTable
          title={`${t('Appointment Schedule For Viet Nam Company')}`}
          columns={columns}
          theme="solarized"
          customStyles={customStyles}
          data={Object.values(listBooking)}
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
          progressPending={pending}
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
      )}
    </div>
  );
};

export default HistoryBooking;
