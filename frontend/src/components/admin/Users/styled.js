import styled from 'styled-components';
import { FaCog, FaTrash } from 'react-icons/fa';

export const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const LoadingMessage = styled.p`
  text-align: center;
`;

export const UserListContainer = styled.div`
  padding: 20px;
`;

export const UserListHeader = styled.h2`
  margin-bottom: 20px;
`;

export const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const UserItem = styled.li`
  margin-bottom: 20px;
`;

export const UserBox = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.div`
  margin-bottom: 10px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SettingsIcon = styled(FaCog)`
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    color: blue;
  }
`;

export const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SettingsModal = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

export const DeleteModal = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

export const ModalText = styled.p`
  text-align: center;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 4px;
  margin-bottom: 10px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 4px;
  margin-bottom: 10px;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 10px;
  flex: 1;
`;

export const SearchSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  flex: 1;
  margin-right: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  background-color: gray;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

export const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

export const SaveButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageNumber = styled.button`
  background-color: ${props => (props.active ? '#007bff' : 'white')};
  color: ${props => (props.active ? 'white' : 'black')};
  border: 1px solid #ccc;
  padding: 8px 16px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;