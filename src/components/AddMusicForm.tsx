import { Camera } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import ComboBox from "./ComboBox";
import axios from "axios";
import { Track } from "../types/types";
import { Navigate } from "react-router-dom";

export default function AddMusicForm() {
  const userID = parseInt(localStorage.getItem("userId") || "");
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<File | null>(null);
  const [cover, setCover] = useState("");
  const [music, setMusic] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [musicUploadMsg, setMusicUploadMsg] = useState("");
  const [coverUploadMsg, setCoverUploadMsg] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  const handleCoverChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    setSelectedCover(file || null);
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setCoverUploadMsg("Фото загружается...");
      try {
        await axios
          .post("http://localhost:3666/avatar", formData)
          .then((response) => {
            if (response.status == 200) {
              setCover(response.data.image);
              console.log(cover);
              setCoverUploadMsg("");
            }
          });
      } catch (error) {
        console.error("An error occurred while uploading the file:", error);
      }
    }
  };

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index + 1);
    console.log(selectedIndex);
  };

  const handleMusicChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    setSelectedMusic(file || null);
    if (file) {
      const formData = new FormData();
      formData.append("music", file);
      setMusicUploadMsg("Трек загружается...");
      try {
        await axios
          .post("http://localhost:3666/upload_music", formData)
          .then((response) => {
            if (response.status == 200) {
              setMusic(response.data.music);
              console.log(music);
              setMusicUploadMsg("Трек успешно загружен!");
            }
          });
      } catch (error) {
        console.error("An error occurred while uploading the file:", error);
      }
    }
  };

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && music && cover) {
      const id = localStorage.getItem("userId");
      try {
        const trackData = {
          name: name,
          cover: cover,
          track: music,
          genre_id: selectedIndex,
          user_id: id,
        };
        console.log(trackData);

        await axios
          .post("http://localhost:3666/add_music", trackData)
          .then((response) => {
            if (response.status == 200) {
              setErrorMsg("");
              setIsSaved(true);
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorMsg("Вы не заполнили все поля!");
    }
  };

  if (isSaved) {
    return <Navigate to={`/profile/${userID}`} />;
  }

  return (
    <div className="mt-4">
      <p className="text-white font-semibold text-3xl">Загрузка музыки</p>
      <form onSubmit={handleFileUpload} className="mt-4">
        <div>
          <div className="mt-8 flex">
            <div className="relative w-[262px]">
              {!cover && (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/%D0%A1%D0%B5%D1%80%D1%8B%D0%B9_%D1%86%D0%B2%D0%B5%D1%82-_2014-03-15_18-16.jpg/220px-%D0%A1%D0%B5%D1%80%D1%8B%D0%B9_%D1%86%D0%B2%D0%B5%D1%82-_2014-03-15_18-16.jpg"
                  className="w-[262px] h-[262px]"
                ></img>
              )}
              {cover && <img src={cover} className="w-[262px] h-[262px]"></img>}
              {!selectedCover && (
                <label className="absolute text-black bg-[#efe3e2] hover:bg-[#ffffff] px-4 top-[80%] left-[18%] rounded-sm">
                  <div className="flex items-center">
                    <Camera className="w-4 h-4" />
                    <p className="ml-2">Загрузить фото</p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleCoverChange}
                      accept="image/*"
                    />
                  </div>
                </label>
              )}
              {selectedCover && (
                <p className="absolute text-white font-semibold top-[80%] left-[22%]">
                  {coverUploadMsg}
                </p>
              )}
            </div>
            <div className="ml-6">
              <p className="font-semibold mb-1 text-white">Название:</p>
              <input
                type="text"
                autoComplete="off"
                className="rounded-sm hover:bg-[#2a2a2a] py-1 pl-2 pr-3 bg-[#242424] text-white placeholder-[#727475] w-[400px] border-none hover:ring-1 hover:ring-[#343434] focus:ring-2 focus:ring-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <p className="font-semibold mb-1 mt-4 text-white">Жанр:</p>
              <ComboBox onIndexChange={handleIndexChange} />
              <p className="font-semibold mb-1 mt-4 text-white">
                Загрузка трека:
              </p>
              {!selectedMusic && (
                <label className="bg-white hover:bg-[#e2e2e2] text-black font-bold py-1 px-4 rounded inline-flex items-center justify-center w-full">
                  <p className="text-center">Загрузить трек</p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleMusicChange}
                    accept="image/*"
                  />
                </label>
              )}
              {selectedMusic && (
                <p className="text-white text-center font-bold">
                  {musicUploadMsg}
                </p>
              )}
              <button
                type="submit"
                className="bg-[#e11d48] text-white mt-4 py-1 px-4 rounded-sm w-full font-semibold"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </form>
      {errorMsg ? (
        <p className="text-[#e11d48] font-semibold text-center text-xl mt-3">
          {errorMsg}
        </p>
      ) : null}
    </div>
  );
}
