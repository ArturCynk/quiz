import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
`;

export const Title = styled.h2`
  margin-bottom: 25px;
  color: #4CAF50;
  font-family: 'Arial', sans-serif;
  text-align: center;
`;

export const Message = styled.p`
  font-size: 18px;
  color: #333;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

export const ActivationLink = styled.a`
  display: inline-block;
  margin: 10px 0;
  padding: 10px 20px;
  color: #fff;
  background-color: #4CAF50;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #45a049;
  }
`;
