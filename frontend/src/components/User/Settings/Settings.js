import React,{useState,useEffect,useRef} from 'react'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { animated, useSpring } from 'react-spring';
import axios from 'axios';
import Cookies from 'js-cookie';
import { validateEmail, validatePassword } from './validation';
import { Container,Title,SettingsList,SettingsItem,InfoContainer,IconContainer,InfoData,InfoLabel,ModalContent,Button,Input,Label,SuccessMessage,PasswordRequirement,PasswordRequirements,PasswordStrengthBar} from './styles';

const Settings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('********');
    const [newData, setNewData] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentField, setCurrentField] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = Cookies.get('userEmail');
            if(userEmail){
                try {
                    const response = await axios.get(`http://localhost:5000/api/user/settings`,{
                        params: { email : userEmail}
                    })
                    const {name,email} = response.data;
                    setName(name);
                    setEmail(email);
                } catch (error) {
                    console.error('Failed to fetch user data:', error.response ? error.response.data : error.message);
                }
            }
        }

        fetchUserData();
    },[]);
    
    const openModal = (field) => {
        setCurrentField(field);
        setNewData('');
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setNameError('');
        setEmailError('');
        setPasswordError('');
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        const userEmail = Cookies.get('userEmail');
    
        if (currentField === 'name') {
          if (name === newData) {
            return setNameError('Name is already');
          }
          if (newData === '') {
            return setNameError('Name is required');
          }
          try {
            const response = await axios.put('http://localhost:5000/api/user/settings', {
              currentField,
              newData,
              userEmail
            });
    
            if (response.status === 200) {
              setNameError('');
              setSuccessMessage(response.data.message);
              setName(newData);
              closeModal();
              showSuccessMessage('Name updated successfully!');
            } else {
              setNameError(response.data.message);
            }
          } catch (error) {
            console.error('Failed to update name:', error.message);
            setNameError('Failed to update name');
          }
        } else if (currentField === 'email') {
          if (email === newData) return setEmailError('Email is already');
          if (newData === '') return setEmailError('Email is required');
          if (!validateEmail(newData)) return setEmailError('Email is not valid');
    
          try {
            const response = await axios.put('http://localhost:5000/api/user/settings', {
              currentField,
              newData,
              userEmail,
            });
    
            if (response.status === 200) {
              setEmailError('');
              setSuccessMessage(response.data.message);
              setEmail(newData);
              Cookies.set('userEmail', newData);
              closeModal();
              showSuccessMessage('Email updated successfully!');
            } else {
              setEmailError(response.data.message);
            }
          } catch (error) {
            console.error('Failed to update email:', error.message);
            setEmailError('Failed to update email');
          }
        } else if (currentField === 'password') {
          if (password === newData) return setPasswordError('Password is already');
          if (newData === '' || confirmPassword === '') return setPasswordError('Password must not be empty');
          if (passwordStrength !== 4) return setPasswordError('Password is not strong enough');
          if (newData !== confirmPassword) return setPasswordError('Passwords do not match');
    
          try {
            const response = await axios.put('http://localhost:5000/api/user/settings', {
              currentField,
              newData,
              userEmail,
              confirmPassword,
            });
    
            if (response.status === 200) {
              setPasswordError('');
              setSuccessMessage(response.data.message);
              closeModal();
              showSuccessMessage('Password updated successfully!');
            } else {
              setPasswordError(response.data.message);
            }
          } catch (error) {
            console.error('Failed to update password:', error.message);
            setPasswordError('Failed to update password');
          }
        }
      };
      
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setNewData(newPassword);
        const strength = validatePassword(newPassword);
        setPasswordStrength(strength);
      };

    const modalAnimation = useSpring({
        opacity: modalIsOpen ? 1 : 0,
        transform: modalIsOpen ? 'translateY(0%)' : 'translateY(-100%)',
      });

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setModalIsOpen(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setSuccessMessage('');
          setModalIsOpen(false);
        }, 3000);
    };

  return (
    <Container>
        {successMessage && (
            <ModalContent style={modalAnimation}>
                <SuccessMessage style={{color: '#333'}}>{successMessage}</SuccessMessage>
            </ModalContent>
        )}
        <Title>User Settings</Title>
        <SettingsList>
            <SettingsItem>
                <IconContainer>
                    <FaUser />
                </IconContainer>
                <InfoContainer>
                    <InfoLabel>Name</InfoLabel>
                    <InfoData>{name}</InfoData>
                </InfoContainer>
                <Tooltip title="Edit Name">
                    <IconButton onClick={() => openModal('name')}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </SettingsItem>
            <SettingsItem>
                <IconContainer>
                    <FaEnvelope />
                </IconContainer>
                <InfoContainer>
                    <InfoLabel>Email</InfoLabel>
                    <InfoData>{email}</InfoData>
                </InfoContainer>
                <Tooltip title="Edit Email">
                    <IconButton onClick={() => openModal('email')}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </SettingsItem>
            <SettingsItem>
                <IconContainer>
                    <FaLock />
                </IconContainer>
                <InfoContainer>
                    <InfoLabel>Password</InfoLabel>
                    <InfoData>{password}</InfoData>
                </InfoContainer>
                <Tooltip title="Edit Password">
                    <IconButton onClick={() => openModal('password')}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </SettingsItem>
        </SettingsList>

        <ModalContent style={modalAnimation} onSubmit={handleModalSubmit}>
            {nameError && <SuccessMessage style={{ color: 'red' }}>{nameError}</SuccessMessage>}
            {emailError && <SuccessMessage style={{ color: 'red' }}>{emailError}</SuccessMessage>}
            {passwordError && <SuccessMessage style={{ color: 'red' }}>{passwordError}</SuccessMessage>}
            <Title>Change {currentField.charAt(0).toUpperCase() + currentField.slice(1)}</Title>
            <Label>Current {currentField}:</Label>
            <Input type="text" value={currentField === 'password' ? '********' : eval(currentField)} readOnly />
            <hr />
            <Label>New {currentField}:</Label>
            <Input
            type={currentField === 'password' ? 'password' : 'text'}
            value={newData}
            onChange={handlePasswordChange}
            required
            />
            {currentField === 'password' && (
            <>
                <PasswordStrengthBar strength={passwordStrength} />
                <PasswordRequirements>
                <PasswordRequirement valid={/[a-z]/.test(newData)}>At least one lowercase letter</PasswordRequirement>
                <PasswordRequirement valid={/[A-Z]/.test(newData)}>At least one uppercase letter</PasswordRequirement>
                <PasswordRequirement valid={/[0-9]/.test(newData)}>At least one number</PasswordRequirement>
                <PasswordRequirement valid={/[^A-Za-z0-9]/.test(newData)}>
                    At least one special character
                </PasswordRequirement>
                </PasswordRequirements>
            </>
            )}
            {currentField === 'password' && (
            <>
                <Label>Confirm Password:</Label>
                <Input
                type={currentField === 'password' ? 'password' : 'text'}
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}
                required
                />
            </>
            )}
            <hr />
            <Button type="submit">Update</Button>
        </ModalContent>

    </Container>
  )
}

export default Settings