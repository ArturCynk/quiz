import styled from 'styled-components';
import { animated} from 'react-spring';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 96vh;
`;

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  margin-bottom: 25px;
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #555;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  color: #555;
  font-weight: bold;
`;

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 5px;
  border: 2px solid #ccc;
  font-size: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #007BFF;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
    outline: none;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 15px 0;
`;

export const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

export const SuccessMessage = styled.p`
  color: #28a745;
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
export const PasswordStrengthBar = styled.div`
  height: 5px;
  margin-bottom: 5px;
  background: ${({ strength }) => {
    switch (strength) {
      case 1: return '#dc3545';
      case 2: return '#ffc107';
      case 3: return '#28a745';
      case 4: return '#28a745';
      default: return '#e9ecef';
    }
  }};
  transition: background-color 0.3s ease-in-out;
`;

export const PasswordRequirements = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 5px 0 15px 0;
  font-size: 12px;
  color: #555;
`;

export const PasswordRequirement = styled.li`
  color: ${({ valid }) => (valid ? '#28a745' : '#dc3545')};
`;


export const SettingsList = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const SettingsItem = styled(Card)`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 20px;
`;

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  color: #007BFF;
`;

export const InfoContainer = styled.div`
  flex: 1;
`;

export const InfoLabel = styled.span`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

export const InfoData = styled.span`
  display: block;
  font-size: 16px;
  color: #333;
`;

export const ModalContent = styled(animated.form)`
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

export const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  },
};

