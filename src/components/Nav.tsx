import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/types";
import { get_user } from "../api/requests";
import { TrackContext } from "../context/AudioContext";

export default function Nav() {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const { isAuth, setIsAuth, setIsRegistered, authUser, setAuthUser } = useContext(AuthContext);
  const {
    setIsLiked,
  } = useContext(TrackContext);
  const roleId = authUser?.roleId.toString();
  const id = authUser?.id_user.toString();
  console.log(id);

  useEffect(() => {
    if (id !== undefined) {
      get_user(id).then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      });
    }
  }, [id]);

  const logout = () => {
    setIsAuth(false);
    setIsRegistered(false);
    setIsLiked(false);
    setAuthUser(undefined);
    navigate(`/`);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${id}`);
  };

  const handleRegClick = () => {
    setIsRegistered(false);
    navigate(`/reg`);
  }

  return (
    <header className="bg-black">
      <nav className="py-[0.675rem] flex items-center justify-between max-w-[96rem] h-[47px] m-auto">
        <div>
          <Link to="/">
            <Music color="#e11d48" />
          </Link>
        </div>
        <div className="text-white">
          {roleId === "2" ? (
            <div>
              <Link
                to={`/my_music/${id}`}
                className="hover:underline font-sans font-semibold text-sm select-none"
              >
                Моя медиатека
              </Link>
              <Link
                to={`/moderator`}
                className="hover:underline font-sans font-semibold text-sm ml-4 select-none"
              >
                Панель модератора
              </Link>
            </div>
          ) : isAuth ? (
            <Link
              to={`/my_music/${id}`}
              className="hover:underline font-sans font-semibold text-sm select-none"
            >
              Моя медиатека
            </Link>
          ) : (
            <Link
              to={`/auth`}
              className="hover:underline font-sans font-semibold text-sm select-none"
            >
              Моя медиатека
            </Link>
          )}
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
              className="hover:underline font-sans font-semibold text-sm mr-4 select-none"
            >
              Войти
            </Link>
              <button 
              className="bg-white hover:bg-[#e2e2e2] text-black font-sans font-semibold text-sm py-2 px-4 rounded inline-flex items-center select-none"
              onClick={handleRegClick}>
                Зарегистрироваться
              </button>
          </div>
        )}
      </nav>
    </header>
  );
}
