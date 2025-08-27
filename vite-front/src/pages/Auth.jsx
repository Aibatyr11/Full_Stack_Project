import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Вход" : "Регистрация"}
        </h2>

        {isLogin ? (
          <>
            <LoginForm onLogin={onLogin} />
            <div className="text-center mt-6">
              <p className="text-gray-600 mb-3">Нет аккаунта?</p>
              <button
                onClick={() => setIsLogin(false)}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Зарегистрироваться
              </button>
            </div>
          </>
        ) : (
          <>
            <RegisterForm />
            <div className="text-center mt-6">
              <p className="text-gray-600 mb-3">Уже есть аккаунт?</p>
              <button
                onClick={() => setIsLogin(true)}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                Войти
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
