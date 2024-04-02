import React, { ChangeEvent, useState } from "react";
import Song from "../components/Song";
import Playlist from "../components/Playlist";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import UploadButton from "../components/UploadButton";

export default function UserCardProfile() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <div className="max-w-6xl m-auto">
      <div className="relative mt-4">
        <img
          src="https://htmlcolorcodes.com/assets/images/colors/black-color-solid-background-1920x1080.png"
          className="w-full h-[316px] rounded-t-lg"
        ></img>
        <UploadButton />
        <div className="absolute top-[18%] left-[2%] flex items-center">
          <div className="relative">
            <img
              src="https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"
              className="w-[234px] h-[234px] rounded-full"
            ></img>
            <label className="absolute text-black bg-[#efe3e2] hover:bg-[#ffffff] px-4 top-[70%] left-[13%] rounded-sm">
              <div className="flex items-center">
                <Camera className="w-4 h-4" />
                <p className="ml-2">Загрузить фото</p>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </label>
          </div>
          <div className="ml-6">
            <p className="text-white text-8xl font-bold select-none">sipoo</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
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
      </div>
      <div className="mt-4 mb-48">
        <div className="flex justify-between items-center">
          <p className="text-white font-semibold text-2xl">Музыка</p>
          <Link to="/">
            <p className="font-semibold text-[#b3b3b3] text-sm select-none hover:underline">
              Показать все
            </p>
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-5">
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
        </div>
      </div>
    </div>
  );
}
