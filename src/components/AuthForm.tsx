import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthUser } from "../types/types";
import { auth } from "../api/requests";
import { AuthContext } from "../context/AuthContext";

const AuthForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, setIsAuth, isRegistered, setIsRegistered } =
    useContext(AuthContext);
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: AuthUser = {
      login: login,
      password: password,
    };

    try {
      const response = await auth(userData);
      console.log(response);
      if (response && response.status === 200) {
        setIsAuth(true);
      }
      if (response && response.status === 401) {
        setError(response.data.error);
        setIsRegistered(false);
        console.log(error);
      }
    } catch (error) {
      console.error("Ошибка во время авторизации:", error);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-12">
      <h1 className="font-semibold text-center text-4xl text-white">Вход</h1>
      {isRegistered ? (
        <p className="text-[#e11d48] text-center font-semibold my-2">
          Вы успешно зарегистрировались!
        </p>
      ) : null}
      <p className="text-center my-2 font-semibold text-[#919496]">
        Войдите, чтобы получить доступ к своей музыке
      </p>
      <form onSubmit={handleAuth}>
        <p className="font-semibold mb-1 text-[#919496]">Логин</p>
        <input
          type="text"
          name="login"
          placeholder="Логин"
          autoComplete="off"
          aria-label="Логин"
          className="px-3 py-2 font-semibold rounded-lg w-full border-2"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        ></input>
        <p className="font-semibold mt-5 mb-1 text-[#919496]">Пароль</p>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          autoComplete="off"
          aria-label="Пароль"
          className="px-3 py-2 font-semibold rounded-lg w-full border-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <p className="font-semibold text-white text-center my-4">
          Нет аккаунта?{" "}
          <Link to="/reg" className="text-[#e11d48] hover:underline">
            Зарегистрироваться
          </Link>
        </p>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-white hover:bg-[#919496] text-black font-bold py-2 w-[360px] px-4 rounded inline-flex items-center justify-center"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
