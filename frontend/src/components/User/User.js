import React from 'react';
import UserSidebar from './UserSidebar/UserSidebar';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Settings from './Settings/Settings';
import QuizDashboard from './quiz';

const UserContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(135deg, white, lightblue, darkblue);
`;

const UserContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  color: #333;
`;

const UserDashboard = () => {
  return (
    <UserContainer>
      <UserSidebar />
      <UserContent>
        <Routes>
          <Route path='/quiz' element={<QuizDashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </UserContent>
    </UserContainer>
  );
};

export default UserDashboard;
