import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_user } from "../api/requests";
import axios from "axios";

export default function ProfileEdit() {
  const { id } = useParams();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [alias, setAlias] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    get_user(id).then((res) => {
      if (res.status === 200) {
        setLogin(res.data.Login);
        setAlias(res.data.Alias);
      }
    });
  }, []);

  const handleEditClick = () => {
    setIsEditable(true);
    setIsSave(false);
    setPassword("");
  };

  const handleUpdateUser = async () => {
    if (!login || !password || !alias) {
      setError('Вы не заполнили все поля!');
      return;
    }

    const updateUserData = {
      login: login,
      password: password,
      alias: alias,
    };

    await axios
      .put(`http://localhost:3666/user/${id}`, updateUserData)
      .then((res) => {
        if (res.status == 200) {
          setIsSave(true);
          setIsEditable(false);
          setError("");
        }
      });
  };

  return (
    <div className="max-w-6xl m-auto">
      <div className="mt-4">
        <p className="text-white text-3xl select-none">Изменение профиля</p>
        <div className="mt-4">
          {isSave ? (
            <p
              className="text-center text-green-400 select-none"
            >
              Вы успешно изменили данные!
            </p>
          ) : null}
          {error ? (
            <p
              className="text-center text-red-500 select-none"
            >
              {error}
            </p>
          ) : null}
        </div>
        <div className="mt-4">
          <div>
            <p className="text-white text-md select-none mb-1">Псевдоним</p>
            <input
              type="text"
              name="search"
              placeholder="Введите псевдоним"
              autoComplete="off"
              aria-label="Введите псевдоним"
              className="rounded-md hover:bg-[#2a2a2a] py-3 pl-3 pr-3 bg-[#242424] text-white placeholder-[#727475] w-full border-none hover:ring-1 hover:ring-[#343434] focus:ring-2 focus:ring-white"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              disabled={!isEditable}
            ></input>
            <p className="text-white text-md select-none mb-1 mt-2">Логин</p>
            <input
              type="text"
              name="search"
              placeholder="Введите логин"
              autoComplete="off"
              aria-label="Введите логин"
              className="rounded-md hover:bg-[#2a2a2a] py-3 pl-3 pr-3 bg-[#242424] text-white placeholder-[#727475] w-full border-none hover:ring-1 hover:ring-[#343434] focus:ring-2 focus:ring-white"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              disabled={!isEditable}
            ></input>
            <p className="text-white text-md select-none mb-1 mt-2">Пароль</p>
            <input
              type="password"
              name="search"
              placeholder="Введите пароль"
              autoComplete="off"
              aria-label="Введите пароль"
              className="rounded-md hover:bg-[#2a2a2a] py-3 pl-3 pr-3 bg-[#242424] text-white placeholder-[#727475] w-full border-none hover:ring-1 hover:ring-[#343434] focus:ring-2 focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditable}
            ></input>
            <div className="flex justify-center mt-4">
              {isEditable ? (
                <button
                  className="bg-white hover:bg-[#e2e2e2] text-black font-bold py-2 w-[300px] px-4 rounded"
                  onClick={handleUpdateUser}
                >
                  Изменить профиль
                </button>
              ) : (
                <button
                  className="bg-white hover:bg-[#e2e2e2] text-black font-bold py-2 w-[300px] px-4 rounded"
                  onClick={handleEditClick}
                >
                  Изменить профиль
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
