// src/pages/Login.js
import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  width: 220px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Login = () => {
  return (
    <FormContainer>
      <h1>Login</h1>
      <form>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Senha" />
        <Button type="submit">Entrar</Button>
      </form>
    </FormContainer>
  );
};

export default Login;
