export const COUNTRY = { VN: 'VIỆT NAM', JP: 'NHẬT BẢN' };

export const DOMAIN = 'https://server-vjc.onrender.com/server';

export const LANGUAGES = ['jp', 'us'];

export const UNKNOWN_ERROR = 'Something went wrong. Please try again later!';

export const BOOKING_INFORMATION_REDUCER = {
  SET_DATA: 'BOOKING/SET_DATA',
  SET_TOUCHED: 'BOOKING/SET_TOUCHED',
  VALIDATE_ALL: 'BOOKING/VALIDATE_ALL',
  SET_REDIRECT: 'BOOKING/SET_REDIRECT',
  SET_OTHER_SERVICE: 'BOOKING/SET_OTHER_SERVICE',
  SET_STEP_STATUS: 'BOOKING/SET_STEP_STATUS',
};
export const COMMON_REDUCER = {
  SET_DATA: 'SET_DATA',
  FETCHING: 'FETCHING',
  FETCH_DONE: 'FETCH_DONE',
  ERROR: 'ERROR',
};

export const BRAND_REDUCER = {
  SET_BRAND: 'SET_BRAND',
};
export const LIST_CAR_REDUCER = {
  SET_DATA: 'LIST/SET_DATA',
  FETCHING: 'LIST/FETCHING',
  FETCH_DONE: 'LIST/FETCH_DONE',
  ERROR: 'LIST/ERROR',
  SET_SEATS: 'LIST/SET_SEAT',
  RESET_DATA: 'LIST/RESET_DATA',
};

export const DETAIL_CAR_REDUCER = {
  SET_DATA: 'DETAIL/SET_DATA',
  SET_SAME_CARS: 'DETAIL/SET_SAME_CARS',
  FETCHING: 'DETAIL/FETCHING',
  FETCH_DONE: 'DETAIL/FETCH_DONE',
  ERROR: 'DETAIL/ERROR',
  SET_SEATS: 'DETAIL/SET_SEATS',
};

export const SEARCH_REDUCER = {
  SET_LOCATION: 'SEARCH/SET_LOCATION',
  SET_PICK_UP_DATE: 'SEARCH/SET_PICK_UP_DATE',
  SET_RETURN_DATE: 'SEARCH/SET_RETURN_DATE',
  SET_SEATS: 'SEARCH/SET_SEATS',
  RESET_SEATS: 'SEARCH/RESET_SEATS',
  SET_PRICE: 'SEARCH/SET_PRICE',
  SET_BRAND: 'SEARCH/SET_BRAND',
  SET_TRANSMISSION: 'SEARCH/SET_TRANSMISSION',
  SET_PROVINCES: 'SEARCH/SET_PROVINCES',
  RESET_SEARCH: 'SEARCH/RESET',
  FETCHING: 'SEARCH/FETCHING',
};

export const FILTER_CAR_REDUCER = {
  SET_CARS: 'FILTER/SET_CAR',
  FETCHING: 'FILTER/FETCHING',
  FETCH_DONE: 'FILTER/FETCH_DONE',
  ERROR: 'FILTER/ERROR',
};

export const PROVINCES_REDUCER = {
  SET_PROVINCES: 'PROVINCES/SET_PROVINCES',
  FETCHING: 'PROVINCES/FETCHING',
  FETCH_DONE: 'PROVINCES/FETCH_DONE',
  ERROR: 'PROVINCES/ERROR',
};

export const BOOKING_REDUCER = {
  SET_DETAIL: 'BOOKING/SET_DETAIL',
};
