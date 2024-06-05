import React from 'react';
import AdminSidebar from './AdminSidebar/AdminSidebar';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Settings from './Settings/Settings';
import User from './Users/User';

const AdminContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(135deg, white, lightgreen, darkblue);
`;

const AdminContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  color: #333;
`;

const Admin = () => {
  return ( 
    <AdminContainer>
      <AdminSidebar />
      <AdminContent>
        <Routes>
          {/* <Route path="/users" element={<Users />} /> */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<User />} />
        </Routes>
      </AdminContent>
    </AdminContainer>
  );
};

export default Admin;
