import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/auth/Register/RegisterForm';
import ActivateAccount from './components/auth/ActivateAccount/ActivateAccount';
import LoginForm from './components/auth/Login/LoginForm';
import Admin from './components/admin/Admin';
import UserDashboard from './components/User/User';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/activate/:token" element={<ActivateAccount />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/user/*" element={<UserDashboard />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
