import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SidebarContainer = styled.div`
  width: 80px;
  height: 96vh;
  background: linear-gradient(180deg, #f3ec78, #af4261);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

export const SidebarLogo = styled(FontAwesomeIcon)`
  font-size: 1.7rem;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 50%;
`;

export const SidebarNavigation = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const SidebarNavItem = styled.li`
  width: 100%;
  margin: 10px 0;
`;

export const SidebarNavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  transition: background-color 0.3s ease, transform 0.3s ease, padding 0.3s;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
`;

export const LogoutButton = styled.button`
  margin-top: auto;
  padding: 10px 20px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 60px;
  transition: background-color 0.3s ease, transform 0.3s ease, width 0.3s;

  &:hover {
    background-color: #c9302c;
    transform: scale(1.05);
  }

  ${SidebarContainer}:hover & {
    width: 80%;
  }
`;
