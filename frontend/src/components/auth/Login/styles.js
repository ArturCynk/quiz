import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 30px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  margin-bottom: 25px;
  color: #333;
  font-family: 'Arial', sans-serif;
  text-align: center;
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
`;
