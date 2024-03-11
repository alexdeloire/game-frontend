import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import NavBar from './components/NavBar';
import LinkPage from './views/LinkPage';
import Register from './views/Register';
import Login from './views/Login';
import Admin from './views/Admin';
import Home from './views/Home';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';
import Profile from './views/Profile';
import ChangePassword from './views/ChangePassword';
import RGPD from './views/RGPD';
import ItemList from './views/ItemList';
import UserContent from './views/UserContent';

const ROLES = {
  'User': 'User',
  'Admin': 'Admin',
  'Referent': 'Referent',
  'Super': 'Super'
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="/" element={<NavBar />}>


          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Home />} />

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="user-content" element={<UserContent />} />
              <Route path="profile" element={<Profile />} />
              <Route path="change-password" element={<ChangePassword />} />
              {/*dynamic route for profile*/}
              <Route path="rgpd" element={<RGPD />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Referent]} />}>

            </Route>


            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
              <Route path="items" element={<ItemList />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Super, ROLES.Admin]} />}>

            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;