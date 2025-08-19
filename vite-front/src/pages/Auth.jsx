import React from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Auth = ({ onLogin }) => {
  return (
    <>
      <h2>Вход</h2>
      <LoginForm onLogin={onLogin} />
      <h3 style={{ marginTop: 24 }}>или регистрация:</h3>
      <RegisterForm />
    </>
  );
};

export default Auth;
