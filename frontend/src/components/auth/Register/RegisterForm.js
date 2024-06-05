import React, { useState } from 'react';
import axios from 'axios';
import { FormContainer, Form, Title, Label, Input, PasswordStrengthBar, PasswordRequirements, PasswordRequirement, Button, ErrorMessage } from './styles';
import { validateEmail, validatePassword } from './validation';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({});
    const [success, setSuccess] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newError = {};

        if (!name) newError.name = 'Name is required';
        if (!validateEmail(email)) newError.email = 'Invalid email address';
        if (password !== confirmPassword) newError.confirmPassword = 'Passwords do not match';
        if (validatePassword(password) < 4) newError.password = 'Password does not meet the requirements';

        setError(newError);
        setSuccess(''); // Clear previous success message

        if (Object.keys(newError).length === 0) {
            try {
                const response = await axios.post('http://localhost:5000/api/register',
                    {
                        name: name,
                        email: email,
                        password: password,
                        confirmPassword: confirmPassword
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log('Registration successful:', response.data);
                setSuccess('Registration successful!'); // Set success message
            } catch (error) {
                console.error('Registration failed:', error.response ? error.response.data : error.message);
                if (error.response && error.response.data && error.response.data.error) {
                    setError({ form: error.response.data.error });
                } else {
                    setError({ form: 'Registration failed. Please try again.' });
                }
            }
        }
    }

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Title>Register</Title>
                {error.form && <ErrorMessage>{error.form}</ErrorMessage>}
                {success && <ErrorMessage style={{ color: 'green' }}>{success}</ErrorMessage>}
                <Label>
                    Name:
                    <Input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isValid={name !== ''}
                        required
                    />
                    {error.name && <ErrorMessage>{error.name}</ErrorMessage>}
                </Label>
                <Label>
                    Email:
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isValid={validateEmail(email)}
                        required
                    />
                    {error.email && <ErrorMessage>{error.email}</ErrorMessage>}
                </Label>
                <Label>
                    Password:
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordStrength(validatePassword(e.target.value));
                        }}
                        isValid={passwordStrength === 4}
                        required
                    />
                    <PasswordStrengthBar strength={passwordStrength} />
                    <PasswordRequirements>
                        <PasswordRequirement valid={/[a-z]/.test(password)}>At least one lowercase letter</PasswordRequirement>
                        <PasswordRequirement valid={/[A-Z]/.test(password)}>At least one uppercase letter</PasswordRequirement>
                        <PasswordRequirement valid={/[0-9]/.test(password)}>At least one number</PasswordRequirement>
                        <PasswordRequirement valid={/[^A-Za-z0-9]/.test(password)}>At least one special character</PasswordRequirement>
                    </PasswordRequirements>
                    {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
                </Label>
                <Label>
                    Confirm Password:
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        isValid={confirmPassword !== '' && password === confirmPassword}
                        required
                    />
                    {error.confirmPassword && <ErrorMessage>{error.confirmPassword}</ErrorMessage>}
                </Label>
                <Button type="submit">Register</Button>
            </Form>
        </FormContainer>
    );
}

export default RegisterForm;
