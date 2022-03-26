import Login from './components/Login';
import Layout from './components/Layout';
import Notes from './components/Notes';
import RequireAuth from './auth/RequireAuth';
import Home from './components/Home';
import User from "./components/UserDashboard"
import { Routes, Route, } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* ----PUBLIC ROUTES--- */}
        <Route path="login" element={<Login />} />
        {/* ----PRIVATE ROUTES--- */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="notes" element={<Notes />}></Route>
          <Route path="users" element={<User/>}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
