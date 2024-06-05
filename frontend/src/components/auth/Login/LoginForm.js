import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FormContainer, Form, Title, Label, Input, ErrorMessage, SuccessMessage, Button } from './styles';
import { validateEmail, validatePassword } from './validation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character');
      return;
    }
    
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response && response.data) {
        console.log('Login successful:', response.data);
        setSuccess(true);
        Cookies.set('userEmail', email); 
        
        setTimeout(() => {
          const role = response.data.role;
          if (role === 'admin') {
            navigate('/admin/dashboard'); // Przekierowanie do dashboardu admina
          } else {
            navigate('/user/dashboard'); // Przekierowanie do dashboardu użytkownika
          }
        }, 2000);

      } else {
        console.error('Login failed: No data received');
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0].msg;
        setError(errorMessage);
      } else {
        setError(error.response.data.error || 'Login failed. Please try again.');
      }
    }
  };
  

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Label>
          Email:
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Label>
        <Label>
          Password:
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Label>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>Login successful!</SuccessMessage>}
        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
