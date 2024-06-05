import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DashboardContainer, LoadingMessage, UserListContainer, SearchContainer, SearchInput,SearchSelect, UserListHeader, UserList, UserBox, UserInfo, UserItem, IconContainer,SettingsIcon, DeleteButton, Pagination, PageNumber, DeleteIcon, ModalBackground, SettingsModal, ModalText, Label, Input, DeleteModal, ButtonContainer, CancelButton, Select, SaveButton} from './styled';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isUpdateSuccessModalOpen, setIsUpdateSuccessModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      const userEmail = Cookies.get('userEmail');
      console.log(userEmail);
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          params: { email: userEmail }
        });
        if (response && response.data) {
          console.log(response);
          setUsers(response.data.Users);
          setLoading(false);
          console.log('Users:', users);
          console.log('Is Array:', Array.isArray(users));
        }
      } catch (error) {
        console.error('Failed to fetch users:', error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteUser = (userId) => {
    setUserIdToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    const email = Cookies.get('userEmail');
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        params: { email: email }
      });
      setUsers(users.filter(user => user._id !== userId));
      setIsSuccessModalOpen(true); // Wyświetl modal sukcesu po udanym usunięciu
    } catch (error) {
      console.error('Failed to delete user:', error.message);
    }
    setIsDeleteModalOpen(false);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const email = Cookies.get('userEmail');
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${selectedUser._id}`, formData,{
        params: {email: email }
      });
      setUsers(users.map(user => user._id === selectedUser._id ? { ...user, ...formData } : user));
      setIsModalOpen(false);
      setIsUpdateSuccessModalOpen(true); // Wyświetl modal sukcesu po udanej aktualizacji
    } catch (error) {
      console.error('Failed to update user:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchEmailChange = (e) => {
    setSearchEmail(e.target.value);
  };

  const handleSearchRoleChange = (e) => {
    setSearchRole(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredUsers = users.filter(user => 
    (!user.name || user.name.toLowerCase().includes(searchName.toLowerCase())) &&
    (!user.email || user.email.toLowerCase().includes(searchEmail.toLowerCase())) &&
    (!searchRole || user.role.toLowerCase() === searchRole.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <DashboardContainer>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <UserListContainer>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search by name..."
              value={searchName}
              onChange={handleSearchNameChange}
            />
            <SearchInput
              type="text"
              placeholder="Search by email..."
              value={searchEmail}
              onChange={handleSearchEmailChange}
            />
            <SearchSelect value={searchRole} onChange={handleSearchRoleChange}>
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </SearchSelect>
          </SearchContainer>
          <UserListHeader>All Users</UserListHeader>
          <UserList>
            {currentUsers.map((user, index) => (
              <UserItem key={index}>
                <UserBox>
                  <UserInfo>
                    <strong>Name:</strong> {user.name}
                  </UserInfo>
                  <UserInfo>
                    <strong>Email:</strong> {user.email}
                  </UserInfo>
                  <UserInfo>
                    <strong>Role:</strong> {user.role}
                  </UserInfo>
                  <IconContainer>
                    <SettingsIcon onClick={() => openModal(user)} />
                    <DeleteIcon onClick={() => deleteUser(user._id)} />
                  </IconContainer>
                </UserBox>
              </UserItem>
            ))}
          </UserList>
          <Pagination>
            {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(pageNumber => (
              <PageNumber
                key={pageNumber}
                active={pageNumber + 1 === currentPage}
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                {pageNumber + 1}
              </PageNumber>
            ))}
          </Pagination>
        </UserListContainer>
      )}
      {isDeleteModalOpen && (
        <ModalBackground onClick={() => setIsDeleteModalOpen(false)}>
          <DeleteModal onClick={(e) => e.stopPropagation()}>
            <ModalText>Are you sure you want to delete the user and their data?</ModalText>
            <ButtonContainer>
              <CancelButton onClick={() => setIsDeleteModalOpen(false)}>Cancel</CancelButton>
              <DeleteButton onClick={() => handleDeleteUser(userIdToDelete)}>OK</DeleteButton>
            </ButtonContainer>
          </DeleteModal>
        </ModalBackground>
      )}
      {isModalOpen && (
        <ModalBackground onClick={closeModal}>
          <SettingsModal onClick={(e) => e.stopPropagation()}>
            <ModalText>Settings for {selectedUser.name}</ModalText>
            <form onSubmit={handleSaveSettings}>
              <Label>
                Name:
                <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </Label>
              <Label>
                Email:
                <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              </Label>
              <Label>
                Role:
                <Select name="role" value={formData.role} onChange={handleInputChange}>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Select>
              </Label>
              <ButtonContainer>
                <SaveButton type="submit">Save</SaveButton>
                <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
              </ButtonContainer>
            </form>
          </SettingsModal>
        </ModalBackground>
      )}
      {isSuccessModalOpen && (
        <ModalBackground onClick={() => setIsSuccessModalOpen(false)}>
          <DeleteModal onClick={(e) => e.stopPropagation()}>
            <ModalText>User deleted successfully!</ModalText>
            <ButtonContainer>
              <DeleteButton onClick={() => setIsSuccessModalOpen(false)}>OK</DeleteButton>
            </ButtonContainer>
          </DeleteModal>
        </ModalBackground>
      )}
      {isUpdateSuccessModalOpen && (
        <ModalBackground onClick={() => setIsUpdateSuccessModalOpen(false)}>
          <DeleteModal onClick={(e) => e.stopPropagation()}>
            <ModalText>Data updated successfully!</ModalText>
            <ButtonContainer>
              <DeleteButton onClick={() => setIsUpdateSuccessModalOpen(false)}>OK</DeleteButton>
            </ButtonContainer>
          </DeleteModal>
        </ModalBackground>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;
