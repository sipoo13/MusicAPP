import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Music } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Nav() {
  const { isAuth, setIsAuth, isRegistered, setIsRegistered } =
    useContext(AuthContext);

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
            to="/my_music"
            className="hover:underline font-sans font-semibold text-sm"
          >
            Моя медиатека
          </Link>
        </div>
        {isAuth ? (
          <div>
            <Link to="/profile">
              <img
                src="https://www.geaves.com/media/catalog/product/cache/acd115faf6a75f6594ab269049b631ed/3/1/31552_5.webp"
                className="h-[28px] w-[28px] rounded-full"
              ></img>
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
