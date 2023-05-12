/** @format */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import './i18n';
import { ROUTES } from './constant/ROUTES';
import store from './store';
import Home from './pages/Home';
import Landing from './pages/landing';
import Profile from './pages/Profile';
import Auth from './pages/RegisterLogin';
import MemberProfile from './pages/MemberProfile';
import HistoryBooking from './pages/HistoryBooking';
//import HistoryBooking from './pages/HistoryBooking/index';

function App() {
  const user = useSelector(state => state.auth.currentUser);
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route exact path={ROUTES.HOME} element={<Landing />} />
          <Route path={ROUTES.EVENT} element={<Home />} />
          <Route
            path={ROUTES.PROFILE}
            element={user ? <Profile /> : <Navigate to={ROUTES.LOGIN} />}
          />

          <Route
            path={ROUTES.UPDATE_PROFILE}
            element={user ? <MemberProfile /> : <Navigate to={ROUTES.LOGIN} />}
          />
          <Route
            path={ROUTES.BOOK}
            element={user ? <HistoryBooking /> : <Navigate to={ROUTES.LOGIN} />}
          />
          <Route
            path={ROUTES.DETAIL}
            element={user ? <Profile /> : <Navigate to={ROUTES.LOGIN} />}
          />
          <Route
            path={ROUTES.LOGIN}
            element={user ? <Navigate to={ROUTES.HOME} /> : <Auth />}
          />
        </Routes>
      </div>
    </Router>
  );
}

const ConnectedApp = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>
);

export default ConnectedApp;
