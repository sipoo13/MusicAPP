import React, { useEffect, useState } from "react";
import Playlist from "../components/Playlist";
import { Search } from "lucide-react";
import Song from "../components/Song";
import { Link } from "react-router-dom";
import { get_users } from "../api/requests";
import { User } from "../types/types";

export default function Index() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    get_users().then((res) => {
      setUsers(res?.data);
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.Alias.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl m-auto">
      <form className="mt-5">
        <div className="relative flex items-center">
          <Search
            className="w-5 h-5 absolute ml-3 pointer-events-none"
            color="#bdbdbd"
          />
          <input
            type="text"
            name="search"
            placeholder="Кого хочешь послушать?"
            autoComplete="off"
            aria-label="Кого хочешь послушать?"
            className="rounded-3xl hover:bg-[#2a2a2a] py-3 pl-10 pr-3 bg-[#242424] text-white placeholder-[#727475] w-[400px] border-none hover:ring-1 hover:ring-[#343434] focus:ring-2 focus:ring-white"
            value={searchQuery}
            onChange={handleSearch}
          ></input>
        </div>
      </form>
      <div className="mt-5">
        <p className="text-white text-3xl select-none">Исполнители</p>
        <div className="mt-6 mb-48">
          {users.length > 0 ? (
            filteredUsers.map((user) => (
              <Link to={`/profile/${user.ID_User}`} key={user.ID_User}>
                <div className="hover:bg-[#1a1a1a] h-[200px] flex items-center">
                  <img
                    src={user.Avatar}
                    className="w-[165px] h-[165px] rounded-full ml-4 my-auto"
                  ></img>
                  <div className="ml-4">
                    <p className="text-[#727475] font-semibold">Исполнитель</p>
                    <p className="text-white text-3xl font-semibold select-none">
                      {user.Alias}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Загрузка исполнителей...</p>
          )}
        </div>
      </div>
    </div>
  );
}
