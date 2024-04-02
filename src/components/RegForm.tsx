import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { register } from "../api/requests";
import { RegisterUser } from "../types/types";
import { AuthContext } from "../context/AuthContext";

const RegForm = () => {
  const [alias, setAlias] = useState("");
  const [avatar, setAvatar] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuth, setIsAuth, isRegistered, setIsRegistered } =
    useContext(AuthContext);

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: RegisterUser = {
      login: login,
      password: password,
      alias: alias,
      roleId: 1,
    };

    try {
      const response = await register(userData);
      console.log(response);
      if (response.status === 200) {
        setIsRegistered(true);
      }
      if (response.status === 401) {
        setError(response.data.error);
        console.log(error);
      }
    } catch (error) {
      console.error("Ошибка во время регистрации:", error);
    }
  };

  if (isRegistered) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="mt-12">
      <h1 className="font-semibold text-center text-4xl text-white">
        Регистрация
      </h1>
      <p className="text-center my-2 font-semibold text-[#919496]">
        Для регистрации введите логин, пароль и псевдоним
      </p>
      <form onSubmit={handleRegistration}>
        <p className="font-semibold mb-1 text-[#919496]">Псевдоним</p>
        <input
          type="text"
          name="alias"
          placeholder="Псевдоним"
          autoComplete="off"
          aria-label="Псевдоним"
          className="px-3 py-2 font-semibold rounded-lg w-full border-2"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        ></input>
        <p className="font-semibold mt-5 mb-1 text-[#919496]">Логин</p>
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
        <p className="font-semibold text-white text-center my-3">
          Уже есть аккаунт?{" "}
          <Link to="/auth" className="text-[#e11d48] hover:underline">
            Войти
          </Link>
        </p>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-white hover:bg-[#919496] text-black font-bold py-2 w-[360px] px-4 rounded inline-flex items-center justify-center"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegForm;
