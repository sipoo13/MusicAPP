import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/types";
import { get_user } from "../api/requests";

export default function Nav() {
  const [user, setUser] = useState<User>();
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { isAuth, setIsAuth, isRegistered, setIsRegistered } =
    useContext(AuthContext);

  useEffect(() => {
    if (id !== null) {
      get_user(id).then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      });
    }
  }, [id]);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("userId");
  };

  const handleProfileClick = () => {
    const userId = localStorage.getItem("userId");
    navigate(`/profile/${userId}`);
  };

  return (
    <header className="bg-black">
      <nav className="py-[0.675rem] flex items-center justify-between max-w-[96rem] h-[47px] m-auto">
        <div>
          <Link to="/">
            <Music color="#e11d48" />
          </Link>
        </div>
        <div className="text-white">
          <Link
            to={`/my_music/${id}`}
            className="hover:underline font-sans font-semibold text-sm"
          >
            Моя медиатека
          </Link>
        </div>
        {isAuth ? (
          <div className="flex items-center">
            <img
              src={user?.Avatar}
              className="h-[28px] w-[28px] rounded-full cursor-pointer"
              onClick={handleProfileClick}
            ></img>
            <Link to="/" onClick={logout} className="text-[#e11d48] ml-4">
              Выйти
            </Link>
          </div>
        ) : (
          <div className="text-white">
            <Link
              to="/auth"
              className="hover:underline font-sans font-semibold text-sm mr-4"
            >
              Войти
            </Link>
            <Link to="/reg" className="font-sans font-semibold text-sm">
              <button className="bg-white hover:bg-[#e2e2e2] text-black font-bold py-2 px-4 rounded inline-flex items-center">
                Зарегистрироваться
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
