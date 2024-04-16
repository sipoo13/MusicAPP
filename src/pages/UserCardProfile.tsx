import React, { ChangeEvent, useEffect, useState } from "react";
import Song from "../components/Song";
import Playlist from "../components/Playlist";
import { Link, useParams } from "react-router-dom";
import { Camera } from "lucide-react";
import UploadButton from "../components/UploadButton";
import UserPlaylist from "../components/UserPlaylist";
import { get_user, get_user_tracks } from "../api/requests";
import { Track, User } from "../types/types";
import axios from "axios";

export default function UserCardProfile() {
  const { id } = useParams();
  const userID = parseInt(localStorage.getItem("userId") || "");
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState("");
  const [header, setHeader] = useState("");
  const [userSingles, setUserSingles] = useState<Track[]>([]);
  const [user, setUser] = useState<User>();
  const [isMyProfile, setIsMyProfile] = useState(false);

  const handleHeaderChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    setHeaderFile(file || null);
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        await axios
          .post(`http://localhost:3666/avatar`, formData)
          .then(async (response) => {
            if (response.status == 200) {
              const headerData = {
                header: response.data.image,
              };
              try {
                const response = await axios.put(
                  `http://localhost:3666/header/${userID}`,
                  headerData
                );
                if (response.status === 200) {
                  setHeader(response.data.header.header);
                }
              } catch (error) {
                console.error("An error occurred while updating the header:", error);
              }
            }
          });
      } catch (error) {
        console.error("An error occurred while uploading the file:", error);
      }
    }
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    setAvatarFile(file || null);
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        await axios
          .post(`http://localhost:3666/avatar`, formData)
          .then(async (response) => {
            if (response.status == 200) {
              const avatarData = {
                avatar: response.data.image,
              };
              try {
                const response = await axios.put(
                  `http://localhost:3666/avatar/${userID}`,
                  avatarData
                );
                if (response.status === 200) {
                  setAvatar(response.data.avatar.avatar);
                }
              } catch (error) {
                console.error("An error occurred while updating the header:", error);
              }
            }
          });
      } catch (error) {
        console.error("An error occurred while uploading the file:", error);
      }
    }
  };

  useEffect(() => {
    get_user_tracks(id).then((res) => {
      setUserSingles(res?.data);
      console.log(res?.data);
    });

    get_user(id).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
        setAvatar(res.data.Avatar);
        setHeader(res.data.Header);
      }
    });
  }, []);

  useEffect(() => {
    if (user?.ID_User == userID) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
    }
  }, [user]);


  return (
    <div className="max-w-6xl m-auto">
      <div className="relative mt-4">
        {isMyProfile ? (
          <div>
            <img
              src={header}
              className="w-full h-[316px] rounded-t-lg"
            ></img>
            <label className="absolute text-black bg-[#efe3e2] hover:bg-[#ffffff] px-4 top-[8%] right-[3%] rounded-sm">
              <div className="flex items-center">
                <Camera className="w-4 h-4" />
                <p className="ml-2">Загрузить фото шапки</p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleHeaderChange}
                accept="image/*"
              />
            </label>
          </div>
        ) : (
          <img
            src={header}
            className="w-full h-[316px] rounded-t-lg"
          ></img>
        )}

        <div className="absolute top-[18%] left-[2%] flex items-center">
          <div className="relative">
            {isMyProfile ? (
              <div>
                <img
                  src={avatar}
                  className="w-[234px] h-[234px] rounded-full"
                ></img>
                <label className="absolute text-black bg-[#efe3e2] hover:bg-[#ffffff] px-4 top-[70%] left-[13%] rounded-sm">
                  <div className="flex items-center">
                    <Camera className="w-4 h-4" />
                    <p className="ml-2">Загрузить фото</p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleAvatarChange}
                      accept="image/*"
                    />
                  </div>
                </label>
              </div>
            ) : (
              <img
                src={avatar}
                className="w-[234px] h-[234px] rounded-full"
              ></img>
            )}
          </div>
          <div className="ml-6">
            <p className="text-white text-8xl py-4 bg-black font-bold select-none">
              {user?.Alias}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="mt-4">
        <p className="text-white text-2xl font-semibold">Популярные треки</p>
        <div className="grid grid-cols-2 grid-rows-5 gap-x-6 mt-3">
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
        </div>
      </div> */}
      <div className="mt-4 mb-48">
        <div className="flex justify-between items-center">
          <p className="text-white font-semibold text-2xl">Музыка</p>
          <Link to={`/user_music/${id}`}>
            <p className="font-semibold text-[#b3b3b3] text-sm select-none hover:underline">
              Показать все
            </p>
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-5">
          {userSingles.length > 0 ? (
            userSingles.map((track, index) => {
              if (index <= 4)
                return <UserPlaylist key={track.ID_Track} track={track} />;
            })
          ) : (
            <p className="text-center text-white font-semibold text-xl my-4">
              Треков пока что нет
            </p>
          )}
        </div>
        <div className="mt-3">
          {isMyProfile ? (
            <Link to="/add_music">
              <button className="text-white bg-[#e11d48] py-2 px-2 rounded-sm">
                Добавить музыку
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
